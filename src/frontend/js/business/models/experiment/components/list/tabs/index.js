/**
 * Created by guillaume on 3/3/17.
 */

import React from 'react';
import {Tabs} from 'antd';
import {onlyUpdateForKeys} from 'recompose';

import Experiment from './experiment';
import CustomTabPane from './tabPane';

const TabPane = Tabs.TabPane;

// TODO find a way to correctly load CustomTabPane with antd
// https://github.com/ant-design/ant-design/issues/5165

const T = ({_user, shared_with}) =>
    <Tabs defaultActiveKey="1" animated={false}>
        <CustomTabPane tab={<h4>My experiments ({_user.list.results.length})</h4>}
                       key={'1'}
                       results={_user.list.results}/>
        <CustomTabPane tab={<h4>Shared With Me ({shared_with.list.results.length})</h4>}
                       key={'2'}
                       results={shared_with.list.results}/>
    </Tabs>;

export default onlyUpdateForKeys(['_user', '_public'])(T);
