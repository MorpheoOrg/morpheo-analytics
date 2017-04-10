/**
 * Created by guillaume on 3/24/17.
 */
import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import UserSettings from './settings';
import CreateModalHOC from '../../../components/hoc/createModal';
import experimentActions from '../../models/experiment/actions';
import actions from '../actions';

const Modal = CreateModalHOC(UserSettings, 'My settings');

class UserModal extends React.Component {
    constructor(props) {
        super(props);
        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillMount() {
        // load lists
        if (!this.props.shared_with.list.loading && !this.props.shared_with.list.init) {
            this.props.loadSharedWithExperimentList();
        }
    }

    onConfirm() {
        alert('submitted!')
    }

    onCancel() {
        this.props.setUserModal(false);
    }

    render() {

        const {user, shared_with} = this.props;

        return <Modal
            isVisible={user.modal}
            title={user.username}
            user={user}
            shared_with={shared_with}
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
        />
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        shared_with: state.models.experiment.shared_with,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return bindActionCreators({
        loadSharedWithExperimentList: experimentActions.shared_with.list.request,
        setUserModal: actions.modal.set,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
