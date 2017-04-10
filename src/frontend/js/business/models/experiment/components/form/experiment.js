import React from 'react';
import {Form, Input, Button, Mention} from 'antd';
import {onlyUpdateForKeys} from 'recompose';

const FormItem = Form.Item;
const getMentions = Mention.getMentions;

class ExperimentFormContent extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);

        this.style = {
            suggestion: {
                zIndex: 2,
            }
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onConfirm({
                    ...values,
                    shared_with: getMentions(values.shared_with),
                });
            }
        });
    }

    onSearchChange(value) {
        this.props.loadUsernames(value.toLowerCase());
    }

    render() {
        const {form: {getFieldDecorator}, suggestions, loading} = this.props;

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                <FormItem label="Name">
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: 'Please provide an experiment name'}],
                    })(
                        <Input placeholder="Name"/>,
                    )}
                </FormItem>
                <FormItem label="Description">
                    {getFieldDecorator('description', {
                        rules: [{required: true, message: 'Please provide a description'}],
                    })(
                        <Input type="textarea" rows={3} placeholder="Description"/>,
                    )}
                </FormItem>
                <FormItem label="Metrics (Comma separated list)">
                    {getFieldDecorator('metrics', {
                        rules: [{required: true, message: 'Please provide metrics'}],
                    })(
                        <Input placeholder="Metrics"/>,
                    )}
                </FormItem>
                <FormItem label="Dataset">
                    {getFieldDecorator('dataset', {
                        rules: [{required: true, message: 'Please provide dataset information'}],
                    })(
                        <Input placeholder="Dataset"/>,
                    )}
                </FormItem>
                <FormItem label="Dataset Parameters (Optional)">
                    {getFieldDecorator('dataset_parameters', {
                        rules: [{required: false, message: '(Optional) provide dataset parameters'}],
                    })(
                        <Input placeholder="Dataset Parameters"/>,
                    )}
                </FormItem>
                <FormItem label='Share your experiment (Optional)'>
                    {getFieldDecorator('shared_with', {
                        rules: [{required: false, message: '(Optional) share your experiment'}]
                    })(
                        <Mention
                            placeholder='@username'
                            notFoundContent='Type @username'
                            suggestions={suggestions.results}
                            suggestionStyle={this.style.suggestion}
                            loading={suggestions.loading}
                            onSearchChange={this.onSearchChange}
                        />
                    )}
                </FormItem>
                <Button type="primary" htmlType="submit" size="large" loading={loading}>
                    Submit
                </Button>
            </Form>
        );
    }
}

export default onlyUpdateForKeys(['form', 'suggestions'])(Form.create()(ExperimentFormContent));
