/**
 * Created by guillaume on 10/25/16.
 */


/**
 * Created by guillaume on 7/25/16.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

class MultiChoiceInput extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(value) {
        if (this.props.input.onChange) {
            this.props.input.onChange(value);
        }
    }

    onBlur() {
        if (this.props.input.onBlur) {
            this.props.input.onBlur();
        }
    }

    render() {
        const {options, input, label, meta: {error, warning}} = this.props;

        return (<div style={{marginTop: 15}}>
            <span style={{marginBottom: 5, display: 'block'}}>{label}</span>
            {options.map(o =>
                (<Button
                    raised
                    key={o.label}
                    label={o.label}
                    onClick={() => this.onChange(o.value)}
                    style={{margin: '0 6px 0 0', ...(+input.value === +o.value ? {backgroundColor: 'blue'} : {})}}
                    onBlur={this.onBlur}
                />),
            )}
            {(error && <span className="error">{error}</span>) || (warning && <span className="error">{warning}</span>)}
        </div>);
    }
}

MultiChoiceInput.propTypes = {
    input: PropTypes.shape({
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
    }),
    options: PropTypes.arrayOf(PropTypes.shape({})),
    meta: PropTypes.shape({}),
    label: PropTypes.string,
};

MultiChoiceInput.defaultProps = {
    input: null,
    options: null,
    meta: null,
    label: '',
};

export default MultiChoiceInput;
