import React from 'react';
import {Button, Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {signOut as signOutActions} from '../business/user/actions';
import experimentActions from '../business/models/experiment/actions';
import userActions from '../business/user/actions';

import Bender from '../presentation/icons/bender';
import theme from '../../css/variables';

import UserSettings from '../business/user/components/modal';

const style = {
    menu: {
        width: 60,
        height: '100%',
        position: 'fixed',
        left: 0,
        top: 0,
        background: '#fff',
        borderRight: '1px solid rgb(233, 233, 233)',
        boxShadow: '2px 5px 3px px rgba(0,0,0, 0.08)',
        zIndex: 1,
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        padding: '7px 14px',
    },
    button: {
        marginBottom: 13,
    },
    logo: {
        margin: '20px 10px 10px 10px',
    },
};

class LeftMenu extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.showModal = this.showModal.bind(this);
        this.showUserModal = this.showUserModal.bind(this);
    }

    logout() {
        this.props.signOut();
    }

    showModal() {
        this.props.setExperimentModalCreate(true);
    }

    showUserModal() {
        this.props.setUserModal(true);
    }

    render() {

        return (
            <div style={style.menu}>
                <Link to="/experiments">
                    <Bender width={42} height={42} style={style.logo} color={theme['primary-color']}/>
                </Link>
                <div style={style.bottom}>
                    <Tooltip placement="right" title={'New Experiment'}>
                        <Button
                            type="ghost"
                            size="large"
                            shape="circle-outline"
                            icon="plus"
                            style={style.button}
                            onClick={this.showModal}
                        />
                    </Tooltip>
                    <Tooltip placement='right' title={'User'}>
                        <UserSettings/>
                        <Button
                            type='ghost'
                            size='large'
                            shape='circle-outline'
                            icon='user'
                            style={style.button}
                            onClick={this.showUserModal}
                        />
                    </Tooltip>
                    <Tooltip placement="right" title={'Log out'}>
                        <Button
                            type="ghost"
                            size="large"
                            shape="circle-outline"
                            icon="logout"
                            onClick={this.logout}
                            style={style.button}
                        />
                    </Tooltip>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return bindActionCreators({
        signOut: signOutActions.request,

        setExperimentModalCreate: experimentActions.modal.create.set,
        setUserModal: userActions.modal.set,
        createExperiment: experimentActions.item.create.request,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
