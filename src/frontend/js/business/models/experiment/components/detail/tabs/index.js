/**
 * Created by guillaume on 7/11/16.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Tabs} from 'antd';


import Algos from './algos/index';
import Trials from './trials';
import Infos from './infos';
import TrialFilterer from '../../filter/trial';

const TabPane = Tabs.TabPane;

class T extends React.PureComponent {

    constructor(props) {
        super(props);
        this.setFilters = this.setFilters.bind(this);
    }

    setFilters() {
        this.props.loadTrials(this.props.id);
    }

    render() {
        const {item, algos, filters, query} = this.props;

        return item ?
            <Tabs
                tabPosition={'top'}
                animated={false}
                defaultActiveKey={'0'}
                tabBarExtraContent={
                    <TrialFilterer
                        experiment={item}
                        algos={algos}
                        setFilters={this.setFilters}
                        filters={filters}
                        query={query}
                    />
                }
            >
                <TabPane tab={<h4>Trials</h4>} key="0">
                    <Trials {...this.props} />
                </TabPane>
                <TabPane tab={<h4>Algos</h4>} key="1">
                    <Algos {...this.props} />
                </TabPane>
                <TabPane tab={<h4>Infos</h4>} key="2">
                    <Infos {...this.props} />
                </TabPane>
            </Tabs> : null;
    }
}

export default T;

