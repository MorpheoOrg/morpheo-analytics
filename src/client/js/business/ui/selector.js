import {createSelector} from 'reselect';

const selectedIndex = state => state.parameters.sideBar.selectedIndex;

export const getVisible = createSelector([selectedIndex],
    selectedIndex => !!~selectedIndex,
);

export default {
    getVisible,
};
