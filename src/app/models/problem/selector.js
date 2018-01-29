import createDeepEqualSelector from '../../utils/selector';


const results = state => state.models.problems.list.results;
const storage_results = state => state.models.storage_problems.item.results;

export const getProblems = createDeepEqualSelector([results, storage_results],
    (results, storage_results) => results.reduce((p, c) => [
        ...p,
        {...storage_results[c.workflow], ...c},
    ], []),
);

export const getProblemsDictionnary = createDeepEqualSelector([results, storage_results],
    (results, storage_results) => results.reduce((p, c) => ({
        ...p,
        [c.uuid]: {...storage_results[c.workflow], ...c},
    }), {}),
);

export default {
    getProblems,
    getProblemsDictionnary,
};
