import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled, {css} from 'react-emotion';
import {Trophy, CloudUpload, ChartLine} from 'mdi-material-ui';

import Leaderboard from '../Leaderboard';


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
        const {problemId} = this.props;
        return (<div
            css={this.style}
        >
            <Leaderboard
                problemId={problemId}
            />

            <Performance>
                <span>Performances of <b>MiniBatch KMeans</b></span>
                <span><Trophy />1</span>
                <span><ChartLine />95.83%</span>
            </Performance>
        </div>);
    }
}

ProblemLeaderboard.propTypes = {
    problemId: PropTypes.string.isRequired,
    isloading: PropTypes.bool,
};

ProblemLeaderboard.defaultProps = {
    isLoading: true,
};

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([
    'data',
])(ProblemLeaderboard));
