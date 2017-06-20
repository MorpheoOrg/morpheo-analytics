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

import {Form, Icon, Input, Button} from 'antd';

const FormItem = Form.Item;

const style = {
    main: {
        textAlign: 'left',
    },
    submit: {
        marginTop: 20,
        display: 'block',
        width: '100%',
    },
};


class SignUpForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.signUp(this.props.previousRoute, values);
            }
        });
    }

    render() {
        const {signUpError, form: {getFieldDecorator}} = this.props;

        return (<Form onSubmit={this.handleSubmit} style={style.main}>
            <FormItem>
                {getFieldDecorator('username', {
                    rules: [{required: true, message: 'Please input your username'}],
                })(
                    <Input addonBefore={<Icon type="user" />} placeholder="Username" />,
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('email', {
                    rules: [{required: true, message: 'Please input your email'}],
                })(
                    <Input addonBefore={'@'} placeholder="Email Adress" />,
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password1', {
                    rules: [{required: true, message: 'Please input your Password!'}],
                })(
                    <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />,
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password2', {
                    rules: [{required: true, message: 'Please input your Password!'}],
                })(
                    <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Confirm Password" />,
                )}
            </FormItem>
            <Button type={signUpError ? 'danger' : 'primary'} htmlType="submit" style={style.submit}>
                Log Sign Up
            </Button>
        </Form>);
    }
}


SignUpForm.propTypes = {
    signUpError: PropTypes.bool,
    signUp: PropTypes.func,
    previousRoute: PropTypes.oneOfType([
        PropTypes.shape({}),
        PropTypes.string,
    ]),
    form: PropTypes.shape({
        validateFields: PropTypes.func,
    }),
};

SignUpForm.defaultProps = {
    signUpError: null,
    signUp: null,
    previousRoute: null,
    form: null,
};

export default onlyUpdateForKeys(['signInError', 'previousRoute'])(Form.create()(SignUpForm));
