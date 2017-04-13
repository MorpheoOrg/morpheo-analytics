import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'antd';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const style = {
    margin: '20px 0 0 0',
    display: 'block',
};

const getButtons = (onClick) => [
    <Button key="ok" type="primary" onClick={onClick}>
        Ok
    </Button>
];

const ErrorModal = ({isVisible, error, onClose}) => {

    // TODO memoize function
    const Buttons = getButtons(onClose);

    return (<Modal
        title="Server Error 5xx"
        visible={isVisible}
        onOk={onClose}
        onCancel={onClose}
        footer={Buttons}
    >
        <h1>An error occured from the server</h1>
        <p>Please report this issue to Etienne or Guillaume.
            Sometimes the server struggles to serve our data.
            Please retry in a few minutes</p>
        {error && <span className="error" style={style}>{error}</span>}
    </Modal>);
};

ErrorModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
};


export default onlyUpdateForKeys(['isVisible', 'error', 'onClose'])(ErrorModal);
