/**
 * Created by guillaume on 7/12/17.
 */

import createDeepEqualSelector from '../../../utils/selector';

const results = state => state.models.problem.list.results;
const storage_results = state => state.models.problem.item.results;

export const getProblems = createDeepEqualSelector([results, storage_results],
    (results, storage_results) => results.reduce((p, c) => [...p, {...storage_results[c.workflow], ...c}], []),
);


// storage_results[results.find(o => o.uuid === ownProps.match.params.id).workflow]
//
// export const getStorageProblem = createDeepEqualSelector([results, storage_results],
//     (results, storage_results) => results.reduce((p, c) => [...p, {...storage_results[c.workflow], ...c}], []),
// );

export default {
    getProblems,
    // getStorageProblem
};
