/* globals NODE_PROXY_URL window fetch */
import queryString from 'query-string';
import jwtDecode from 'jwt-decode';
import {call, select} from 'redux-saga/effects';

import {getCredentials} from '../../routes/home/components/Login/selectors';
import {FetchError} from '../../utils/errors';


const fetchToken = async ({username, orgName}) => {
    const url = `${NODE_PROXY_URL}/users`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString.stringify({username, orgName}),
    });

    if (response.status !== 200) {
        throw new FetchError(await response.text(), response.status);
    }

    const {token} = await response.json();

    return {token};
};

export function* getToken() {
    const delta = 60; // Time in second before the expiration of the token
    const storedLedgerToken = window.localStorage.getItem('ledgerToken');

    // If a token is available and valid
    if (storedLedgerToken) {
        const jwt = jwtDecode(storedLedgerToken);
        const currentTime = Date.now().valueOf() / 1000;
        if (currentTime < jwt.exp - delta) {
            return {token: storedLedgerToken};
        }
    }

    // If not, we fetch the token from credentials
    const {
        username, org,
    } = yield select(getCredentials);

    const {token} = yield call(fetchToken, {username, orgName: org});
    window.localStorage.setItem('ledgerToken', token);

    return {token};
}


const requestChaincode = async ({
    channelName, chaincodeName, token, ...parameters,
}) => {
    const url = `${NODE_PROXY_URL}/channels/${channelName}` +
        `/chaincodes/${chaincodeName}` +
        `?${queryString.stringify(parameters, {arrayFormat: 'bracket'})}`;
    const response = await fetch(url, {
        headers: {
            'content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    });

    if (response.status !== 200) {
        throw new FetchError(await response.text(), response.status);
    }

    return response.json();
};


const invokeChaincode = async ({
    channelName, chaincodeName, token, ...parameters,
}) => {
    const url = `${NODE_PROXY_URL}/channels/${channelName}` +
        `/chaincodes/${chaincodeName}` +
        `?${queryString.stringify(parameters, {arrayFormat: 'bracket'})}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parameters),
    });

    if (response.status !== 200) {
        throw new FetchError(await response.text(), response.status);
    }
};


export const getAlgos = async ({
    channelName, chaincodeName, peer, problemId, token,
}) => requestChaincode({
    channelName,
    chaincodeName,
    args: ['algo', problemId],
    fcn: 'queryProblemItems',
    peer,
    token,
});


export const getLearnuplet = async ({
    algorithmId, channelName, chaincodeName, peer, token,
}) => requestChaincode({
    channelName,
    chaincodeName,
    args: [algorithmId],
    fcn: 'queryAlgoLearnuplet',
    peer,
    token,
});


export const getProblems = async ({
    channelName, chaincodeName, peer, token,
}) => requestChaincode({
    channelName,
    chaincodeName,
    args: ['problem'],
    fcn: 'queryObjects',
    peer,
    token,
});


export const postAlgo = async ({
    channelName, chaincodeName, peers, token,
    storageAdress, problemId, algorithmName
}) => invokeChaincode({
    channelName,
    chaincodeName,
    args: ['algo', storageAdress, problemId, algorithmName],
    fcn: 'registerItem',
    peers: ['peer1', 'peer2'],
    token,
});


export default {
    getAlgos,
    getLearnuplet,
    getProblems,
    getToken,
    postAlgo,
};
