import queryString from 'query-string';
import {LOCATION_CHANGE} from 'react-router-redux';

const defaultSelectLocationState = state => state.routing;

/**
 * This function synchronizes your history state with the Redux store.
 * Location changes flow from history to the store. An enhanced history is
 * returned with a listen method that responds to store updates for location.
 *
 * When this history is provided to the router, this means the location data
 * will flow like this:
 * history.push -> store.dispatch -> enhancedHistory.listen -> router
 * This ensures that when the store state changes due to a replay or other
 * event, the router will be updated appropriately and can transition to the
 * correct router state.
 */

const withoutQuery = obj => obj ? {
    hash: obj.hash,
    pathname: obj.pathname,
    key: obj.key,
    state: obj.state,
    search: obj.search,
} : obj;

export default function syncHistoryWithStore(history, store, {
    selectLocationState = defaultSelectLocationState,
    adjustUrlOnReplay = true,
    query_support = false,
} = {}) {
    // Ensure that the reducer is mounted on the store and functioning properly.
    if (typeof selectLocationState(store.getState()) === 'undefined') {
        throw new Error(
            'Expected the routing state to be available either as `state.routing` ' +
            'or as the custom expression you can specify as `selectLocationState` ' +
            'in the `syncHistoryWithStore()` options. ' +
            'Ensure you have added the `routerReducer` to your store\'s ' +
            'reducers via `combineReducers` or whatever method you use to isolate ' +
            'your reducers.',
        );
    }

    let initialLocation;
    let isTimeTraveling;
    let unsubscribeFromStore;
    let currentLocation;

    // What does the store say about current location?
    const getLocationInStore = (useInitialIfEmpty) => {
        const locationState = selectLocationState(store.getState());
        return locationState.locationBeforeTransitions || (useInitialIfEmpty ? initialLocation : undefined);
    };

    // Init initialLocation with potential location in store
    initialLocation = getLocationInStore();

    // If the store is replayed, update the URL in the browser to match.
    if (adjustUrlOnReplay) {
        const handleStoreChange = () => {
            const locationInStore = getLocationInStore(true);

            // if we support query we need to compare without the nested query object
            if (query_support) {
                const currLoc = withoutQuery(currentLocation),
                    locInStore = withoutQuery(locationInStore),
                    initLoc = withoutQuery(initialLocation);

                if (currLoc === locInStore || initLoc === locInStore) {
                    return;
                }
            }
            else if (currentLocation === locationInStore || initialLocation === locationInStore) {
                return;
            }

            // Update address bar to reflect store state
            isTimeTraveling = true;
            currentLocation = locationInStore;

            history.replace({
                ...locationInStore,
                action: 'PUSH',
            });
            isTimeTraveling = false;
        };

        // support react-hot-loader
        if (!initialLocation) {
            unsubscribeFromStore = store.subscribe(handleStoreChange);
            handleStoreChange();
        }
    }

    // Whenever location changes, dispatch an action to get it in the store
    const handleLocationChange = (location, action) => {
        // ... unless we just caused that location change
        if (isTimeTraveling) {
            return;
        }

        // Remember where we are
        currentLocation = query_support ?
        {
            ...location,
            query: queryString.parse(location.search), // add query support
        } : location;

        // Are we being called for the first time?
        if (!initialLocation) {
            // Remember as a fallback in case state is reset
            initialLocation = currentLocation;

            // Respect persisted location, if any
            if (getLocationInStore()) {
                return;
            }
        }

        // Tell the store to update by dispatching an action
        store.dispatch({
            type: LOCATION_CHANGE,
            payload: currentLocation,
        });
    };

    // support react-hot-loader
    if (!initialLocation) {
        // init store if first time
        handleLocationChange(history.location);

        const unsubscribeFromHistory = history.listen(handleLocationChange);

        // History 3.x doesn't call listen synchronously, so fire the initial location change ourselves
        if (history.getCurrentLocation) {
            handleLocationChange(history.getCurrentLocation());
        }

        // The enhanced history uses store as source of truth
        history.listen = (listener) => { // eslint-disable-line no-param-reassign
            // Copy of last location.
            let lastPublishedLocation = getLocationInStore(true);

            // Keep track of whether we unsubscribed, as Redux store
            // only applies changes in subscriptions on next dispatch
            let unsubscribed = false;
            const unsubscribeFromStore = store.subscribe(() => {
                const currentLocation = getLocationInStore(true);
                if (currentLocation === lastPublishedLocation) {
                    return;
                }
                lastPublishedLocation = currentLocation;
                if (!unsubscribed) {
                    listener(lastPublishedLocation);
                }
            });

            // / History 2.x listeners expect a synchronous call. Make the first call to the
            // listener after subscribing to the store, in case the listener causes a
            // location change (e.g. when it redirects)
            if (!history.getCurrentLocation) {
                listener(lastPublishedLocation);
            }

            // Let user unsubscribe later
            return () => {
                unsubscribed = true;
                unsubscribeFromStore();
            };
        };

        history.unsubscribe = () => {  // eslint-disable-line no-param-reassign
            if (adjustUrlOnReplay) {
                unsubscribeFromStore();
            }
            unsubscribeFromHistory();
        };
    }

    return history;
}
