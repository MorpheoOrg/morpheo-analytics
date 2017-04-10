import {connect} from 'react-redux';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

import Bender from '../../../presentation/icons/bender';
import {signIn as signInActions} from '../actions';
import HelmetTitle from '../../../utils/HelmetTitle';
import FormTemplate from '../form/sign-in';
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
    }
};

const SignIn = (props) => {
    const {signInError, signIn, previousRoute} = props;

    return (
        <div style={style.main}>
            <HelmetTitle title="Sign in"/>
            <Bender width={73} style={style.logo} color={theme['primary-color']}/>
            <div style={style.form}>
                <h1>Login to Analytics</h1>
                <p style={style.p}>New around here ? <Link to='sign-up/'>Signup</Link> instead</p>
                {signInError &&
                <p className="error" role="alert">
                    <ul>
                        {Object.keys(signInError).map(o =>
                            <li key={o}>{o}: <ul>{signInError[o].map(x => <li key={x}>{x}</li>)}</ul></li>
                        )}
                    </ul>
                    {signInError.detail || signInError.message}
                </p>
                }
                <FormTemplate
                    signInError={signInError}
                    signIn={signIn}
                    previousRoute={previousRoute}
                />
            </div>
        </div>
    );
};

SignIn.propTypes = {
    signInError: PropTypes.oneOfType([
        PropTypes.shape({}),
        PropTypes.bool,
    ]),
    signIn: PropTypes.func,
    previousRoute: PropTypes.oneOfType([
        PropTypes.shape({}),
        PropTypes.string,
    ]),
};

SignIn.defaultProps = {
    signInError: null,
    signIn: null,
    previousRoute: null,
};

function mapStateToProps(state) {
    return {
        // get previousRoute from state
        previousRoute: getPreviousRoute(state),
        signInError: getError(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signIn: signInActions.request,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
