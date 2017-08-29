import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {shouldUpdate} from 'recompose';

import {signOut as signOutActions} from '../../user/actions';

const style = {
    float: 'right',
};

const Common = ({signOut}) =>
    <Button style={style} raised onClick={signOut}>Signout</Button>;

Common.propTypes = {
    signOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    signOut: signOutActions.request,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(shouldUpdate((props, nextProps) => false)(Common));
