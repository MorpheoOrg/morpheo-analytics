import React, {Component} from 'react';
import {Col, Card} from 'antd';
import {onlyUpdateForKeys} from 'recompose';
import {ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip} from 'recharts';

import Select from './select';
import CustomTooltip from './tooltip';

const style = {
    bodyStyle: {
        height: 220,
        padding: 10,
    },
    scatter: {
        top: 20,
        right: 15,
        bottom: -10,
        left: -25,
    },
    select: {
        x: {
            width: 200,
        },
        y: {
            width: 200,
            top: '-4px',
            position: 'relative',
        },
    },
};

const SelectX = ({item, setScatterCoord}) =>
    <Select
        style={style.select.x}
        placeholder="Select X axis"
        defaultValue={item.metrics[0]}
        onChange={setScatterCoord}
        results={item.metrics}
    />;


const SelectY = ({algos, setScatterCoord}) =>
    <Select
        style={style.select.y}
        placeholder="Select Y axis"
        defaultValue={algos[0].parameters[0]}
        onChange={setScatterCoord}
        results={algos.reduce((p, c) => [...p, ...c.parameters], [])}
    />;

class ScatterChartWidget extends Component {
    componentWillMount() {
        if (!this.props.scatter.x) {
            this.props.setScatterX(this.props.item.metrics[0]);
        }
        if (!this.props.scatter.y) {
            this.props.setScatterY(this.props.algos[0].parameters[0]);
        }
    }

    render() {
        const {scatterChartData, trials, algos, scatter, item, setScatterX, setScatterY} = this.props;

        return (
            <Col span={24}>
                <Card
                    bordered={false}
                    title={<SelectY algos={algos} setScatterCoord={setScatterY} />}
                    extra={<SelectX item={item} setScatterCoord={setScatterX} />}
                    bodyStyle={style.bodyStyle}
                >
                    <ResponsiveContainer>
                        <ScatterChart height={200} margin={style.scatter}>
                            <Scatter data={scatterChartData} fill="#008cec" />
                            <YAxis dataKey={'X'} domain={['auto', 'auto']} name={scatter.x} />
                            <XAxis dataKey={'Y'} domain={['auto', 'auto']} name={scatter.y} />
                            <ZAxis dataKey={'id'} />
                            <Tooltip content={<CustomTooltip trials={trials} />} offset={25} />
                            <CartesianGrid />
                        </ScatterChart>
                    </ResponsiveContainer>
                </Card>
            </Col>
        );
    }
}

export default onlyUpdateForKeys(['scatterChartData', 'trials', 'algos', 'scatter', 'item'])(ScatterChartWidget);
