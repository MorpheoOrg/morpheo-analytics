import queryString from 'query-string';
import {isEmpty} from 'lodash';

import {
    fetchList,
} from '../../../entities/fetchEntities';

/* globals ORCHESTRATOR_API_URL */



export const fetchLearnupletByAlgo = (get_parameters) => {
    const url = `${ORCHESTRATOR_API_URL}/learnuplet${!isEmpty(get_parameters) ? `?${queryString.stringify(get_parameters)}` : ''}`;
    return fetchList(url);
};
