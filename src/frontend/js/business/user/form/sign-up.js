/**
 * Created by guillaume on 2/22/17.
 */

import React, {PropTypes} from 'react';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import {Form, Icon, Input, Button, Checkbox} from 'antd';

const FormItem = Form.Item;

const style = {
    main: {
        textAlign: 'left',
    },
    submit: {
        marginTop: 20,
        display: 'block',
        width: '100%',
    }
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
                    rules: [{ required: true, message: 'Please input your username' }]
                })(
                    <Input addonBefore={<Icon type='user' />} placeholder='Username' />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your email' }]
                })(
                    <Input addonBefore={'@'} placeholder='Email Adress' />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password1', {
                    rules: [{ required: true, message: 'Please input your Password!' }]
                })(
                    <Input addonBefore={<Icon type='lock' />} type='password' placeholder='Password' />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password2', {
                    rules: [{ required: true, message: 'Please input your Password!' }]
                })(
                    <Input addonBefore={<Icon type='lock' />} type='password' placeholder='Confirm Password' />
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
    signup: PropTypes.func,
    previousRoute: PropTypes.oneOfType([
        PropTypes.shape({}),
        PropTypes.string,
    ]),
};

SignUpForm.defaultProps = {
    signUpError: null,
    signUp: null,
    previousRoute: null,
};

export default onlyUpdateForKeys(['signInError', 'previousRoute'])(Form.create()(SignUpForm));
