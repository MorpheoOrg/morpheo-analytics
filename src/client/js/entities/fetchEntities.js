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

import queryString from 'query-string';
import {isEmpty} from 'lodash';

/* globals API_URL fetch  */

export const getHeaders = jwt => ({
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    ...(jwt ? {Authorization: `JWT ${jwt}`} : {}),
});

export const handleResponse = (response) => {
    if (!response.ok) {
        return response.text().then(result =>
            Promise.reject({
                body: new Error(result),
                status: response.status, // read status
            }),
        );
    }

    return response.json();
};

export const fetchList = (url, jwt) => {
    const headers = getHeaders(jwt);

    return fetch(url, {
        headers,
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        // credentials: 'include',
        mode: 'cors',
    })
        .then(response => handleResponse(response))
        .then(json => ({list: json}), error => ({error}));
};

export const fetchByUrl = (urlToFetch, jwt) => fetchList(urlToFetch, jwt);

export const fetchEntitiesFactory = path => (get_parameters, jwt) => {
    const url = `${API_URL}/${path}/${!isEmpty(get_parameters) ? `?${queryString.stringify(get_parameters)}` : ''}`;
    return fetchList(url, jwt);
};

export const fetchEntitiesByPathFactory = (path, view) => (get_parameters, jwt, id) => {
    const url = `${API_URL}/${path}/${id ? `${id}/` : ''}${view}/${!isEmpty(get_parameters) ?
        `?${queryString.stringify(get_parameters)}` :
        ''}`;
    return fetchList(url, jwt);
};

export const fetchEntityFactory = path => (get_parameters, id, jwt) => {
    const headers = getHeaders(jwt);
    const url = `${API_URL}/${path}/${id}/${!isEmpty(get_parameters) ?
        `?${queryString.stringify(get_parameters)}` :
        ''}`;

    return fetch(url, {
        headers,
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        // credentials: 'include',
        mode: 'cors',
    })
        .then(response => handleResponse(response))
        .then(json => ({item: json}), error => ({error}));
};

export const deleteEntityFactory = path => (id, jwt) => {
    const headers = getHeaders(jwt);
    const url = `${API_URL}/${path}/${id}/`;

    return fetch(url, {
        method: 'DELETE',
        headers,
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        // credentials: 'include',
        mode: 'cors',
    })
        .then((response) => {
            if (response.status !== 204) {
                return response.text().then(result =>
                    Promise.reject({
                        body: new Error(result),
                        status: response.status, // read status
                    }),
                );
            }

            return response;
        }).then(() => true, error => ({error}));
};

export const updateEntityFactory = path => (id, jwt, payload) => {
    const headers = getHeaders(jwt);
    const url = `${API_URL}/${path}/${id}/`;

    return fetch(url, {
        method: 'PATCH',
        headers,
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        // credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(payload),
    })
        .then(response => handleResponse(response))
        .then(json => ({item: json}), error => ({error}));
};

export const updateFormEntityFactory = path => (id, jwt, payload) => {
    const headers = {};

    if (jwt) {
        headers.Authorization = `JWT ${jwt}`;
    }

    const url = `${API_URL}/${path}/${id}/`;

    return fetch(url, {
        method: 'PATCH',
        headers,
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        // credentials: 'include',
        mode: 'cors',
        body: payload,
    })
        .then(response => handleResponse(response))
        .then(json => ({item: json}), error => ({error}));
};

export const createEntityFactory = path => (jwt, payload) => {
    const headers = getHeaders(jwt);
    const url = `${API_URL}/${path}/`;

    return fetch(url, {
        method: 'POST',
        headers,
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        // credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(payload),
    })
        .then((response) => {
            if (response.status !== 201) {
                return response.text().then(result =>
                    Promise.reject({
                        body: new Error(result),
                        status: response.status, // read status
                    }),
                );
            }

            return response.json();
        })
        .then(json => ({item: json}), error => ({
            error,
        }));
};

export const createFormEntityFactory = path => (jwt, payload) => {
    const headers = {};

    if (jwt) {
        headers.Authorization = `JWT ${jwt}`;
    }

    const url = `${API_URL}/${path}/`;

    return fetch(url, {
        method: 'POST',
        headers,
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        // credentials: 'include',
        mode: 'cors',
        body: payload,
    })
        .then((response) => {
            if (response.status !== 201) {
                return response.text().then(result =>
                    Promise.reject({
                        body: new Error(result),
                        status: response.status, // read status
                    }),
                );
            }

            return response.json();
        })
        .then(json => ({item: json}), error => ({
            error,
        }));
};
