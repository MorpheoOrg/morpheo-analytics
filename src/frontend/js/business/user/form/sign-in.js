/**
 * Created by guillaume on 2/22/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
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
    },
};


class SignInForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.signIn(this.props.previousRoute, {
                    uuid: values.uuid,
                });
            }
        });
    }

    render() {
        const {signInError, form: {getFieldDecorator}} = this.props;

        return (<Form onSubmit={this.handleSubmit} style={style.main}>
            <FormItem>
                {getFieldDecorator('uuid', {
                    rules: [{required: true, message: 'please specify your uuid.'}],
                })(
                    <Input addonBefore={<Icon type="user" />} placeholder="uuid" />,
                )}
            </FormItem>
            <Button type={signInError ? 'danger' : 'primary'} htmlType="submit" style={style.submit}>
                Log in
            </Button>
        </Form>);
    }
}


SignInForm.propTypes = {
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

SignInForm.defaultProps = {
    signInError: null,
    signIn: null,
    previousRoute: null,
};

export default onlyUpdateForKeys(['signInError', 'previousRoute'])(Form.create()(SignInForm));
