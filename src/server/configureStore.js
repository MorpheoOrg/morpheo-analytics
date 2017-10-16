import createHistory from 'history/createMemoryHistory';
import {NOT_FOUND} from 'redux-first-router';
import atob from 'atob';

import configureStore from '../common/configureStore/index';


const doesRedirect = ({kind, pathname}, res) => {
    if (kind === 'redirect') {
        res.redirect(302, pathname);
        return true;
    }
};

export default async (req, res) => {
    const access_token = req.cookies.access_token;

    // TODO: add preloaded settings

    let preLoadedState;
    if (access_token && typeof access_token === 'string') {
        let payload;
        try {
            payload = JSON.parse(atob(access_token.split('.')[1]));
        }
        catch (e) {
            payload = {};
        }
        preLoadedState = {user: {access_token, authenticated: !!access_token, uuid: payload.uuid}}; // onBeforeChange will authenticate using this
    }

    const history = createHistory({initialEntries: [req.path]});
    const {store, thunk} = configureStore(history, preLoadedState);

    // if not using onBeforeChange + jwTokens, you can also async authenticate
    // here against your db (i.e. using req.cookies.sessionId)

    let location = store.getState().location;
    if (doesRedirect(location, res)) return false;

    // using redux-thunk perhaps request and dispatch some app-wide state as well, e.g:
    // await Promise.all([store.dispatch(myThunkA), store.dispatch(myThunkB)])

    await thunk(store); // THE PAYOFF BABY!

    location = store.getState().location; // remember: state has now changed
    if (doesRedirect(location, res)) return false; // only do this again if ur thunks have redirects

    const status = location.type === NOT_FOUND ? 404 : 200;
    res.status(status);
    return store;
};
