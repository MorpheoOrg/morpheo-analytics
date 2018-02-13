import createDeepEqualSelector from '../../utils/selector';


const problemResults = state => state.models.problems.list.results;
const storageResults = state => state.models.storage_problems.item.results;

export const getProblems = createDeepEqualSelector(
    [problemResults, storageResults],
    (problemResults, storageResults) => problemResults.reduce((p, c) => [
        ...p,
        {...storageResults[c.storageAddress], ...c},
    ], []),
);

export const getProblemsDictionnary = createDeepEqualSelector(
    [problemResults, storageResults],
    (problemResults, storageResults) => problemResults.reduce((p, c) => ({
        ...p,
        [c.uuid]: {...storageResults[c.storageAddress], ...c},
    }), {}),
);

export default {
    getProblems,
    getProblemsDictionnary,
};
