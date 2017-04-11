import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import actions from './actions';
import {signOut as signOutActions} from '../business/user/actions';

import LeftMenu from '../components/left-menu';
import ErrorModal from '../presentation/modals/error';

class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {user} = nextProps;
        const currentTime = Math.floor(Date.now() / 1000);

        if (user.token && user.exp && user.exp < currentTime) {
            this.props.signOut();
        }
    }

    onClose() {
        this.props.onClose('');
    }

    render() {
        const {user, general} = this.props;
        return (
            <div className="app">
                {user && user.authenticated && <LeftMenu /> }
                 <ErrorModal
                 isVisible={general.error !== ''}
                 error={general.error}
                 onClose={this.onClose}
                 />
            </div>
        );
    }
}

App.propTypes = {
    user: PropTypes.shape({}),
    onClose: PropTypes.func,
    signOut: PropTypes.func,
    general: PropTypes.shape({}),
};

App.defaultProps = {
    user: null,
    onClose: null,
    signOut: null,
    general: null,
};


function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        general: state.general,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onClose: actions.error.set,
        signOut: signOutActions.request,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
