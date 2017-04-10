import React, {PropTypes} from 'react';
import {Modal} from 'antd';
import pure from 'recompose/pure';


const HOC = (Component, title = 'Create a new experiment') => {
    const CreateModal = (props) => {
        const {isVisible, onCancel, onConfirm} = props;

        return (
            <Modal
                visible={isVisible}
                title={title}
                onOk={onConfirm}
                wrapClassName='vertical-center-modal'
                onCancel={onCancel}
                width="600px"
                footer={null}
            >
                <Component {...props} />
            </Modal>
        );
    };

    CreateModal.propTypes = {
        isVisible: PropTypes.bool.isRequired,
        onCancel: PropTypes.func.isRequired,
    };

    return pure(CreateModal);
};

export default HOC;
