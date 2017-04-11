import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import {Card} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {onlyUpdateForKeys} from 'recompose';

import {getLChartData} from '../../../../../selector';


const card = {
    width: '100%',
    margin: '20px 0px',
    borderRadius: '5px',
    overflow: 'visible',
};

const chart = {top: 5, right: 30, left: 20, bottom: 5};

const activeDot = {r: 8};


const LearnupletChart = ({item, data}) => {
    return item && <Card
            title={'learnuplets over perf'}
            style={card}
        >
            <LineChart width={600} height={300} data={data} margin={chart}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="perf" stroke="#8884d8" activeDot={activeDot}/>
            </LineChart>
        </Card>;
};


function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        data: getLChartData(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys(['item', 'data'])(LearnupletChart));
