import React from 'react';
import styled from 'emotion/react';
import {Poll, BookOpen, FlaskOutline} from 'mdi-material-ui';

import ActivityBar from './ActivityBar/index';
import SideBar from './SideBar';
import Editor from './Editor';

const Container = styled.div`
    margin: 0 0 0 0;
    background-color: #fff;
    position: relative;
    overflow: visible;
    display: flex;
    height: 100vh;
`;

class Main extends React.Component {
    menuContent = [
        {
            name: 'Challenges',
            icon: <Poll/>,
            content: undefined,
        },
        {
            name: 'Experiments',
            icon: <FlaskOutline/>,
            content: undefined,
        },
        {
            name: 'Notebook',
            icon: <BookOpen/>,
            content: undefined,
        },
    ];

    render() {
        return (<Container>
            <ActivityBar/>
            <SideBar/>
            <Editor/>
        </Container>);
    }
}

export default Main;
