import React, {Component} from 'react';
import {Col, Card} from 'antd';
import {ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis} from 'recharts';

const testdata = [
    {subject: 'Math', A: 120, B: 110, fullMark: 150},
    {subject: 'Chinese', A: 98, B: 130, fullMark: 150},
    {subject: 'English', A: 86, B: 130, fullMark: 150},
    {subject: 'Geography', A: 99, B: 100, fullMark: 150},
    {subject: 'Physics', A: 85, B: 90, fullMark: 150},
    {subject: 'History', A: 65, B: 85, fullMark: 150},
];

const style = {
    body: {
        height: 220,
        padding: 10,
    },
};

const RadarChartWidget = props =>
    <Col span={8}>
        <Card bordered={false} title={'Radar'} bodyStyle={style.body}>
            <ResponsiveContainer>
                <RadarChart cy={100} outerRadius={80} data={testdata}>
                    <Radar name="Mike" dataKey="A" fillOpacity={0.1} stroke="#037fff" fill="#037fff" />
                    <Radar name="Lily" dataKey="B" fillOpacity={0.6} stroke="#037fff" fill="#037fff" />
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                </RadarChart>
            </ResponsiveContainer>
        </Card>
    </Col>;

export default RadarChartWidget;
