import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {onlyUpdateForKeys} from 'recompose';

import actions from '../../actions';

import Top from './top';
import Tabs from './tabs/index';

class List extends React.PureComponent {
    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
    }
    componentWillMount() {
        // load lists
        if (!this.props.shared_with.list.loading && !this.props.shared_with.list.init) {
            this.props.loadSharedWithExperimentList();
        }

        if (!this.props._user.list.loading && !this.props._user.list.init) {
            this.props.loadUserExperimentList();
        }
    }

    showModal() {
        this.props.setExperimentModalCreate(true);
    }

    render() {
        const {_user, shared_with} = this.props;

        return (<div className="list">
            <Top showModal={this.showModal} />
            <Tabs _user={_user} shared_with={shared_with} />
        </div>);
    }
}

// type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
// decl := ReactPropTypes.{type}(.isRequired)?
List.propTypes = {
    user: PropTypes.shape({}),
    _user: PropTypes.shape({}),
    shared_with: PropTypes.shape({}),
};

List.defaultProps = {
    user: null,
    _user: null,
    shared_with: null,
};

function mapStateToProps(s, ownProps) {
    const state = s.models.experiment;

    return {
        user: s.user,
        _user: state.user,
        shared_with: state.shared_with,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

        loadSharedWithExperimentList: actions.shared_with.list.request,
        loadUserExperimentList: actions.user.list.request,

        setExperimentModalCreate: actions.modal.create.set,
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys(['_user', '_public', 'modal'])(List));
