import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const style = {
    margin: '20px 0 0 0',
    display: 'block',
};

const ErrorModal = ({isVisible, error, onClose}) => {
    const actions = [
        <FlatButton
            label="Close"
            primary
            onTouchTap={onClose}
        />,
    ];

    return (
        <div>
            <Dialog
                title="Server Error 5xx"
                actions={actions}
                modal={false}
                open={isVisible}
                onRequestClose={onClose}
            >
                <h1>An error occured from the server</h1>
                <p>Please report this issue to Etienne or Guillaume.
                    Sometimes the server struggles to serve our data.
                    Please retry in a few minutes</p>
                {error && <span className="error" style={style}>{error}</span>}
            </Dialog>
        </div>
    );
};

ErrorModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
};


export default onlyUpdateForKeys(['isVisible', 'error', 'onClose'])(ErrorModal);
