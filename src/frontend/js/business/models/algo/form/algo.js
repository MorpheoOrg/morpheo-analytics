import React from 'react';
import {Form, Input, Button} from 'antd';
import {connect} from 'react-redux';
import {onlyUpdateForKeys} from 'recompose';

import {getError} from '../selector';

const FormItem = Form.Item;

class AlgoFormContent extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onConfirm(values);
            }
        });
    }

    render() {
        const {error, form: {getFieldDecorator, isFieldsTouched}} = this.props;

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                <FormItem label="Name">
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: 'Please provide an algo name'}],
                    })(
                        <Input placeholder="Name" />,
                    )}
                </FormItem>
                <FormItem label="Hyper Parameters (Comma separated list)">
                    {getFieldDecorator('parameters', {
                        rules: [{required: true, message: 'Please provide algo parameters'}],
                    })(
                        <Input placeholder="Parameters" />,
                    )}
                </FormItem>
                {isFieldsTouched() && error && error.map(e =>
                    <span key={e} className="error">{e}</span>,
                )}

                <Button type="primary" htmlType="submit" size="large" loading={this.props.loading}>
                    Submit
                </Button>
            </Form>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        error: getError(state),
    };
}


export default connect(mapStateToProps)(onlyUpdateForKeys(['error', 'form'])(Form.create()(AlgoFormContent)));
