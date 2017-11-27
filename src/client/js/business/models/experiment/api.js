/* globals btoa fetch
   ORCHESTRATOR_API_URL */

import queryString from 'query-string';
import {isEmpty} from 'lodash';

import {handleResponse} from '../../../utils/entities/fetchEntities';


const getHeaders = jwt => ({
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: `Basic ${jwt}`,
});

const fetchList = (url, jwt) => fetch(url, {
    headers: getHeaders(jwt),
    // Allows API to set http-only cookies with AJAX calls
    // @see http://www.redotheweb.com/2015/11/09/api-security.html
    // credentials: 'include',
    mode: 'cors',
})
    .then(response => handleResponse(response))
    .then(json => ({list: json}), error => ({error}));

export const fetchAlgos = (
    get_parameters, ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD,
) => {
    const url = `${ORCHESTRATOR_API_URL}/algo${
        !isEmpty(get_parameters) ?
            `?${queryString.stringify(get_parameters)}` : ''
    }`;
    const jwt = btoa(`${ORCHESTRATOR_USER}:${ORCHESTRATOR_PASSWORD}`);
    return fetchList(url, jwt);
};


const fetchItem = (url, jwt) => fetch(url, {
    headers: getHeaders(jwt),
    mode: 'cors',
})
    .then(response => handleResponse(response))
    .then(json => ({item: json}), error => ({error}));

export const fetchProblem = (
    id, ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD, get_parameters
) => {
    const url = `${ORCHESTRATOR_API_URL}/problem/${id}${!isEmpty(get_parameters) ? `?${queryString.stringify(get_parameters)}` : ''}`;
    const jwt = btoa(`${ORCHESTRATOR_USER}:${ORCHESTRATOR_PASSWORD}`);
    return fetchItem(url, jwt);
};
