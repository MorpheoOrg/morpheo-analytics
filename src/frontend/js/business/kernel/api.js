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
            // console.log(msg);
        }
    };

    return ws;
}
