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
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import {reduxForm, Field} from 'redux-form';
import Button from 'material-ui/Button';

import TextInput from '../../../utils/inputs/TextInput';

const style = {
    main: {
        textAlign: 'left',
    },
    submit: {
        marginTop: 20,
        display: 'block',
        width: '100%',
    },
    input: {
        width: '100%',
    },
};

const SignInForm = ({signInError, signIn, handleSubmit}) =>
    (<form onSubmit={handleSubmit(signIn)} style={style.main}>
        <Field name="uuid" component={TextInput} type="text" placeholder="uuid" />
        {signInError && signInError.uuid && signInError.uuid.map((error, i) => (
            <span key={error} className="error">{error}</span>))
        }
        <Button
            raised
            color={signInError ? 'accent' : 'primary'}
            style={style.submit}
            onClick={handleSubmit(signIn)}
        >
            Log in
        </Button>
    </form>);


SignInForm.propTypes = {
    signInError: PropTypes.oneOfType([
        PropTypes.shape({}),
        PropTypes.bool,
    ]),
    signIn: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
};

SignInForm.defaultProps = {
    signInError: null,
    signIn: null,
};

export default onlyUpdateForKeys(['signInError'])(reduxForm(
    {
        form: 'signIn',
        validate: (values) => {
            const errors = {};
            const requiredFields = ['uuid'];
            requiredFields.forEach((field) => {
                if (values && !values[field]) {
                    errors[field] = 'Required';
                }
            });
            return errors;
        },
    })(SignInForm));
