/* globals window fetch ORCHESTRATOR_API_URL */
import queryString from 'query-string';
import jwtDecode from 'jwt-decode'
import {call, select} from 'redux-saga/effects';

import {getCredentials} from '../../routes/home/components/Login/selectors';
import {FetchError} from '../../utils/errors';


// TODO: Remove this when blockchain implemented
const ORCHESTRATOR_API_URL = 'http://localhost:4000';


const fetchToken = async ({username, orgName}) => {
    const url = `${ORCHESTRATOR_API_URL}/users`;
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

    // If a token is avalaible and valid
    if (storedLedgerToken) {
        const jwt = jwtDecode(storedLedgerToken);
        const currentTime = Date.now().valueOf() / 1000;
        if (currentTime < jwt.exp - delta) return {token: storedLedgerToken};
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
    const url = `${ORCHESTRATOR_API_URL}/channels/${channelName}` +
        `/chaincodes/${chaincodeName}` +
        `?${queryString.stringify(parameters, {arrayFormat: 'bracket'})}`;
    console.log(url);
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


export const getAlgos = async ({
    channelName, chaincodeName, peer, problem_key, token,
}) => requestChaincode({
    channelName,
    chaincodeName,
    args: ['algo', problem_key],
    fcn: 'queryProblemItems',
    peer,
    token,
});


export const getLearnuplet = async ({
    algo_key, channelName, chaincodeName, peer, token,
}) => requestChaincode({
    channelName,
    chaincodeName,
    args: [algo_key],
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


export default {
    getAlgos,
    getLearnuplet,
    getProblems,
    getToken,
};
