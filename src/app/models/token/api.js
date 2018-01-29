/* globals fetch ORCHESTRATOR_API_URL */
import queryString from 'query-string';

import {FetchError} from '../../utils/errors';


export const getToken = async (username, orgName) => {
    const parameters = {username, orgName};
    const url = `${ORCHESTRATOR_API_URL}/users${queryString.stringify(parameters)}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    if (response.status !== 201) {
        throw new FetchError(await response.text(), response.status);
    }

    console.log(response);
    return response.json().token;
};

export default {
    getToken,
};
