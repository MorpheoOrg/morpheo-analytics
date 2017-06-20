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
                <FormItem label="Username">
                    {getFieldDecorator('username', {
                        initialValue: user.username,
                        rules: [{required: true, message: 'Please provide a valid usernamme'}],
                    })(
                        <Input />,
                    )}
                </FormItem>
                <FormItem label="First Name">
                    {getFieldDecorator('first_name', {
                        initialValue: user.first_name,
                        rules: [{required: false}],
                    })(
                        <Input placeholder="first_name" />,
                    )}
                </FormItem>
                <FormItem label="Last Name">
                    {getFieldDecorator('last_name', {
                        initialValue: user.last_name,
                        rules: [{required: false}],
                    })(
                        <Input placeholder="Last Name" />,
                    )}
                </FormItem>
                <Button type="primary" htmlType="submit" size="large" loading={loading}>
                    Submit
                </Button>
            </Form>
        );
    }
}

UserFormContent.propTypes = {
    form: PropTypes.shape({
        validateFieldsAndScroll: PropTypes.func,
    }).isRequired,
    onConfirm: PropTypes.func.isRequired,
    user: PropTypes.shape({}).isRequired,
    loading: PropTypes.bool.isRequired,
};

export default onlyUpdateForKeys(['form', 'user'])(Form.create()(UserFormContent));
