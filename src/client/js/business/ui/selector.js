import {createSelector} from 'reselect';

const selectedIndex = state => state.settings.sideBar.selectedIndex;

export const getVisible = createSelector([selectedIndex],
    selectedIndex => !!~selectedIndex,
);

export default {
    getVisible,
};
