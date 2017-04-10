import {round} from 'lodash';
import React from 'react';
import {
    ComposedChart,
    ResponsiveContainer,
    Area,
    Line,
    CartesianGrid,
    Tooltip,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis
} from 'recharts';
import {Card} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {onlyUpdateForKeys} from 'recompose';

import actions from '../../../../../actions';

import {getChartData, getScatterChartData} from '../../../../../selector';

import SelectVar from './select';
import CustomTooltip from './tooltip';

const card = {
    width: '100%',
    margin: '20px 0px',
    borderRadius: '5px',
    overflow: 'visible',
};

const chart = {
    main: {
        fontSize: 12,
        borderRadius: 5,
        height: 250,
        marginLeft: -25,
        zIndex: 1,
        overflow: 'visible',
    },
    margin: {
        top: 20,
        right: 15,
        bottom: -10,
        left: -40
    },
    cartesian: {
        opacity: 0.3,
    },
};

const activeDot = {
        r: 5,
    },
    domain = ['auto', 'auto'];


const tickFormatter = val => round(val, 3);

const HomeChart = ({item, selectedMetric, selectedParameter, setSelectedParameter, setSelectedMetric, trials, algos, chartData, scatterChartData}) => {
    return item && <Card
            title={`${selectedMetric} over time`}
            extra={<SelectVar
                item={item}
                algos={algos}
                selectedMetric={selectedMetric}
                setSelectedMetric={setSelectedMetric}
                selectedParameter={selectedParameter}
                setSelectedParameter={setSelectedParameter}
            />}
            style={card}
            bodyStyle={{height: '250px'}}
        >
            <ResponsiveContainer>
                {selectedMetric === null || selectedParameter === null ?
                    <ComposedChart
                        style={chart.main}
                        margin={chart.margin}
                        data={chartData}
                    >
                        <YAxis domain={domain} tickFormatter={tickFormatter}/>
                        <CartesianGrid strokeDasharray="3 3" style={chart.cartesian}/>
                        <Tooltip content={<CustomTooltip trials={trials}/>}/>
                        <defs>
                            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                                <stop offset='5%' stopColor='#0082dc' stopOpacity={0.15}/>
                                <stop offset='95%' stopColor='#0082dc' stopOpacity={0.05}/>
                            </linearGradient>
                        </defs>
                        <Line
                            type="monotone"
                            dataKey={'value'}
                            stroke="#108ee9"
                            strokeWidth={1.5}
                            activeDot={activeDot}
                            animationDuration={850}
                        />
                        <Area
                            type="monotone"
                            dataKey={'value'}
                            fill="rgba(24, 131, 255, 0.1)"
                            strokeWidth={0}
                            activeDot={activeDot}
                            animationDuration={850}
                        />
                    </ComposedChart> :
                    <ScatterChart
                        style={chart.main}
                        margin={chart.margin}>
                        <Scatter data={scatterChartData} fill='#008cec' r={2}/>
                        <YAxis dataKey={'X'} domain={domain}/>
                        <XAxis dataKey={'Y'} domain={domain}/>
                        <ZAxis dataKey={'id'}/>
                        <Tooltip content={<CustomTooltip trials={trials}/>} offset={25} />
                        <CartesianGrid strokeDasharray='3 3' style={chart.cartesian}/>
                    </ScatterChart>
                }
            </ResponsiveContainer>
        </Card>;
};


function mapStateToProps(s, ownProps) {
    const state = s.models.experiment;

    return {
        ...ownProps,
        selectedMetric: state.chart.selectedMetric,
        selectedParameter: state.chart.selectedParameter,
        chartData: getChartData(s),
        scatterChartData: getScatterChartData(s),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setSelectedMetric: actions.chart.selectedMetric.set,
        setSelectedParameter: actions.chart.selectedParameter.set,
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys(['item', 'selectedMetric', 'selectedParameter', 'chartData', 'scatterChartData'])(HomeChart));
