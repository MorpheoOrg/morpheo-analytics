/**
 * Copyright Morpheo Org. 2017
 *
 * contact@morpheo.co
 *
 * This software is part of the Morpheo project, an open-source machine
 * learning platform.
 *
 * This software is governed by the CeCILL license, compatible with the
 * GNU GPL, under French law and abiding by the rules of distribution of
 * free software. You can  use, modify and/ or redistribute the software
 * under the terms of the CeCILL license as circulated by CEA, CNRS and
 * INRIA at the following URL "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {signOut, modal} from '../business/user/actions';

import Morpheo from '../presentation/icons/morpheo';
import theme from '../../css/variables';

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
                <Link to="/problem">
                    <Morpheo width={40} height={40} style={style.logo} color={theme['primary-color']} />
                </Link>
            </div>
        );
    }
}

LeftMenu.propTypes = {
    // user: PropTypes.shape({}).isRequired,
    signOut: PropTypes.func,
    setUserModal: PropTypes.func,
    setExperimentModalCreate: PropTypes.func,
};

const noop = () => {};

LeftMenu.defaultProps = {
    signOut: noop,
    setUserModal: noop,
    setExperimentModalCreate: noop,
};

function mapStateToProps(state, ownProps) {
    return {
        // user: state.user,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return bindActionCreators({
        signOut: signOut.request,
        setUserModal: modal.set,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
