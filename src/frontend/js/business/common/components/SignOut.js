import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {signOut as signOutActions} from '../../user/actions';

class Common extends React.Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    signOut(e) {
        const {signOut} = this.props;
        signOut();
    }

    render() {
        return <Button onClick={this.signOut}>Signout</Button>;
    }
}

Common.propTypes = {
    signOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    signOut: signOutActions.request,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Common);
