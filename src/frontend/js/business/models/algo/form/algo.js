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

AlgoFormContent.propTypes = {
    form: PropTypes.shape({
        validateFieldsAndScroll: PropTypes.func,
    }),
    onConfirm: PropTypes.func,
    error: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool,
};

const noop = () => {};
const array = [];

AlgoFormContent.defaultProps = {
    form: null,
    onConfirm: noop,
    error: array,
    loading: false,
};

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        error: getError(state),
    };
}


export default connect(mapStateToProps)(onlyUpdateForKeys(['error', 'form'])(Form.create()(AlgoFormContent)));
