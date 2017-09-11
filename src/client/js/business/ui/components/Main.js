import React from 'react';

import AppBar from './Editor/AppBar';
import LeftPanel from './LeftPanel/LeftPanel';


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
            <AppBar />
            <LeftPanel />
            Hello this is the main component.
        </div>);
    }
}

export default Main;
