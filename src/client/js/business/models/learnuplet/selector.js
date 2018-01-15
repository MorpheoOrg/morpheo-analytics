/*
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

import {createSelector} from 'reselect';
import {sortBy, isEmpty} from 'lodash';
import createDeepEqualSelector from '../../../utils/selector';


const error = state => state.models.learnuplet.item.error;
const results = state => state.models.learnuplet.list.results;
const algo = state => state.models.algos.list.results;
const problem = state => state.models.problems.list.results;

// Return an explicit message if error occured when learnuplet is fetched
export const getError = createSelector(
    [error],
    error => error ? (
        JSON.parse(error.message).message ?
            JSON.parse(error.message).message :
            JSON.parse(error.message).non_field_errors
    ) : error,
);

// Compute all the data necessary to plus the learning performances
export const getLChartData = createDeepEqualSelector(
    [results],
    results => !isEmpty(results) ?
        Object.keys(results).reduce((p, c) => ({
            ...p,
            [c]: sortBy(results[c], ['rank']).reduce((previous, current) =>
                [...previous, {
                    name: current.train_data.length + (
                        previous.length ? previous[previous.length - 1].name : 0
                    ),
                    perf: current.perf * 100,
                }],
            []),
        }), {}) :
        {},
);

// Return an array of algos from the dictionnary of algos
const flattenAlgos = createDeepEqualSelector(
    [algo],
    algo => Object.keys(algo).reduce(
        (p, c) => [...p, ...algo[c]], []
    )
);

// Return the leaderboard information for each problem
export const getLeaderboardData = createDeepEqualSelector(
    [problem, results, flattenAlgos],
    (problem, results, algo) => isEmpty(results) ? {} : problem.reduce(
        (prev, cur) => {
            // Get the list of learnuplets associated to a problem
            const learnuplets = Object.keys(results).filter(
                x => algo.filter(o => o.problem === cur.uuid)
                    .map(o => o.uuid)
                    .includes(x)
            );

            return {
                ...prev,
                [cur.uuid]: sortBy(
                    learnuplets,
                    [o => Math.max(...results[o].map(x => x.perf))],
                )
                    .reverse()
                    .map(o => ({
                        ...algo.find(x => x.uuid === o),
                        bestPerf: Math.max(...results[o].map(x => x.perf)),
                    })),
            };
        }, {}),
);


export default {
    getError,
    getLChartData,
    getLeaderboardData,
};
