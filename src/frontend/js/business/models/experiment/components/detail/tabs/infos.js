/**
 * Created by guillaume on 3/3/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Button, Popconfirm} from 'antd';

class Infos extends React.PureComponent {

    constructor(props) {
        super(props);
        this.deleteExperiment = this.deleteExperiment.bind(this);
    }

    deleteExperiment() {
        this.props.deleteExperiment(this.props.id);
    }

    render() {
        return (<Popconfirm
            placement="top"
            title={'Are you sure ?'}
            onConfirm={this.deleteExperiment}
            okText="Yes"
            cancelText="No"
        >
            <Button>Delete Experiment</Button>
        </Popconfirm>);
    }
}

Infos.propTypes = {
    id: PropTypes.string.isRequired,
    deleteExperiment: PropTypes.func.isRequired,
};

export default Infos;
