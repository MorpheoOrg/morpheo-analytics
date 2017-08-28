/**
 * Created by guillaume on 7/25/16.
 */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const TextAreaInput = ({input, placeholder, floatingLabelText, type, meta: {touched, error}, style}) =>
    (<TextField
        inputStyle={{WebkitBoxShadow: '0 0 0 1000px white inset'}}
        type={type}
        hintStyle={{zIndex: '1'}}
        errorText={touched && error}
        placeholder={placeholder}
        multiLine
        floatingLabelText={floatingLabelText}
        style={style}
        {...input}
    />);

TextAreaInput.propTypes = {
    input: PropTypes.shape({}),
    placeholder: PropTypes.string,
    floatingLabelText: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string,
    }),
    style: PropTypes.shape({}),
};

TextAreaInput.defaultProps = {
    input: null,
    placeholder: '',
    floatingLabelText: '',
    type: 'text',
    meta: null,
    style: null,
};

export default TextAreaInput;
