import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled, {css} from 'react-emotion';
import {Trophy, CloudUpload, ChartLine} from 'mdi-material-ui';

import {getLeaderboardData} from '../../../learnuplet/selector';


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

    style = css`
        flex-grow: 1;
        width: 50%;
        border-collapse:collapse;
        margin-left: 40px;
        margin-right: 10px;
    `;

    render() {
        // TODO add is loading
        const {data, algorithmId} = this.props;

        return (<table
            css={this.style}
        >
            <LeaderboardHeader>
                <LeaderboardRow>
                    <LeaderboardHeaderCell><Trophy /></LeaderboardHeaderCell>
                    <LeaderboardHeaderCell><CloudUpload /></LeaderboardHeaderCell>
                    <LeaderboardHeaderCell><ChartLine /></LeaderboardHeaderCell>
                </LeaderboardRow>
            </LeaderboardHeader>

            <LeaderboardBody>
                {data.map(({name, uuid, bestPerf}, index) => (
                    <LeaderboardRow
                        key={uuid}
                        onClick={this.handleLeaderboardRowClick(uuid)}
                        selected={(algorithmId || data[0].uuid) === uuid}
                    >
                        <LeaderboardCell>{index + 1}</LeaderboardCell>
                        <LeaderboardCell>{name}</LeaderboardCell>
                        <LeaderboardCell>{(bestPerf * 100).toFixed(2)}</LeaderboardCell>
                    </LeaderboardRow>
                ))}
            </LeaderboardBody>
        </table>);
    }
}

Leaderboard.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        bestPerf: PropTypes.number,
        name: PropTypes.string,
        problem: PropTypes.string,
        timestamp_upload: PropTypes.number,
        uuid: PropTypes.string,
    })),
    isLoading: PropTypes.bool,
    algorithmId: PropTypes.string,

    onSelectAlgorithm: PropTypes.func,
};

const noop = () => {};

Leaderboard.defaultProps = {
    data: [],
    isLoading: true,
    algorithmId: undefined,

    onSelectAlgorithm: noop,
};

const mapStateToProps = (state, {problemId}) => ({
    data: getLeaderboardData(state)[problemId],
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([
    'data', 'isLoading', 'algorithmId',
])(Leaderboard));
