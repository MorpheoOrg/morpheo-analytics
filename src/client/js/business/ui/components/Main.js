import React from 'react';
import {Poll, CloudUpload, BookOpen,
    Settings, FlaskOutline} from 'mdi-material-ui';

import ActivityBar from './ActivityBar';
import SideBar from './SideBar';
import Editor from './Editor';

import ExperimentList from './ExperimentList';


class Main extends React.Component {
    menuContent = [
        {
            name: 'Challenges',
            icon: <Poll />,
            content: undefined,
        },
        {
            name: 'Experiments',
            icon: <FlaskOutline />,
            content: <ExperimentList />,
        },
        {
            name: 'Notebook',
            icon: <BookOpen />,
            content: undefined,
        },
    ];

    modalContent = [
        {
            name: 'Submission',
            icon: <CloudUpload />,
            content: undefined,
        },
        {
            name: 'Settings',
            icon: <Settings />,
            content: undefined,
        },
    ];
    render() {
        return (<div
            css={`
                margin: 0 0 0 0;
                background-color: #fff;
                position: relative;
                overflow: visible;
                display: flex;
                height: 100vh;
            `}
        >
            <ActivityBar
                menuContent={this.menuContent}
                modalContent={this.modalContent}
            />
            <SideBar
                menuContent={this.menuContent}
            />
            <Editor />
        </div>);
    }
}

export default Main;
