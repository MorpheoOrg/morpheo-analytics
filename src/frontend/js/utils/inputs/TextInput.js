/**
 * Created by guillaume on 7/25/16.
 */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
        return this.props.input.onChange(e.target.value);
    }

    render() {
        const {input, placeholder, type = 'text', meta: {touched, error}} = this.props;


        return (<div>
            <TextField
                fullWidth
                type={type}
                error={touched && !!error}
                placeholder={placeholder}
                {...input}
                onChange={this.onChange}
            />
            {touched && error && <span className="error">{error}</span>}
        </div>);
    }
}

TextInput.propTypes = {
    input: PropTypes.shape({
        onChange: PropTypes.func,
    }),
    placeholder: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string,
    }),
};

const noop = () => {};

TextInput.defaultProps = {
    input: null,
    placeholder: '',
    type: 'text',
    onChange: noop,
    meta: null,
};

export default TextInput;
