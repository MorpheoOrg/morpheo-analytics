/**
 * Created by guillaume on 2/17/17.
 */

export CreateModalHOC from './CreateModal';

export default {
    CreateModalHOC: System.import('./createModal').then(module => module.default),
};
