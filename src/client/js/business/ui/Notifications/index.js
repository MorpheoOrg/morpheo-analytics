import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Snackbar} from 'material-ui';
import styled from 'react-emotion';

import actions from './actions';


const NotificationBox = styled.div`
    background-color: ${({type}) => type == 'SUCCESS' ? '#43A047' : '#F44336'} ;

    text-align: center;
    font-size: 0.875rem;
    font-weight: 400;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    line-height: 1.46429em;
    color: rgba(255, 255, 255, 1);

    padding-top: 8px;
    padding-bottom: 8px;

    min-width: 288px;
    max-width: 568px;

    border-radius: 2px;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
`;

const Notifications = ({opened, content, type, requestClose}) => (
    <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={opened}
        message={content}
        autoHideDuration={2000}
        onRequestClose={requestClose}
    >
        <NotificationBox
            type={type}
        >
            {content}
        </NotificationBox>
    </Snackbar>

);

Notifications.propTypes = {
    opened: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['ERROR', 'SUCCESS']).isRequired,

    requestClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    ...state.settings.notification,
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    requestClose: actions.close,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([
    'opened', 'content', 'type',
])(Notifications));
