/* globals */

export const Save = path => (payload) => {
    //const headers = getHeaders(jwt);
    const url = `${API_URL}/${path}/`;

    return fetch(url, {
        method: 'POST',
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
        .then(json => ({item: json}), error => ({
            error,
        }));
};

export const save = Save('/notebook');

