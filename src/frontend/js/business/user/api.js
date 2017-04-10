/* globals API_URL, localStorage, btoa, fetch */
export function fetchSignIn(email, password) {
    return fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            username: email,
            password,
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

export function fetchSignUp(email, password1, password2, username) {
    return fetch(`${API_URL}/registration/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            username,
            email,
            password1,
            password2,
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

export function verify(key) {
    return fetch(`${API_URL}/registration/verify-email/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            key
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

export const storeLocalUser = ({user: {exp, permission, username, firstName, lastName}, token, email}) => {
    localStorage.setItem('email', email);
    localStorage.setItem('username', username);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('exp', exp);
    localStorage.setItem('token', token);
    localStorage.setItem('permission', permission);
};

export const removeLocalUser = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('exp');
    localStorage.removeItem('token');
    localStorage.removeItem('permission');
};
