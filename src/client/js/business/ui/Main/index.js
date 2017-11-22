import React from 'react';
import styled from 'react-emotion';
import {onlyUpdateForKeys} from 'recompose';

import ActivityBar from '../ActivityBar';
import SideBar from '../SideBar';
import Editor from '../Editor';

import ProblemDetail from '../../models/problem/components/detail/ProblemDetail';
import ProblemTabTitle from '../../models/problem/components/ProblemTabTitle';


const Container = styled.div`
    margin: 0 0 0 0;
    background-color: #fff;
    position: relative;
    overflow: visible;
    display: flex;
    height: 100vh;
    overflow: hidden;
`;

const renderers = {
    content: {
        problem: ProblemDetail,
    },
    title: {
        problem: ProblemTabTitle,
    },
};

const Main = () => (
    <Container>
        <ActivityBar />
        <SideBar />
        <Editor renderers={renderers} />
    </Container>
);


export default onlyUpdateForKeys([])(Main);
