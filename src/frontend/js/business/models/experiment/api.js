import {
    fetchEntitiesFactory,
    fetchEntityFactory,
    deleteEntityFactory,
    // updateEntityFactory,
    createEntityFactory,
} from '../../../entities/fetchEntities';

export const fetchExperiments = fetchEntitiesFactory('api/experiments');
export const fetchExperiment = fetchEntityFactory('api/experiments');

export const createExperiment = createEntityFactory('api/experiments');
export const deleteExperiment = deleteEntityFactory('api/experiments');

export const fetchUsernames = fetchEntitiesFactory('api/users');

// export const updateExperiment = updateEntityFactory('experiments');

