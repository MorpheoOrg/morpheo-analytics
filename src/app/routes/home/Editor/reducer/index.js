import {combineReducers} from 'redux';

import activePaneOrder from './activePaneOrder';
import dragInfos from './dragInfos';
import panes from './panes';
import tabs from './tabs';
import filterEmptyReducer from './filterEmptyPane';


export default (state, action) => filterEmptyReducer(
    combineReducers({
        activePaneOrder,
        dragInfos,
        panes,
        tabs,
    })(state, action),
    action,
);
