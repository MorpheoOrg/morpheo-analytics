import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled, {css} from 'react-emotion';

import {getLeaderboardData} from '../../../learnuplet/selector';
import actionsAlgo from '../../../algo/actions';

import Trophy from '../../../../components/icons/Trophy';
import FlaskOutline from '../../../../components/icons/FlaskOutline';
import ChartLine from '../../../../components/icons/ChartLine';
import FlatButton from '../../../../components/FlatButton';


const Container = styled.div`
    flex: 1 0 auto;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 6px;
        background-color: #FFFFFF;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #C3C3C4;
        border-radius: 3px;
    }
    padding-right: 10px;
    margin-right: 40px;
`;

// We need that div to wrap correctly the content in a flex box
// with an overflow-y
const FixedDiv = styled.div`
    /* Compute the height by removing every fixed-size components */
    height: calc(100vh - 900px);
`;

const Table = styled.table`
    overflow-y: auto;
    border-collapse:collapse;
    width: 99.99999%;
    min-width: 500px;
`;

const LeaderboardHeader = styled.thead`
    background-color: #FAFAFB;
    text-align: left;
    padding: 8px;
`;

const LeaderboardBody = styled.tbody`
    text-align: left;
    padding: 8px;
`;

// TODO add bold
const boldRow = css`
    font-weight: 500;
    color: #5600FF;
`;

const LeaderboardRow = styled.tr`
    cursor:pointer;
    &:nth-child(even) {
        background-color: #FAFAFB;
        border: 1px solid #FAFAFB;
    }
    &:hover{
        font-weight: 500;
    }
    ${({selected}) => selected ? boldRow : null};
`;

const LeaderboardHeaderCell = styled.th`
    text-align: left;
    padding: 8px;
`;

const LeaderboardCell = styled.td`
    text-align: left;
    padding: 8px;
`;

class Leaderboard extends React.Component {
    handleLeaderboardRowClick = algoId => (event) => {
        // TODO change by algoId
        event.preventDefault();
        this.props.onSelectAlgorithm(algoId);
    }

    refresh = (event) => {
        event.preventDefault();
        this.props.loadAlgoList();
    }

    render() {
        // TODO add is loading
        const {leaderboardData, selectedAlgorithmId} = this.props;
        return (
            <Container>
                <FlatButton onClick={this.refresh}>
                    Refresh the leaderboard
                </FlatButton>
                <FixedDiv>
                    <Table>
                        <LeaderboardHeader>
                            <LeaderboardRow>
                                <LeaderboardHeaderCell>
                                    <Trophy />
                                </LeaderboardHeaderCell>
                                <LeaderboardHeaderCell>
                                    <FlaskOutline />
                                </LeaderboardHeaderCell>
                                <LeaderboardHeaderCell>
                                    <ChartLine />
                                </LeaderboardHeaderCell>
                            </LeaderboardRow>
                        </LeaderboardHeader>

                        <LeaderboardBody>
                            {leaderboardData.map(({name, uuid, bestPerf}, index) => (
                                <LeaderboardRow
                                    key={uuid}
                                    onClick={this.handleLeaderboardRowClick(uuid)}
                                    selected={
                                        (selectedAlgorithmId || leaderboardData[0].uuid) === uuid
                                    }
                                >
                                    <LeaderboardCell>{index + 1}</LeaderboardCell>
                                    <LeaderboardCell>{name}</LeaderboardCell>
                                    <LeaderboardCell>
                                        {(bestPerf * 100).toFixed(2)}
                                    </LeaderboardCell>
                                </LeaderboardRow>
                            ))}
                        </LeaderboardBody>
                    </Table>
                </FixedDiv>
            </Container>
        );
    }
}

Leaderboard.propTypes = {
    leaderboardData: PropTypes.arrayOf(PropTypes.shape({
        bestPerf: PropTypes.number,
        name: PropTypes.string,
        problem: PropTypes.string,
        timestamp_upload: PropTypes.number,
        uuid: PropTypes.string,
    })),
    isLoading: PropTypes.bool,
    selectedAlgorithmId: PropTypes.string,

    onSelectAlgorithm: PropTypes.func,
    loadAlgoList: PropTypes.func.isRequired,
};

const noop = () => {};

Leaderboard.defaultProps = {
    leaderboardData: [],
    isLoading: true,
    selectedAlgorithmId: undefined,

    onSelectAlgorithm: noop,
};

const mapStateToProps = (state, {problemId}) => ({
    leaderboardData: getLeaderboardData(state)[problemId],
});

const mapDispatchToProps = (dispatch, {problemId}) => bindActionCreators({
    loadAlgoList: () => actionsAlgo.list.request({problemId}),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([
    'leaderboardData', 'isLoading', 'selectedAlgorithmId',
])(Leaderboard));
