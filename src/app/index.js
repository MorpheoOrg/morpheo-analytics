import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onlyUpdateForKeys} from 'recompose';
import styled from 'react-emotion';

import getRoute from './routes';
import routes from './routesMap';

const Container = styled('div')`
    height: 100%;
`;

const Routes = ({location}) => (
    <Container>
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
