import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import styled, {css} from 'react-emotion';

import ActivityBar from './ActivityBar';
import Editor from '../Editor';
import Login from './Login';
import Notifications from './Notifications';
import SideBar from './SideBar';

import ProblemDetail from '../../../models/problem/components/detail/ProblemDetail';
import ProblemTabTitle from '../../../models/problem/components/ProblemTabTitle';
import {isLoginVariableSet} from './Login/selectors';


const blurredStyle = css`
    filter: blur(1.5px);
`;

const Container = styled.div`
    margin: 0 0 0 1;
    background-color: #fff;
    position: relative;
    overflow: visible;
    display: flex;
    height: 100vh;
    overflow: hidden;

    ${({blurred}) => blurred ? blurredStyle : null}
`;

const renderers = {
    problem: {
        content: ProblemDetail,
        title: ProblemTabTitle,
    },
};

const Wrapper = ({children}) => children;

const Main = ({isFirstConnection}) => (
    <Wrapper>
        <Container blurred={isFirstConnection}>
            <ActivityBar />
            <SideBar />
            <Editor renderers={renderers} />
        </Container>
        {isFirstConnection && <Login />}
        <Notifications />
    </Wrapper>
);

Main.propTypes = {
    isFirstConnection: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    isFirstConnection: isLoginVariableSet(state),
});

export default connect(mapStateToProps)(onlyUpdateForKeys([
    'isFirstConnection',
])(Main));
