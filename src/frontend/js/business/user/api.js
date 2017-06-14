/* globals SERVICES_API_URL, localStorage, fetch, btoa, NOTEBOOK_SERVICES_USER, NOTEBOOK_SERVICES_PASSWORD */

export function fetchSignIn(uuid) {
    const basic = `${NOTEBOOK_SERVICES_USER}:${NOTEBOOK_SERVICES_PASSWORD}`;

    return fetch(`${SERVICES_API_URL}/user/token/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Basic ${btoa(basic)}`,
        },
        body: JSON.stringify({
            uuid,
        }),
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        // credentials: 'include',
        mode: 'cors',
    })
        .then((response) => {
            if (!response.ok) {
                return response.text().then(result => Promise.reject(new Error(result)));
            }

            return response.json();
        })
        .then(json => ({res: json}), error => ({
            error,
        }));
}

export const storeLocalUser = ({settings, uuid, access_token}) => {
    // localStorage.setItem('exp', exp);
    localStorage.setItem('settings', JSON.stringify(settings));
    localStorage.setItem('uuid', uuid);
    localStorage.setItem('access_token', access_token);
};

export const removeLocalUser = () => {
    // user
    // localStorage.removeItem('exp');
    localStorage.removeItem('settings');
    localStorage.removeItem('uuid');
    localStorage.removeItem('access_token');
};
