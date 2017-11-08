import hfc from 'fabric-client';
import fs from 'fs';
import {clients, channels} from './common';

export const ORGS = hfc.getConfigSetting('config');

export const getClientForOrg = (org) => clients[org];

export const getChannelForOrg = (org) => channels[org];

export const getKeyStoreForOrg = org => hfc.getConfigSetting('keyValueStore') + '_' + org;

export const getOrgName = org => ORGS[org] ? ORGS[org].name : '';

const newRemotes = (names, forPeers, userOrg) => {
    let client = getClientForOrg(userOrg);

    let targets = [];
    // find the peer that match the names
    for (let idx in names) {
        let peerName = names[idx];
        if (ORGS[userOrg].peers[peerName]) {
            // found a peer matching the name
            let data = fs.readFileSync(ORGS[userOrg].peers[peerName]['tls_cacerts']);
            let grpcOpts = {
                pem: Buffer.from(data).toString(),
                'ssl-target-name-override': ORGS[userOrg].peers[peerName]['server-hostname'],
            };

            if (forPeers) {
                targets.push(client.newPeer(ORGS[userOrg].peers[peerName].requests, grpcOpts));
            } else {
                let eh = client.newEventHub();
                eh.setPeerAddr(ORGS[userOrg].peers[peerName].events, grpcOpts);
                targets.push(eh);
            }
        }
    }

    if (targets.length === 0) {
        console.error(util.format('Failed to find peers matching the names %s', names));
    }

    return targets;
};

const newPeers = (names, org) => newRemotes(names, true, org);

export const buildTarget = (peer, org) => {
    let target = null;
    if (typeof peer !== 'undefined') {
        let targets = newPeers([peer], org);
        if (targets && targets.length > 0) target = targets[0];
    }

    return target;
};

export default ORGS;
