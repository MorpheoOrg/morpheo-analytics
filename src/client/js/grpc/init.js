import fs from 'fs';
import hfc from 'fabric-client';
import copService from 'fabric-ca-client';

// conf need to be the first to be imported
import './conf';
import {getKeyStoreForOrg, ORGS} from './helper';
import {clients, caClients, channels} from './common';

export const setup = () => {
    // set up the client and channel objects for each org that are not orderer

    Object.keys(ORGS).filter(o => o !== 'orderer').map(key => {
        // create a client per organization
        const client = new hfc();

        // create keystore folder on client host
        let cryptoSuite = hfc.newCryptoSuite();
        cryptoSuite.setCryptoKeyStore(hfc.newCryptoKeyStore({path: getKeyStoreForOrg(ORGS[key].name)}));
        client.setCryptoSuite(cryptoSuite);

        // create channel linked to client
        let channel = client.newChannel(hfc.getConfigSetting('channelName'));
        // link orderer to channel
        channel.addOrderer(newOrderer(client));

        // store it
        clients[key] = client;
        channels[key] = channel;

        // store peer in channel
        setupPeers(channel, key, client);

        // store ca url to cryptoSuite
        let caUrl = ORGS[key].ca;
        caClients[key] = new copService(caUrl, null /*defautl TLS opts*/, '' /* default CA */, cryptoSuite);
    });
};


const newOrderer = (client) => {
    const caRootsPath = ORGS.orderer.tls_cacerts;
    const data = fs.readFileSync(caRootsPath);
    const caroots = Buffer.from(data).toString();
    return client.newOrderer(ORGS.orderer.url, {
        'pem': caroots,
        'ssl-target-name-override': ORGS.orderer['server-hostname'],
    });
};

const setupPeers = (channel, org, client) => {
    Object.keys(ORGS[org].peers).map(key => {
        const data = fs.readFileSync(ORGS[org].peers[key]['tls_cacerts']);
        let peer = client.newPeer(
            ORGS[org].peers[key].requests,
            {
                pem: Buffer.from(data).toString(),
                'ssl-target-name-override': ORGS[org].peers[key]['server-hostname'],
            },
        );
        peer.setName(key);

        channel.addPeer(peer);
    });
};

export default setup;
