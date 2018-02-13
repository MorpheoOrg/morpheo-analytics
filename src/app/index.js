import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onlyUpdateForKeys} from 'recompose';
import styled from 'react-emotion';

import getRoute from './routes';
import routes from './routesMap';

import {getAlgos, getLearnuplet, getProblems, getToken} from './models/ledger/api';

const requestBlockchain = async () => {
    const {token} = await getToken({
        username: 'Jim',
        orgName: 'aphp',
    });
    console.log(token);


    const problems = await getProblems({
        channelName: 'mychannel',
        chaincodeName: 'mycc',
        peer: 'peer1',
        token,
    });
    console.log(problems);

    const algos = await getAlgos({
        channelName: 'mychannel',
        chaincodeName: 'mycc',
        peer: 'peer1',
        problem_key: 'problem_1',
        token,
    });
    console.log(algos);

    const learnuplet = await getLearnuplet({
        channelName: 'mychannel',
        chaincodeName: 'mycc',
        peer: 'peer1',
        algo_key: 'algo_0',
        token,
    });
    console.log(learnuplet);
};

// requestBlockchain();


const Container = styled('div')`
    height: 100%;
`;

const Routes = ({location}) => (
    <Container>
        {console.log(location)}
        {Object.keys(routes).includes(location.type) ? (
            getRoute(location.type)
        ) : (
            <h1>Not Found</h1>
        )}
    </Container>
);


Routes.propTypes = {
    location: PropTypes.shape({
        type: PropTypes.string.isRequired,
    }).isRequired,
};


const mapStateToProps = ({location}) => ({location});

export default connect(mapStateToProps)(onlyUpdateForKeys([
    'location',
])(Routes));
