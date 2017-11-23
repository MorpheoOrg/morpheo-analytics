import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import styled from 'react-emotion';

import Leaderboard from './Leaderboard';
import Performance from './Performance';


const Container = styled.div`
    display: flex;
    width: 100%;
    padding-top: 40px;
`;

class ProblemLeaderboard extends React.Component {
    handleSelectAlgorithm = (index) => {
        this.props.updateProps({
            selectedAlgorithmId: index,
        });
    }

    render() {
        const {problemId, selectedAlgorithmId} = this.props;
        console.log(selectedAlgorithmId);
        return (
            <Container>
                <Leaderboard
                    problemId={problemId}
                    onSelectAlgorithm={this.handleSelectAlgorithm}
                    selectedAlgorithmId={selectedAlgorithmId}
                />
                <Performance
                    problemId={problemId}
                    algorithmId={selectedAlgorithmId}
                />
            </Container>);
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
