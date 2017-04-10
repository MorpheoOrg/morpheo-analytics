import React, {Component} from 'react';
import {round} from 'lodash';
import {ComposedChart, ResponsiveContainer, Area, Line, YAxis, CartesianGrid, Tooltip} from 'recharts';
import {Col, Card} from 'antd';
import {onlyUpdateForKeys} from 'recompose';

import CustomTooltip from './tooltip';

const chartStyles = {
    fontSize: '12px',
    borderRadius: '5px',
    height: '200px',
    marginLeft: '-25px',
};

const bodyStyle = {
    height: 200,
};

const cartesian = {
    opacity: 0.3,
};

const activeDot = {
    r: 5,
};

const tickFormatter = val => round(val, 3);

const LineChartWidget = ({trials, metric}) => {
    const data = trials.map(o => ({
        id: o.id,
        value: round(o.results[metric], 4),
    })).reverse();

    return (
        <Col span={12}>
            <Card bordered={false} title={metric} bodyStyle={bodyStyle}>
                <ResponsiveContainer>
                    <ComposedChart
                        style={chartStyles}
                        margin={{top: 0, right: 0, left: 0, bottom: 0}}
                        data={data}
                    >
                        <YAxis domain={['auto', 'auto']} tickFormatter={tickFormatter} />
                        <CartesianGrid strokeDasharray="3 3" style={cartesian} />
                        <Tooltip content={<CustomTooltip trials={trials} />} offset={25} />
                        <Area
                            type="monotone"
                            dataKey={'value'}
                            fill="rgba(24, 131, 255, 0.1)"
                            strokeWidth={0}
                            activeDot={activeDot}
                            animationDuration={850}
                        />
                        <Line
                            type="monotone"
                            dataKey={'value'}
                            stroke="#108ee9"
                            strokeWidth={1.5}
                            activeDot={activeDot}
                            animationDuration={850}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </Card>
        </Col>
    );
};

export default onlyUpdateForKeys(['metric'])(LineChartWidget);
