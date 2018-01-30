import createDeepEqualSelector from '../../../../utils/selector';


const selectedIndex = state => state.settings.sideBar.selectedIndex;


export const getVisible = createDeepEqualSelector(
    [selectedIndex],
    selectedIndex => !!~selectedIndex,
);


export default {
    getVisible,
};
