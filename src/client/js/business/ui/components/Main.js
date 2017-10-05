import React from 'react';
import styled from 'emotion/react';

import ActivityBar from './ActivityBar/index';
import SideBar from './SideBar';
import Editor from './Editor/index';

const Container = styled.div`
    margin: 0 0 0 0;
    background-color: #fff;
    position: relative;
    overflow: visible;
    display: flex;
    height: 100vh;
`;

class Main extends React.Component {
    render() {
        return (<Container>
            <ActivityBar/>
            <SideBar/>
            <Editor/>
        </Container>);
    }
}

export default Main;
