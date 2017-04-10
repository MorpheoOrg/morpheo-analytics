import React, {Component} from 'react';
import {Select} from 'antd';
import {onlyUpdateForKeys} from 'recompose';
import {uniq} from 'lodash';

const Option = Select.Option;

const style = {
    top: '-2px',
    minWidth: '160px',
};

class SelectVar extends Component {

    constructor(props) {
        super(props);
        this.handleSelectMetric = this.handleSelectMetric.bind(this);
        this.handleSelectParameter = this.handleSelectParameter.bind(this);
    }

    componentWillMount() {

        const {selectedMetric, item, setSelectedMetric} = this.props;

        if (!selectedMetric || (item && item.metrics.length && !item.metrics.includes(selectedMetric))) {
            setSelectedMetric(item.metrics[0]);
        }
    }

    handleSelectMetric(value) {
        this.props.setSelectedMetric(value);
    }

    handleSelectParameter(value) {
        this.props.setSelectedParameter(value);
    }

    render() {
        const {selectedMetric, algos, item} = this.props;

        //TODO put parameters results in selector

        return (
            <div>
                <Select
                    placeholder={'Parameters'}
                    style={style}
                    onChange={this.handleSelectParameter}
                >
                    <Option key='' value={null}> --- </Option>
                    {uniq(algos.results.reduce((previous, current) =>
                            [...previous, ...current.parameters.map(o => o.name)],
                        [])).map(el =>
                        <Option key={el} value={el}>{el}</Option>,
                    )}
                </Select>
                <Select
                    placeholder={'Metrics'}
                    defaultValue={selectedMetric || item.metrics[0]}
                    style={style}
                    onChange={this.handleSelectMetric}
                    size="large"
                >
                    <Option key='' value={null}> --- </Option>
                    {item.metrics.map(el =>
                        <Option key={el} value={el}>{el}</Option>,
                    )}
                </Select>
            </div>);
    }
}


export default onlyUpdateForKeys(['selectedVar', 'algos', 'item'])(SelectVar);
