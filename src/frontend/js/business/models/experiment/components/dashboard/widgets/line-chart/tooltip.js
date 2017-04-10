import {isNumber, round} from 'lodash';
import React, {Component} from 'react';
import TimeAgo from 'react-timeago';
import {onlyUpdateForKeys} from 'recompose';

const customTooltip = {
    main: {
        background: '#fff',
        borderRadius: '3px',
        padding: 10,
        border: '1px solid rgb(217, 217, 217)',
        fontSize: 13,
        zIndex: 100000,
    },
    time: {
        opacity: 0.6,
        float: 'right',
    },
    value: {
        color: '#1882fd',
        padding: '0 5',
    },
    h3: {
        marginTop: 3,
    },
};

const DisplayInfo = ({results, title}) =>
    <div>
        <h4 style={customTooltip.h3}>{title}</h4>
        <ul>{Object.keys(results).map(o =>
            <li key={o}>
                {o}: {isNumber(results[o]) ? round(+results[o], 4) : results[o]}
            </li>)}
        </ul>
    </div>;

const CustomTooltip = ({trials, payload}) => {
    if (payload && payload.length) {
        const item = payload[0].payload;
        const trial = trials.filter(k => k.id === item.id)[0];

        return (<div style={customTooltip.main}>
            <TimeAgo style={customTooltip.time} date={trial.created} />
            <h3 style={customTooltip.value}>{item.value}</h3>
            <h3>{trial.algo_name}</h3>

            <DisplayInfo title="Parameters" results={trial.parameters} />
            <DisplayInfo title="Metrics" results={trial.results} />
        </div>);
    }

    return null;
};


export default onlyUpdateForKeys(['payload'])(CustomTooltip);
