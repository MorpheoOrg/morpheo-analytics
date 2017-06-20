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
import {Link} from 'react-router-dom';

import Morpheo from '../../../presentation/icons/morpheo';
import {signUp as signUpActions} from '../actions';
import HelmetTitle from '../../../utils/HelmetTitle';
import FormTemplate from '../form/sign-up';
import {getPreviousRoute, getError} from '../selector';
import theme from '../../../../css/variables';

const style = {
    logo: {
        margin: '20% auto 40px',
        display: 'block',
    },
    main: {
        margin: '0 auto',
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
    back: {
        marginTop: 20,
        display: 'block',
    },
};

const SignUp = (props) => {
    const {signUpError, signUp, previousRoute, user: {registered}} = props;

    return (
        <div style={style.main}>
            <HelmetTitle title="Sign up" />
            <Morpheo width={73} style={style.logo} color={theme['primary-color']} />
            <div style={style.form}>
                <h1>Sign Up to Analytics</h1>
                {registered && <p>{'Yeah! You\'re now registered! Please check your email to login !'}</p>}
                {signUpError &&
                <p className="error" role="alert">
                    <ul>
                        {Object.keys(signUpError).map(o =>
                            <li key={o}>{o}: <ul>{signUpError[o].map(x => <li key={x}>{x}</li>)}</ul></li>,
                        )}
                    </ul>
                    {signUpError.detail || signUpError.message}
                </p>
                }
                {signUpError && <p className="error" role="alert">{signUpError.detail || signUpError.message}</p>}
                {!registered && <FormTemplate
                    signUpError={signUpError}
                    signUp={signUp}
                    previousRoute={previousRoute}
                />
                }
                <Link style={style.back} to="/">Back to Log-in</Link>
            </div>
        </div>
    );
};

SignUp.propTypes = {
    signUpError: PropTypes.bool,
    signUp: PropTypes.func,
    previousRoute: PropTypes.oneOfType([
        PropTypes.shape({}),
        PropTypes.string,
    ]),
    user: PropTypes.shape({}),
};

SignUp.defaultProps = {
    signUpError: null,
    signUp: null,
    previousRoute: null,
    user: null,
};

function mapStateToProps(state) {
    return {
        // get previousRoute from state
        user: state.user,
        previousRoute: getPreviousRoute(state),
        signUpError: getError(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signUp: signUpActions.request,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
