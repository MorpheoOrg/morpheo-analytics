/**
 * Created by guillaume on 7/25/16.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Creatable} from 'react-select';

class CreatableMultiAutocompleteInput extends Component {
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
            <Creatable
                {...input}
                name={name}
                onBlur={() => input.onBlur(input.value)}
                value={input.value || ''}
                onChange={this.onChange}
                backspaceRemoves={false}
                multi
                allowCreate
                className="multi-autocomplete"
                placeholder={placeholder}
                options={options || []}
            />
            {touched && <span className="error">{error}</span> }
        </div>);
    }
}

CreatableMultiAutocompleteInput.propTypes = {
    name: PropTypes.string,
    input: PropTypes.shape({
        onChange: PropTypes.func,
    }),
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.shape({}),
    ])),
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string,
    }),
    onChange: PropTypes.func,
};

const noop = () => {};

CreatableMultiAutocompleteInput.defaultProps = {
    name: '',
    input: null,
    placeholder: '',
    options: null,
    meta: null,
    onChange: noop,
};

export default CreatableMultiAutocompleteInput;
