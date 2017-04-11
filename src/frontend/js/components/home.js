import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';


import experimentActions from '../business/models/experiment/actions';
import SignIn from '../business/user/components/SignIn';

import CreateModalHOC from './hoc/createModal';
import ExperimentForm from '../business/models/experiment/components/form/experiment';

const CreateExperimentForm = CreateModalHOC(ExperimentForm);

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onConfirm(formValue) {
        this.props.createExperiment({
            name: formValue.name,

            owner: this.props.user.username,
            shared_with: formValue.shared_with.map(k => k.replace('@', '')),

            description: formValue.description,
            metrics: formValue.metrics.split(',').map(m => m.replace(/\s+/g, '')),
            dataset: formValue.dataset,
            dataset_parameters: formValue.dataset_parameters,
            is_private: formValue.is_private,
        });
    }

    onCancel() {
        this.props.setExperimentModalCreate(false);
    }
    render() {
        const {user, modal, suggestions, loadUsernames, location: {pathname}} = this.props;

        return user && (!user.authenticated) ?
            ((['/sign-up/'].includes(pathname) || pathname.startsWith('/verify/')) ? null: <SignIn />) :
            // load living modal in whole app here for making it accesible from any route
            <div>
                <CreateExperimentForm isVisible={modal.create}
                                      onConfirm={this.onConfirm}
                                      onCancel={this.onCancel}
                                      suggestions={suggestions}
                                      loadUsernames={loadUsernames}
                />
            </div>;
    }
}

Home.propTypes = {
    user: PropTypes.shape({
        authenticated: PropTypes.bool,
        has_permission: PropTypes.bool,
    }),
};

Home.defaultProps = {
    user: null,
};

function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        modal: state.models.experiment.modal,
        suggestions: state.models.experiment.suggestions,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return bindActionCreators({
        setExperimentModalCreate: experimentActions.modal.create.set,
        createExperiment: experimentActions.item.create.request,
        loadUsernames: experimentActions.suggestions.request,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys(['user', 'modal', 'suggestions', 'location'])(withRouter(Home)));
