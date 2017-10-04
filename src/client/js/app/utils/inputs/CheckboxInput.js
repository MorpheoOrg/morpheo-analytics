/**
 * Created by guillaume on 7/25/16.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';

class CheckboxInput extends Component {
    constructor(props) {
        super(props);
        this.onCheck = this.onCheck.bind(this);
    }

    onCheck(e, checked) {
        this.props.input.onChange(checked);
    }

    render() {
        return (<Checkbox
            {...this.props.input}
            label={this.props.label}
            checked={this.props.input.checked}
            onCheck={this.onCheck}
            style={this.props.style}
        />);
    }
}

CheckboxInput.propTypes = {
    input: PropTypes.shape({
        checked: PropTypes.bool,
        onChange: PropTypes.func,
    }),
    label: PropTypes.string,
    style: PropTypes.shape({}),
};

CheckboxInput.defaultProps = {
    input: null,
    label: '',
    style: null,
};

export default CheckboxInput;
