export list from './list';
export item from './item';
export modal from './modal';
export ordering from './ordering';

export default {
    list: System.import('./list').then(module => module.default),
    item: System.import('./item').then(module => module.default),
    modal: System.import('./modal').then(module => module.default),
    ordering: System.import('./ordering').then(module => module.default),
};
