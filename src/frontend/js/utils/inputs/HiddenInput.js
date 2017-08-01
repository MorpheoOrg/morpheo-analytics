/**
 * Created by guillaume on 7/25/16.
 */
import React from 'react';
import PropTypes from 'prop-types';

const HiddenInput = ({input, id, type}) =>
    <input type={type} {...input} value={id} />;

HiddenInput.propTypes = {
    input: PropTypes.shape({}),
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    type: PropTypes.string,
};

export default HiddenInput;
