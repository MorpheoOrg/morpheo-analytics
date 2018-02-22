/* globals fetch btoa */
import {isEmpty} from 'lodash';
import queryString from 'query-string';

import {FetchError} from '../../utils/errors';


export const getEntityFactory = apiURL => async ({
    user, password, parameters,
}) => {
    const url = isEmpty(parameters) ? apiURL :
        `${apiURL}?${queryString.stringify(parameters)}`;
    const response = await fetch(url, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Basic ${btoa(`${user}:${password}`)}`,
        },
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        // credentials: 'include',
        mode: 'cors',
    });

    if (!response.ok) {
        throw new FetchError(await response.text(), response.status);
    }

    return response.json();
};


export const postEntityFactory = (apiURL, contentType) => async ({
    body, user, password, parameters
}) => {
    const url = isEmpty(parameters) ? apiURL :
        `${apiURL}?${queryString.stringify(parameters)}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            ...(contentType === 'json' ? {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            } : {}),
            Authorization: `Basic ${btoa(`${user}:${password}`)}`,
        },
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        // credentials: 'include',
        mode: 'cors',
        body: contentType === 'json' ? JSON.stringify(body) : body,
    });
    if (response.status !== 201) {
        throw new FetchError(await response.text(), response.status);
    }

    return response.json();
};


export default {
    getEntityFactory,
    postEntityFactory,
};
