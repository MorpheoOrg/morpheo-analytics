import {connect} from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import actions from '../actions';

class Verification extends React.Component {

    componentWillMount() {
        this.props.verify(this.props.params.key)
    }

    render() {
        return (
            <div>
                <p>Please wait a few seconds, we're are validating your subscription</p>
            </div>
        );
    };
}

Verification.propTypes = {
};

Verification.defaultProps = {
};

function mapStateToProps(state, ownProps) {
    return {
        params: ownProps.match.params,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        verify: actions.verify.request,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Verification);
