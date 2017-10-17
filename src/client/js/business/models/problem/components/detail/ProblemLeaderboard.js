import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled, {css} from 'react-emotion';
import {Trophy, CloudUpload, ChartLine} from 'mdi-material-ui';


const Leaderboard = styled.table`
    flex-grow: 1;
    width: 50%;
    border-collapse:collapse;
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

const LeaderboardRow = styled.tr`
&:nth-child(even) {
    background-color: #FAFAFB;
    border: 1px solid #FAFAFB;
}
`;

const LeaderboardHeaderCell = styled.th`
    text-align: left;
    padding: 8px;
`;

const LeaderboardCell = styled.td`
    text-align: left;
    padding: 8px;
`;

const Performance = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

class ProblemLeaderboard extends React.Component {
    style = css`
        display: flex;
        width: 100%;
    `;

    render() {
        const {data} = this.props;
        return (<div
            css={this.style}
        >
            <Leaderboard>
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
                        >
                            <LeaderboardCell>{index}</LeaderboardCell>
                            <LeaderboardCell>{name}</LeaderboardCell>
                            <LeaderboardCell>{bestPerf}</LeaderboardCell>
                        </LeaderboardRow>
                    ))}
                </LeaderboardBody>
            </Leaderboard>

            <Performance>
                <span>Performances of <b>MiniBatch KMeans</b></span>
                <span><Trophy />1</span>
                <span><ChartLine />95.83%</span>
            </Performance>
        </div>);
    }
}

ProblemLeaderboard.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        bestPerf: PropTypes.number,
        name: PropTypes.str,
        problem: PropTypes.str,
        timestamp_upload: PropTypes.number,
        uuid: PropTypes.str,
    })),
    isloading: PropTypes.bool,
};

ProblemLeaderboard.defaultProps = {
    data: [],
    isLoading: true,
};

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([
    'data',
])(ProblemLeaderboard));
