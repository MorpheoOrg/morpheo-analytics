import {
    fetchEntitiesFactory,
    deleteEntityFactory,
} from '../../../entities/fetchEntities';

export const fetchTrials = fetchEntitiesFactory('api/trials');
export const deleteTrial = deleteEntityFactory('api/trials');

