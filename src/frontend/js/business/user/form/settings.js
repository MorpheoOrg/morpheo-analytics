import React from 'react';
import {Form, Input, Button} from 'antd';
import {onlyUpdateForKeys} from 'recompose';

const FormItem = Form.Item;

class UserFormContent extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onConfirm({
                    ...values,
                });
            }
        });
    }

    render() {
        const {form: {getFieldDecorator}, user, loading} = this.props;

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                <FormItem label='Username'>
                    {getFieldDecorator('username', {
                        initialValue: user.username,
                        rules: [{ required: true, message: 'Please provide a valid usernamme' }]
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label='First Name'>
                    {getFieldDecorator('first_name', {
                        initialValue: user.first_name,
                        rules: [{ required: false }]
                    })(
                        <Input placeholder='first_name' />
                    )}
                </FormItem>
                <FormItem label='Last Name'>
                    {getFieldDecorator('last_name', {
                        initialValue: user.last_name,
                        rules: [{ required: false }]
                    })(
                        <Input placeholder='Last Name' />
                    )}
                </FormItem>
                <Button type="primary" htmlType="submit" size="large" loading={loading}>
                    Submit
                </Button>
            </Form>
        );
    }
}

export default onlyUpdateForKeys(['form', 'user'])(Form.create()(UserFormContent));
