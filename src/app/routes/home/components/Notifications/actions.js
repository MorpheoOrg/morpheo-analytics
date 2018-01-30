import PropTypes from 'prop-types';

import {createActionWithCheck} from '../../../../utils/redux-actions';


export const actionsTypes = {
    send: 'NOTIFICATION::SEND',
    close: 'NOTIFICATION::CLOSE',
};


export default {
    /**
     * Open a new notification message.
     *
     * @param {string} content -
     *   Content displayed by the notification.
     * @param {('SUCCESS'|'ERROR')} type -
     *   Type of the message.
     */
    send: createActionWithCheck(actionsTypes.send, {
        content: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['SUCCESS', 'ERROR']),
    }),
    /** Close the notification panel. */
    close: createActionWithCheck(actionsTypes.close),
};
