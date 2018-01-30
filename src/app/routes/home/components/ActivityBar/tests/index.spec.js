import React from 'react';
import {mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import ActivityBar from '..';


const middleware = [];
const mockStore = configureMockStore(middleware);

describe('ActivityBar components', () => {
    /**
     * Create the activityBar component from the selected index.
     * @param {number} selectedIndex
     */
    const createActivityBar = (selectedIndex = 0) => {
        const store = mockStore({
            settings: {
                sideBar: {
                    selectedIndex,
                },
            },
        });

        const activityBar = mount(
            <Provider store={store}>
                <ActivityBar />
            </Provider>
        );

        return {activityBar, store};
    };

    test('should render as expected', () => {
        const {activityBar} = createActivityBar();
        expect(activityBar).toMatchSnapshot();
        expect(activityBar.find('button')).toHaveLength(5);
    });

    test('should openned the side bar and select the 0 index', () => {
        const {activityBar, store} = createActivityBar(1);
        // For now, it's only possible to click on the first button
        // Change the test when you will allow to click on the other button.
        activityBar.find('button').at(0).simulate('click');
        expect(store.getActions()).toEqual([{
            type: 'SIDE_BAR::SET_INDEX',
            payload: 0,
        }, {
            type: 'SIDE_BAR::SET_STATUS',
            payload: 'opened',
        }]);
    });

    test('should close the side bar', () => {
        const {activityBar, store} = createActivityBar(0);
        // For now, it's only possible to click on the first button
        // Change the test when you will allow to click on the other button.
        activityBar.find('button').at(0).simulate('click');
        expect(store.getActions()).toEqual([{
            type: 'SIDE_BAR::SET_STATUS',
            payload: 'closed',
        }]);
    });
});
