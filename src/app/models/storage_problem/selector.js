import createDeepEqualSelector from '../../utils/selector';


const results = state => state.models.problem.list.results;
const storage_results = state => state.models.problem.item.results;

export const getProblems = createDeepEqualSelector(
    [results, storage_results],
    (results, storage_results) => results.reduce(
        (p, c) => [...p, {...storage_results[c.storageAddress], ...c}], []
    ),
);


export default {
    getProblems,
};
