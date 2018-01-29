import {expect} from 'chai';

import {actionsTypes} from '../../actions';
import reducer from '../index';


describe('editor.reducer', () => {
    // Define a previous complex state used by tests
    const complexState = {
        activePaneOrder: ['p0', 'p1'],
        dragInfos: {active: true},
        panes: [
            {paneId: 'p0', activeTabOrder: ['t0'], tabs: ['t0']},
            {
                paneId: 'p1',
                activeTabOrder: ['t1', 't3', 't2', 't4'],
                tabs: ['t1', 't2', 't3', 't4'],
            },
        ],
        tabs: {
            t0: {
                contentId: 'c0',
                contentType: 'type0',
                title: 'title0',
                props: {},
            },
            t1: {
                contentId: 'c1',
                contentType: 'type1',
                title: 'title1',
                props: {},
            },
            t2: {
                contentId: 'c2',
                contentType: 'type2',
                title: 'title2',
                props: {},
            },
            t3: {
                contentId: 'c3',
                contentType: 'type3',
                title: 'title3',
                props: {},
            },
            t4: {
                contentId: 'c4',
                contentType: 'type4',
                title: 'title4',
                props: {},
            },
        },
    };


    // Tests without actions
    it('should return initial state for empty state without actions', () => {
        expect(reducer(undefined, {})).to.deep.equal({
            activePaneOrder: [],
            dragInfos: {active: false},
            panes: [],
            tabs: {},
        });
    });


    // Test for addTab action
    it('should add a new tab into a new pane', () => {
        const addTabAction = {
            type: actionsTypes.tab.add,
            payload: {
                contentId: 'c5',
                contentType: 'type5',
                title: 'title5',
                tabId: 't5',
                paneId: 'p2',
            },
        };
        expect(reducer(complexState, addTabAction)).to.deep.equal({
            activePaneOrder: ['p2', 'p0', 'p1'],
            dragInfos: {active: true},
            panes: [
                {paneId: 'p0', activeTabOrder: ['t0'], tabs: ['t0']},
                {
                    paneId: 'p1',
                    activeTabOrder: ['t1', 't3', 't2', 't4'],
                    tabs: ['t1', 't2', 't3', 't4'],
                },
                {paneId: 'p2', activeTabOrder: ['t5'], tabs: ['t5']},
            ],
            tabs: {
                t0: {
                    contentId: 'c0',
                    contentType: 'type0',
                    title: 'title0',
                    props: {},
                },
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t2: {
                    contentId: 'c2',
                    contentType: 'type2',
                    title: 'title2',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
                t5: {
                    contentId: 'c5',
                    contentType: 'type5',
                    title: 'title5',
                    props: {},
                },
            },
        });
    });


    it('should add a new tab at the end of a specific pane', () => {
        const addTabAction = {
            type: actionsTypes.tab.add,
            payload: {
                contentId: 'c5',
                contentType: 'type5',
                title: 'title5',
                tabId: 't5',
                paneId: 'p0',
            },
        };
        expect(reducer(complexState, addTabAction)).to.deep.equal({
            activePaneOrder: ['p0', 'p1'],
            dragInfos: {active: true},
            panes: [
                {paneId: 'p0', activeTabOrder: ['t5', 't0'], tabs: ['t0', 't5']},
                {
                    paneId: 'p1',
                    activeTabOrder: ['t1', 't3', 't2', 't4'],
                    tabs: ['t1', 't2', 't3', 't4'],
                },
            ],
            tabs: {
                t0: {
                    contentId: 'c0',
                    contentType: 'type0',
                    title: 'title0',
                    props: {},
                },
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t2: {
                    contentId: 'c2',
                    contentType: 'type2',
                    title: 'title2',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
                t5: {
                    contentId: 'c5',
                    contentType: 'type5',
                    title: 'title5',
                    props: {},
                },
            },
        });
    });


    it('should add a new tab at a specific position of a specific pane', () => {
        const addTabAction = {
            type: actionsTypes.tab.add,
            payload: {
                contentId: 'c5',
                contentType: 'type5',
                title: 'title5',
                paneId: 'p1',
                tabId: 't5',
                tabIndex: 2,
            },
        };
        expect(reducer(complexState, addTabAction)).to.deep.equal({
            activePaneOrder: ['p1', 'p0'],
            dragInfos: {active: true},
            panes: [
                {paneId: 'p0', activeTabOrder: ['t0'], tabs: ['t0']},
                {
                    paneId: 'p1',
                    activeTabOrder: ['t5', 't1', 't3', 't2', 't4'],
                    tabs: ['t1', 't2', 't5', 't3', 't4'],
                },
            ],
            tabs: {
                t0: {
                    contentId: 'c0',
                    contentType: 'type0',
                    title: 'title0',
                    props: {},
                },
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t2: {
                    contentId: 'c2',
                    contentType: 'type2',
                    title: 'title2',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
                t5: {
                    contentId: 'c5',
                    contentType: 'type5',
                    title: 'title5',
                    props: {},
                },
            },
        });
    });


    // Test for selectTab action
    it('should select the specified tab of a specific pane', () => {
        const selectTabAction = {
            type: actionsTypes.tab.setActive,
            payload: {
                paneId: 'p1',
                tabId: 't2',
            },
        };
        expect(reducer(complexState, selectTabAction)).to.deep.equal({
            activePaneOrder: ['p1', 'p0'],
            dragInfos: {active: true},
            panes: [
                {paneId: 'p0', activeTabOrder: ['t0'], tabs: ['t0']},
                {
                    paneId: 'p1',
                    activeTabOrder: ['t2', 't1', 't3', 't4'],
                    tabs: ['t1', 't2', 't3', 't4'],
                },
            ],
            tabs: {
                t0: {
                    contentId: 'c0',
                    contentType: 'type0',
                    title: 'title0',
                    props: {},
                },
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t2: {
                    contentId: 'c2',
                    contentType: 'type2',
                    title: 'title2',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
            },
        });
    });


    // Test for close action
    it('should remove a tab from pane containing other tabs', () => {
        const closeTabAction = {
            type: actionsTypes.tab.remove,
            payload: {
                paneId: 'p1',
                tabId: 't2',
            },
        };
        expect(reducer(complexState, closeTabAction)).to.deep.equal({
            activePaneOrder: ['p1', 'p0'],
            dragInfos: {active: true},
            panes: [
                {paneId: 'p0', activeTabOrder: ['t0'], tabs: ['t0']},
                {
                    paneId: 'p1',
                    activeTabOrder: ['t1', 't3', 't4'],
                    tabs: ['t1', 't3', 't4'],
                },
            ],
            tabs: {
                t0: {
                    contentId: 'c0',
                    contentType: 'type0',
                    title: 'title0',
                    props: {},
                },
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
            },
        });
    });


    it('should remove a tab from pane containing a unique tab', () => {
        const closeTabAction = {
            type: actionsTypes.tab.remove,
            payload: {
                paneId: 'p0',
                tabId: 't0',
            },
        };
        expect(reducer(complexState, closeTabAction)).to.deep.equal({
            activePaneOrder: ['p1'],
            dragInfos: {active: true},
            panes: [
                {
                    paneId: 'p1',
                    activeTabOrder: ['t1', 't3', 't2', 't4'],
                    tabs: ['t1', 't2', 't3', 't4'],
                },
            ],
            tabs: {
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t2: {
                    contentId: 'c2',
                    contentType: 'type2',
                    title: 'title2',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
            },
        });
    });


    // Test for move into a new pane action
    it('should move an existing tab to a new pane', () => {
        const moveTabIntoNewPaneAction = {
            type: actionsTypes.tab.moveIntoNewPane,
            payload: {
                paneId: 'p2',
                paneIdFrom: 'p0',
                tabId: 't0',
            },
        };
        expect(reducer(complexState, moveTabIntoNewPaneAction)).to.deep.equal({
            activePaneOrder: ['p2', 'p1'],
            dragInfos: {active: true},
            panes: [
                {
                    paneId: 'p1',
                    activeTabOrder: ['t1', 't3', 't2', 't4'],
                    tabs: ['t1', 't2', 't3', 't4'],
                },
                {paneId: 'p2', activeTabOrder: ['t0'], tabs: ['t0']},
            ],
            tabs: {
                t0: {
                    contentId: 'c0',
                    contentType: 'type0',
                    title: 'title0',
                    props: {},
                },
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t2: {
                    contentId: 'c2',
                    contentType: 'type2',
                    title: 'title2',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
            },
        });
    });


    it('should move an existing tab to a new pane at a given position', () => {
        const moveTabIntoNewPaneAction = {
            type: actionsTypes.tab.moveIntoNewPane,
            payload: {
                paneId: 'p2',
                paneIdFrom: 'p1',
                tabId: 't3',
                paneIndex: 1,
            },
        };
        expect(reducer(complexState, moveTabIntoNewPaneAction)).to.deep.equal({
            activePaneOrder: ['p2', 'p0', 'p1'],
            dragInfos: {active: true},
            panes: [
                {paneId: 'p0', activeTabOrder: ['t0'], tabs: ['t0']},
                {paneId: 'p2', activeTabOrder: ['t3'], tabs: ['t3']},
                {
                    paneId: 'p1',
                    activeTabOrder: ['t1', 't2', 't4'],
                    tabs: ['t1', 't2', 't4'],
                },
            ],
            tabs: {
                t0: {
                    contentId: 'c0',
                    contentType: 'type0',
                    title: 'title0',
                    props: {},
                },
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t2: {
                    contentId: 'c2',
                    contentType: 'type2',
                    title: 'title2',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
            },
        });
    });


    // Test for move into a new pane action
    it('should change the position of a tab', () => {
        const moveTabAction = {
            type: actionsTypes.tab.move,
            payload: {
                paneIdFrom: 'p1',
                tabId: 't1',
                paneIdTo: 'p1',
                tabIndex: 2,
            },
        };
        expect(reducer(complexState, moveTabAction)).to.deep.equal({
            activePaneOrder: ['p1', 'p0'],
            dragInfos: {active: true},
            panes: [
                {paneId: 'p0', activeTabOrder: ['t0'], tabs: ['t0']},
                {
                    paneId: 'p1',
                    activeTabOrder: ['t1', 't3', 't2', 't4'],
                    tabs: ['t2', 't3', 't1', 't4'],
                },
            ],
            tabs: {
                t0: {
                    contentId: 'c0',
                    contentType: 'type0',
                    title: 'title0',
                    props: {},
                },
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t2: {
                    contentId: 'c2',
                    contentType: 'type2',
                    title: 'title2',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
            },
        });
    });


    it('should change move a tab from a pane to another', () => {
        const moveTabAction = {
            type: actionsTypes.tab.move,
            payload: {
                paneIdFrom: 'p1',
                tabId: 't3',
                paneIdTo: 'p0',
                tabIndex: 0,
            },
        };
        expect(reducer(complexState, moveTabAction)).to.deep.equal({
            activePaneOrder: ['p0', 'p1'],
            dragInfos: {active: true},
            panes: [
                {
                    paneId: 'p0',
                    activeTabOrder: ['t3', 't0'],
                    tabs: ['t3', 't0'],
                },
                {
                    paneId: 'p1',
                    activeTabOrder: ['t1', 't2', 't4'],
                    tabs: ['t1', 't2', 't4'],
                },
            ],
            tabs: {
                t0: {
                    contentId: 'c0',
                    contentType: 'type0',
                    title: 'title0',
                    props: {},
                },
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t2: {
                    contentId: 'c2',
                    contentType: 'type2',
                    title: 'title2',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
            },
        });
    });


    it('should move a tab from a pane to another + delete empty pane', () => {
        const moveTabAction = {
            type: actionsTypes.tab.move,
            payload: {
                paneIdFrom: 'p0',
                tabId: 't0',
                paneIdTo: 'p1',
                tabIndex: 2,
            },
        };
        expect(reducer(complexState, moveTabAction)).to.deep.equal({
            activePaneOrder: ['p1'],
            dragInfos: {active: true},
            panes: [
                {
                    paneId: 'p1',
                    activeTabOrder: ['t0', 't1', 't3', 't2', 't4'],
                    tabs: ['t1', 't2', 't0', 't3', 't4'],
                },
            ],
            tabs: {
                t0: {
                    contentId: 'c0',
                    contentType: 'type0',
                    title: 'title0',
                    props: {},
                },
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t2: {
                    contentId: 'c2',
                    contentType: 'type2',
                    title: 'title2',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
            },
        });
    });

    // Test for drag a tab
    it('should add the drag start information', () => {
        const dragStartTabAction = {
            type: actionsTypes.tab.dragStart,
            payload: {
                paneId: 'p0',
                tabId: 't0',
                width: '128',
            },
        };
        expect(reducer(complexState, dragStartTabAction)).to.deep.equal({
            activePaneOrder: ['p0', 'p1'],
            dragInfos: {
                active: true,
                data: {
                    start: {
                        paneId: 'p0',
                        tabId: 't0',
                        width: '128',
                    },
                },
            },
            panes: [
                {paneId: 'p0', activeTabOrder: ['t0'], tabs: ['t0']},
                {
                    paneId: 'p1',
                    activeTabOrder: ['t1', 't3', 't2', 't4'],
                    tabs: ['t1', 't2', 't3', 't4'],
                },
            ],
            tabs: {
                t0: {
                    contentId: 'c0',
                    contentType: 'type0',
                    title: 'title0',
                    props: {},
                },
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t2: {
                    contentId: 'c2',
                    contentType: 'type2',
                    title: 'title2',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
            },
        });
    });


    it('should add the drag over information', () => {
        const stateWithDragInfo = {
            activePaneOrder: ['p0', 'p1'],
            dragInfos: {
                active: true,
                data: {
                    start: {info: 42},
                },
            },
            panes: [
                {paneId: 'p0', activeTabOrder: ['t0'], tabs: ['t0']},
                {
                    paneId: 'p1',
                    activeTabOrder: ['t1', 't3', 't2', 't4'],
                    tabs: ['t1', 't2', 't3', 't4'],
                },
            ],
            tabs: {
                t0: {
                    contentId: 'c0',
                    contentType: 'type0',
                    title: 'title0',
                    props: {},
                },
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t2: {
                    contentId: 'c2',
                    contentType: 'type2',
                    title: 'title2',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
            },
        };
        const dragOverTabAction = {
            type: actionsTypes.tab.dragOver,
            payload: {selected: 38},
        };
        expect(reducer(stateWithDragInfo, dragOverTabAction)).to.deep.equal({
            activePaneOrder: ['p0', 'p1'],
            dragInfos: {
                active: true,
                data: {
                    start: {info: 42},
                    over: {selected: 38},
                },
            },
            panes: [
                {paneId: 'p0', activeTabOrder: ['t0'], tabs: ['t0']},
                {
                    paneId: 'p1',
                    activeTabOrder: ['t1', 't3', 't2', 't4'],
                    tabs: ['t1', 't2', 't3', 't4'],
                },
            ],
            tabs: {
                t0: {
                    contentId: 'c0',
                    contentType: 'type0',
                    title: 'title0',
                    props: {},
                },
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t2: {
                    contentId: 'c2',
                    contentType: 'type2',
                    title: 'title2',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
            },
        });
    });


    it('should remove the drag over information when call dragOut', () => {
        const stateWithDragInfo = {
            activePaneOrder: ['p0', 'p1'],
            dragInfos: {
                active: true,
                data: {
                    start: {info: 42},
                    over: {selected: 38},
                },
            },
            panes: [
                {paneId: 'p0', activeTabOrder: ['t0'], tabs: ['t0']},
                {
                    paneId: 'p1',
                    activeTabOrder: ['t1', 't3', 't2', 't4'],
                    tabs: ['t1', 't2', 't3', 't4'],
                },
            ],
            tabs: {
                t0: {
                    contentId: 'c0',
                    contentType: 'type0',
                    title: 'title0',
                    props: {},
                },
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t2: {
                    contentId: 'c2',
                    contentType: 'type2',
                    title: 'title2',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
            },
        };
        const dragOutTabAction = {
            type: actionsTypes.tab.dragOut,
        };
        expect(reducer(stateWithDragInfo, dragOutTabAction)).to.deep.equal({
            activePaneOrder: ['p0', 'p1'],
            dragInfos: {
                active: true,
                data: {
                    start: {info: 42},
                },
            },
            panes: [
                {paneId: 'p0', activeTabOrder: ['t0'], tabs: ['t0']},
                {
                    paneId: 'p1',
                    activeTabOrder: ['t1', 't3', 't2', 't4'],
                    tabs: ['t1', 't2', 't3', 't4'],
                },
            ],
            tabs: {
                t0: {
                    contentId: 'c0',
                    contentType: 'type0',
                    title: 'title0',
                    props: {},
                },
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t2: {
                    contentId: 'c2',
                    contentType: 'type2',
                    title: 'title2',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
            },
        });
    });

    it('should clean the drag information', () => {
        const stateWithDragInfo = {
            activePaneOrder: ['p0', 'p1'],
            dragInfos: {
                active: true,
                data: {
                    start: {info: 42},
                },
            },
            panes: [
                {paneId: 'p0', activeTabOrder: ['t0'], tabs: ['t0']},
                {
                    paneId: 'p1',
                    activeTabOrder: ['t1', 't3', 't2', 't4'],
                    tabs: ['t1', 't2', 't3', 't4'],
                },
            ],
            tabs: {
                t0: {
                    contentId: 'c0',
                    contentType: 'type0',
                    title: 'title0',
                    props: {},
                },
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t2: {
                    contentId: 'c2',
                    contentType: 'type2',
                    title: 'title2',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
            },
        };
        const dragEndTabAction = {
            type: actionsTypes.tab.dragEnd,
        };
        expect(reducer(stateWithDragInfo, dragEndTabAction)).to.deep.equal({
            activePaneOrder: ['p0', 'p1'],
            dragInfos: {active: false},
            panes: [
                {paneId: 'p0', activeTabOrder: ['t0'], tabs: ['t0']},
                {
                    paneId: 'p1',
                    activeTabOrder: ['t1', 't3', 't2', 't4'],
                    tabs: ['t1', 't2', 't3', 't4'],
                },
            ],
            tabs: {
                t0: {
                    contentId: 'c0',
                    contentType: 'type0',
                    title: 'title0',
                    props: {},
                },
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t2: {
                    contentId: 'c2',
                    contentType: 'type2',
                    title: 'title2',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
            },
        });
    });

    it('should update the props of a tab', () => {
        const updateTabPropsAction = {
            type: actionsTypes.tab.updateProps,
            payload: {
                tabId: 't0',
                props: {
                    property: 'data',
                },
            },
        };
        expect(reducer(complexState, updateTabPropsAction)).to.deep.equal({
            activePaneOrder: ['p0', 'p1'],
            dragInfos: {active: true},
            panes: [
                {paneId: 'p0', activeTabOrder: ['t0'], tabs: ['t0']},
                {
                    paneId: 'p1',
                    activeTabOrder: ['t1', 't3', 't2', 't4'],
                    tabs: ['t1', 't2', 't3', 't4'],
                },
            ],
            tabs: {
                t0: {
                    contentId: 'c0',
                    contentType: 'type0',
                    title: 'title0',
                    props: {
                        property: 'data',
                    },
                },
                t1: {
                    contentId: 'c1',
                    contentType: 'type1',
                    title: 'title1',
                    props: {},
                },
                t2: {
                    contentId: 'c2',
                    contentType: 'type2',
                    title: 'title2',
                    props: {},
                },
                t3: {
                    contentId: 'c3',
                    contentType: 'type3',
                    title: 'title3',
                    props: {},
                },
                t4: {
                    contentId: 'c4',
                    contentType: 'type4',
                    title: 'title4',
                    props: {},
                },
            },
        });
    });
});
