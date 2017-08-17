/**
 * Copyright Morpheo Org. 2017
 *
 * contact@morpheo.co
 *
 * This software is part of the Morpheo project, an open-source machine
 * learning platform.
 *
 * This software is governed by the CeCILL license, compatible with the
 * GNU GPL, under French law and abiding by the rules of distribution of
 * free software. You can  use, modify and/ or redistribute the software
 * under the terms of the CeCILL license as circulated by CEA, CNRS and
 * INRIA at the following URL "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
 */

import {call, put, select} from 'redux-saga/effects';
import queryString from 'query-string';
import url from 'url';
import {redirect} from 'redux-first-router';

import {fetchByUrl} from '../../entities/fetchEntities';
import generalActions from '../common/actions';

// helpers for pagination cache
export function getUrl(baseUrl, query, page, action = 'next') {
    const queries = queryString.stringify({
        ...query,
        page: page + (action === 'next' ? 1 : -1),
    });
    return baseUrl + (queries ? `?${queries}` : '');
}

export function getNext(baseUrl, query, page) {
    return getUrl(baseUrl, query, page, 'next');
}

export function getPrevious(baseUrl, query, page) {
    return page === 1 ? null : getUrl(baseUrl, query, page, 'previous');
}


export const loadList = (actions, fetchList, action = 'list', q) =>
    function* loadListSaga() {
        const state = yield select(),
            location = state.location;

        // override query if needed, default to current url query
        const query = q || (location && location.search ? queryString.parse(location.search) : {});

        const {error, list} = yield call(fetchList, query, state.user.token);

        if (error) {
            if (error.body && error.body.message) {
                console.error(error.body.message);
            }
            else if (error && error.message) {
                yield put(generalActions.error.set(error.message));
            }
            yield put(actions[action].failure(error.body));
        }
        else {
            // const page = query && query.page ? query.page : null; // original page
            // if (page) {
            //     yield put(actions.pagination.reset(parseInt(page, 10)));
            // }
            // else {
            //     yield put(actions.pagination.reset());
            // }

            yield put(actions[action].success(list));
            return list;
        }
    };

export const loadByUrlRef = actions =>
    function* loadByUrlRefSaga(request) {
        const state = yield select();
        const jwt = state.user.token,
            location = state.location,
            query = location && location.search ? queryString.parse(location.search) : {};

        // need to remove page from query, as already in url
        const parsedUrl = url.parse(request.payload),
            parsedUrlQuery = queryString.parse(parsedUrl.query),
            urlToFetch = url.format({
                ...parsedUrl,
                query: {...query, ...parsedUrlQuery}, // get all possible filters set and override page/offset if present
            });

        const {error, list} = yield call(fetchByUrl, urlToFetch, jwt);

        if (error) {
            if (error.body && error.body.message) {
                console.error(error.body.message);
            }
            else if (error && error.message) {
                yield put(generalActions.error.set(error.message));
            }
            yield put(actions.list.failure(error.body));
        }
        else {
            // add page in url
            const page = parsedUrlQuery.offset ? ((+parsedUrlQuery.offset + 20) / 20) : (+parsedUrlQuery.page || 1);  // 20 is default limit from pokemon api
            yield put(actions.pagination.set.success(page));

            // update page in url
            if (page > 1) {
                yield put(redirect({type: location.type, payload: {...query, page}}));
            }
            else {
                delete query.page;
                yield put(redirect({type: location.type, payload: query}));
            }

            // return list
            yield put(actions.list.success(list));
            return list;
        }
    };

export const loadListFromPath = (actions, fetchList, subreducer) =>
    function* loadListFromPathSaga(request) {
        const state = yield select(),
            location = state.location,
            query = location && location.search ? queryString.parse(location.search) : {};

        const {error, list} = yield call(fetchList, query, state.user.token, request.payload);

        if (error) {
            if (error.body && error.body.message) {
                console.error(error.body.message);
            }
            else if (error && error.message) {
                yield put(generalActions.error.set(error.message));
            }
            yield put(actions[subreducer].failure(error.body));
        }
        else {
            return list;
        }
    };

export const loadListNext = (actions, type) =>
    function* loadListNextSaga() {
        const state = yield select(),
            urlToFetch = state.models[type].persistent.next;

        const {error, list} = yield call(fetchByUrl, urlToFetch, state.user.token);

        if (error) {
            if (error.body && error.body.message) {
                console.error(error.body.message);
            }
            else if (error && error.message) {
                yield put(generalActions.error.set(error.message));
            }
            yield put(actions.persistent.next.failure(error.body));
        }
        else {
            yield put(actions.persistent.next.success(list));

            if (list.next) {
                yield put(actions.persistent.next.request());
            }
        }
    };

export const loadItemFactory = (actions, fetchItem, query) =>
    function* loadItemSaga(request) {
        const state = yield select(),
            location = state.location,
            q = location && location.search ? {...query, ...queryString.parse(location.search)} : query;


        const {error, item} = yield call(fetchItem, q, request.payload, state.user.token);

        if (error) {
            if (error.body && error.body.message) {
                console.error(error.body.message);
            }
            else if (error && error.message) {
                yield put(generalActions.error.set(error.message));
            }
            yield put(actions.item.get.failure(error.body));
        }
        else {
            yield put(actions.item.get.success({
                [request.payload]: item,
            }));

            return item;
        }
    };

export const createItemFactory = (actions, createItem) =>
    function* createItemSaga(request) {
        const state = yield select(),
            {error, item} = yield call(createItem, state.user.token, request.payload);

        if (error) {
            yield put(actions.item.create.failure(error.body));
        }
        else {
            yield put(actions.modal.create.set(false));
            if (actions.modal.duplicate) {
                yield put(actions.modal.duplicate.set(false));
            }
            yield put(actions.item.create.success(item));
        }

        return item;
    };

export const updateItemFactory = (actions, updateItem) =>
    function* updateItemSaga(request) {
        const state = yield select(),
            {error, item} = yield call(updateItem, request.payload.id, state.user.token, request.payload.values);

        if (error) {
            yield put(actions.item.update.failure(error.body));
        }
        else {
            yield put(actions.item.update.success(item));

            return item;
        }
    };

export const deleteItemFactory = (actions, deleteItem) =>
    function* deleteItemSaga(request) {
        const state = yield select(),
            {error} = yield call(deleteItem, request.payload, state.user.token);

        if (error) {
            console.error(error.message);
            yield put(actions.item.delete.failure(error.body));
        }
        else {
            if (actions.modal && actions.modal.delete) {
                yield put(actions.modal.delete.set(false));
            }
            yield put(actions.item.delete.success(request.payload));

            return request.payload;
        }
    };

export const loadAdditionnal = (fetchList, action) =>
    function* loadAdditionnalSaga(request) {
        const state = yield select(),
            location = state.location;

        // override query if needed, default to current url query
        const q = {experiment: request.payload};
        const query = location && location.search ? {...q, ...queryString.parse(location.search)} : q;

        const {error, list} = yield call(fetchList, query, state.user.token);

        if (error) {
            if (error.body && error.body.message) {
                console.error(error.body.message);
            }
            else if (error && error.message) {
                yield put(generalActions.error.set(error.message));
            }

            return {error};
        }

        return {list};
    };
