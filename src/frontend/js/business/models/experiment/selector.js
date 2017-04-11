/**
 * Created by guillaume on 6/27/16.
 */

import {createSelector} from 'reselect';
import queryString from 'query-string';
import {round, sortBy} from 'lodash';
import createDeepEqualSelector from '../../../utils/selector';

const error = state => state.list.error;
const itemError = state => state.item.error;
const location = props => props.location;

// explicit
const item = state => state.models.experiment.item;
const trialsResults = state => state.models.trial.item.results;
const algosResults = state => state.models.algo.item.results;
const learnupletsResults = state => state.models.learnuplet.list.results;
const selectedMetric = state => state.models.experiment.chart.selectedMetric;
const selectedParameter = state => state.models.experiment.chart.selectedParameter;
const scatter = state => state.models.experiment.widget.scatter;

export const getError = createSelector([error],
    error => error ? JSON.parse(error.message) : error,
);

export const getItemError = createSelector([itemError],
    error => error ? (JSON.parse(error.message).message ? JSON.parse(error.message).message : JSON.parse(error.message).detail) : error,
);

export const getQuery = createSelector([location],
    location => location && location.search ? queryString.parse(location.search) : null,
);

export const getTrials = createDeepEqualSelector([trialsResults, item],
    (results, item) =>
        item.id && results[item.id] ? results[item.id].results.map(o => ({
            ...o,
            isExpanded: !!o.isExpanded,
        })) : []
);

export const getAlgos = createDeepEqualSelector([algosResults, item],
    (results, item) => item.id ? results[item.id] : [],
);

export const getChartData = createDeepEqualSelector([getTrials, selectedMetric, selectedParameter],
    (results, selectedMetric, selectedParameter) =>
        results.reduce((previous, current) => [
            ...previous,
            {
                id: current.id,
                value: selectedMetric ? round(current.results[selectedMetric], 4) : current.parameters[selectedParameter],
            },
        ], []).reverse()
);

export const getLineChartData = createDeepEqualSelector([getTrials, item],
    (results, item) => results.reduce((previous, current) => [
        ...previous,
        {
            id: current.id,
            value: round(current.results[item.metric], 4),
        },
    ], []).reverse());


/* old */
// const filteredAlgos = createDeepEqualSelector([getAlgos, scatter],
//     (results, scatter) => results && results.length && results.filter(o => o.parameters.includes(scatter.y)).map(o => o.id),
// );

// export const getScatterChartData = createDeepEqualSelector([getTrials, filteredAlgos, scatter],
//     (results, algos, scatter) => {
//
//         console.log(results, algos, scatter);
//
//         return algos && algos.length ? results.filter(o => algos.includes(o.algo))
//             .map(o => ({
//                 id: o.id,
//                 X: round(o.results[scatter.x], 4),
//                 Y: o.parameters[scatter.y],
//             })) : []
//     }
// );

/* new */

const filteredAlgos = createDeepEqualSelector([getAlgos, selectedParameter],
    (algos, selectedParameter) =>
    algos && algos.results.length && algos.results.filter(o => o.parameters.map(o => o.name).includes(selectedParameter)).map(o => o.id)
);

export const getScatterChartData = createDeepEqualSelector([getTrials, filteredAlgos, selectedMetric, selectedParameter],
    (results, algos, selectedMetric, selectedParameter) =>
        algos && algos.length ? results.filter(o => algos.includes(o.algo))
            .map(o => ({
                id: o.id,
                X: round(o.results[selectedMetric], 4),
                Y: o.parameters[selectedParameter],
            })) : []
);

export const getLChartData = createDeepEqualSelector([learnupletsResults],
    (results) => sortBy(results, ['rank']).reduce((previous, current) =>
            [...previous, {
                name: current.train_data.length + (previous.length ? previous[previous.length - 1].name : 0),
                perf: current.perf
            }],
        [])
);
