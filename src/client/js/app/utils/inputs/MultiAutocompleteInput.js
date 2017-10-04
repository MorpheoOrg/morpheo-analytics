/**
 * Created by guillaume on 7/25/16.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class MultiAutocompleteInput extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        if (this.props.onChange) {
            this.props.onChange(value);
        }

        if (this.props.input.onChange) {
            this.props.input.onChange(value);
        }
    }

    render() {
        const {name, input, placeholder, options, meta: {touched, error}} = this.props;

        return (<div>
            <Select
                {...input}
                name={name}
                onBlur={() => input.onBlur(input.value)}
                value={input.value || ''}
                onChange={this.onChange}
                options={options}
                backspaceRemoves={false}
                multi
                className="multi-autocomplete"
                placeholder={placeholder}
            />
            {touched && <span className="error">{error}</span> }
        </div>);
    }
}

MultiAutocompleteInput.propTypes = {
    name: PropTypes.string,
    input: PropTypes.shape({
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        value: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.shape({})),
            PropTypes.string,
            PropTypes.number,
        ]),
    }),
    placeholder: PropTypes.string,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string,
    }),
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({}),
    ),
};

const noop = () => {};

MultiAutocompleteInput.defaultProps = {
    name: '',
    input: null,
    placholder: '',
    meta: null,
    onChange: noop,
    options: null,
    placeholder: '',
};

export default MultiAutocompleteInput;
