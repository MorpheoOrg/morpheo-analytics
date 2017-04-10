import {
    fetchEntitiesFactory,
    createEntityFactory,
    deleteEntityFactory,
} from '../../../entities/fetchEntities';

/* globals STORAGE_API_URL ORCHESTRATOR_API_URL */



export const fetchAlgos = fetchEntitiesFactory('api/algos');

export const createAlgo = createEntityFactory('api/algos');
export const deleteAlgo = deleteEntityFactory('api/algos');

export const postAlgo = (payload) => {
    const url = `${STORAGE_API_URL}/algo/`;

    return fetch(url, {
        method: 'POST',
        //headers,
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
                        status: response.status,  // read status
                    }),
                );
            }

            return response.json();
        })
        .then(json => ({item: json}), error => ({error}));
};

export const getHeaders = jwt => ({
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    ...(jwt ? {Authorization: `JWT ${jwt}`} : {}),
});

export const postAlgoToOrchestrator = (payload) => {
    const url = `${ORCHESTRATOR_API_URL}/algo`; // careful with trailing slash
    const headers = getHeaders();

    return fetch(url, {
        method: 'POST',
        headers,
        //headers,
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
                        status: response.status,  // read status
                    }),
                );
            }

            return response.json();
        })
        .then(json => ({item: json}), error => ({error}));
};
