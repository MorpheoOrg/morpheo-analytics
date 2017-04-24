import {PropTypes} from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {connectKernel} from '../actions';


const ConnectButton = ({ws_connection, dispatch}) => {
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inpsb3RlbiJ9.6kZ-0Y96-gAzrOXzqH91F9WAgAAFXpRaayVifYjuEv4';

    return (
        <button
            onClick={() => dispatch(connectKernel('127.0.0.1', '8080', jwt))}
        >
            {ws_connection ? 'Stop Kernel' : 'Launch Kernel'}
        </button>
    );
};


ConnectButton.propTypes = {
    ws_connection: PropTypes.bool.isRequired,
    dispatch: PropTypes.func,
};
ConnectButton.defaultProps = {
    dispatch: undefined,
};
const mapStateToProps = state => ({
    ws_connection: state.ws_connection,
});

export default connect(
  mapStateToProps,
)(ConnectButton);
