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
    }
};

const SignUp = (props) => {
    const {signUpError, signUp, previousRoute, user: {registered}} = props;

    return (
        <div style={style.main}>
            <HelmetTitle title="Sign up"/>
            <Morpheo width={73} style={style.logo} color={theme['primary-color']}/>
            <div style={style.form}>
                <h1>Sign Up to Analytics</h1>
                {registered && <p>Yeah! You're now registered! Please check your email to login !</p>}
                {signUpError &&
                <p className="error" role="alert">
                    <ul>
                        {Object.keys(signUpError).map(o =>
                            <li key={o}>{o}: <ul>{signUpError[o].map(x => <li key={x}>{x}</li>)}</ul></li>
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
    signupError: PropTypes.bool,
    signup: PropTypes.func,
    previousRoute: PropTypes.oneOfType([
        PropTypes.shape({}),
        PropTypes.string,
    ]),
};

SignUp.defaultProps = {
    signUpError: null,
    signUp: null,
    previousRoute: null,
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
