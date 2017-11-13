import React from 'react';
import styled from 'react-emotion';
import {onlyUpdateForKeys} from 'recompose';

import ActivityBar from '../ActivityBar';
import SideBar from '../SideBar';
import Editor from '../Editor';


const Container = styled.div`
    margin: 0 0 0 0;
    background-color: #fff;
    position: relative;
    overflow: visible;
    display: flex;
    height: 100vh;
    overflow: hidden;
`;

const Main = () => (
    <Container>
        <ActivityBar />
        <SideBar />
        <Editor />
    </Container>
);


export default onlyUpdateForKeys([])(Main);
