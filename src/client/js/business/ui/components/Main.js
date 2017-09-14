import React from 'react';

import ActivityBar from './ActivityBar';
import SideBar from './SideBar';
import Editor from './Editor';


class Main extends React.Component {
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
            <ActivityBar />
            <SideBar />
            <Editor />
        </div>);
    }
}

export default Main;
