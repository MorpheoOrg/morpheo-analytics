import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import styled from 'react-emotion';

import Leaderboard from './Leaderboard';
import Performance from './Performance';


const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap-reverse;
`;

class ProblemLeaderboard extends React.Component {
    handleSelectAlgorithm = (index) => {
        this.props.updateProps({
            selectedAlgorithmId: index,
        });
    }

    render() {
        const {problemId, selectedAlgorithmId} = this.props;

        return (
            <Container>
                <Leaderboard
                    problemId={problemId}
                    onSelectAlgorithm={this.handleSelectAlgorithm}
                    selectedAlgorithmId={selectedAlgorithmId}
                />
                <Performance
                    problemId={problemId}
                    selectedAlgorithmId={selectedAlgorithmId}
                />
            </Container>
        );
    }
}

ProblemLeaderboard.propTypes = {
    problemId: PropTypes.string.isRequired,
    selectedAlgorithmId: PropTypes.string,

    updateProps: PropTypes.func.isRequired,
};

ProblemLeaderboard.defaultProps = {
    selectedAlgorithmId: undefined,
};


export default onlyUpdateForKeys([
    'selectedAlgorithmId',
])(ProblemLeaderboard);
