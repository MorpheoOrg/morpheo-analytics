import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled, {css} from 'react-emotion';
import {Trophy, CloudUpload, ChartLine} from 'mdi-material-ui';

import {actions as actionsAlgo} from '../../../algo/actions';

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
    componentWillMount() {
    }

    style = css`
        display: flex;
        width: 100%;
    `;

    render() {
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
                    <LeaderboardRow>
                        <LeaderboardCell>1</LeaderboardCell>
                        <LeaderboardCell>Mini Batch Kmeans</LeaderboardCell>
                        <LeaderboardCell>95.83%</LeaderboardCell>
                    </LeaderboardRow>
                    <LeaderboardRow>
                        <LeaderboardCell>2</LeaderboardCell>
                        <LeaderboardCell>Mini Batch Kmeans</LeaderboardCell>
                        <LeaderboardCell>95.83%</LeaderboardCell>
                    </LeaderboardRow>
                    <LeaderboardRow>
                        <LeaderboardCell>3</LeaderboardCell>
                        <LeaderboardCell>Mini Batch Kmeans</LeaderboardCell>
                        <LeaderboardCell>95.83%</LeaderboardCell>
                    </LeaderboardRow>
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
    // loadProblemList: PropTypes.func.isRequired,
};

ProblemLeaderboard.defaultProps = {

};

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    // loadAlgoList: actionsAlgo,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([

])(ProblemLeaderboard));
