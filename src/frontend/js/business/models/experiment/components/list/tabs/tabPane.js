/**
 * Created by guillaume on 3/3/17.
 */

import React from 'react';
import {Tabs} from 'antd';
import {onlyUpdateForKeys} from 'recompose';

import Experiment from './experiment';

const TabPane = Tabs.TabPane;

const CustomTabPane = ({key, results, ...restProps}) =>
    <TabPane key={key} {...restProps}>
        <div className="experiment-list">
            <ul>
                {results.map((experiment, i) =>
                    <Experiment
                        key={i}
                        experiment={experiment}
                    />)}
            </ul>
        </div>
    </TabPane>;

export default onlyUpdateForKeys(['results', 'active'])(CustomTabPane);

