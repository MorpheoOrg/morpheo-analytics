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

import {connect} from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import Morpheo from '../../common/components/presentation/icons/morpheo';
import {signIn as signInActions} from '../actions';
import HelmetTitle from '../../../utils/HelmetTitle';
import FormTemplate from '../form/signIn';
import {getError} from '../selector';
import theme from '../../../../css/variables';

const style = {
    logo: {
        margin: '0 auto 40px',
        display: 'block',
    },
    main: {
        margin: '0 auto',
        padding: '10% 0 0',
    },
    title: {
        fontSize: '3.5rem',
        fontWeight: '300',
    },
    form: {
        width: 380,
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '50px 30px 10px',
        borderRadius: 10,
        textAlign: 'center',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
    },
    p: {
        margin: '10px 0 30px',
    },
};

class SignIn extends React.Component {
    signIn = ({uuid}) => {
        this.props.signIn({uuid, previousRoute: this.props.location.prev});
    };

    render() {
        const {signInError} = this.props;

        return (
            <div style={style.main}>
                <HelmetTitle title="Sign in" />
                <Morpheo width={73} style={style.logo} color={theme['primary-color']} />
                <div style={style.form}>
                    <h1>Login to Notebook</h1>
                    <p style={style.p}>For getting an uuid please ask to an administrator</p>
                    {signInError &&
                    <div className="error" role="alert">
                        <ul>
                            {signInError.length && Object.keys(signInError).map(o =>
                                (<li key={o}>
                                    {o}:
                                    <ul>{signInError[o].map(x => <li key={x}>{x}</li>)}</ul>
                                </li>),
                            )}
                        </ul>
                        {signInError.detail || signInError.message}
                    </div>
                    }
                    <FormTemplate
                        signInError={signInError}
                        signIn={this.signIn}
                    />
                </div>
            </div>
        );
    }
}

SignIn.propTypes = {
    signInError: PropTypes.oneOfType([
        PropTypes.shape({}),
        PropTypes.bool,
    ]),
    signIn: PropTypes.func,
    location: PropTypes.shape({
        prev: PropTypes.shape({}),
    }).isRequired,
};

SignIn.defaultProps = {
    signInError: null,
    signIn: null,
};

function mapStateToProps(state) {
    return {
        // get previousRoute from state
        location: state.location,
        signInError: getError(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signIn: signInActions.request,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
