/* globals API_URL, API_SOCKET_URL, fetch, WebSocket */

export function fetchCreateKernel(jwt) {
    return fetch(`${API_URL}/api/kernels`, {
        method: 'POST',
        headers: {
            // Accept: 'application/json',
            // 'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
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

export function fetchConnectKernel(jwt, kernel_id) {
    const ws = new WebSocket(`${API_SOCKET_URL}/api/kernels/${kernel_id}/channels`);

    ws.onopen = () => {
        ws.send(JSON.stringify({
            Authorization: `Bearer ${jwt}`,
        }));
    };

    ws.onmessage = (e) => {
        let msg = null;

        try {
            msg = JSON.parse(e.data);
        }
        catch (e) {
            console.error(`Error parsing : ${e.data}`);
        }

        if (msg) {
            console.log(msg);
        }
    };

    return ws;
}
