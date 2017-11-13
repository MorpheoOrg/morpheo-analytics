import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {css} from 'react-emotion';

import actionsEditor from '../../../../ui/Editor/actions';
import Leaderboard from './Leaderboard';
import Performance from './Performance';


class ProblemLeaderboard extends React.Component {
    handleSelectAlgorithm = (index) => {
        this.props.updateTab({
            selectedAlgorithmId: index,
        });
    }

    style = css`
        display: flex;
        width: 100%;
        padding-top: 40px;
    `;

    render() {
        const {problemId, selectedAlgorithmId} = this.props;
        console.log(selectedAlgorithmId);
        return (<div
            css={this.style}
        >
            <Leaderboard
                problemId={problemId}
                onSelectAlgorithm={this.handleSelectAlgorithm}
                algorithmId={selectedAlgorithmId}
            />

            <Performance
                problemId={problemId}
                algorithmId={selectedAlgorithmId}
            />
        </div>);
    }
}

ProblemLeaderboard.propTypes = {
    problemId: PropTypes.string.isRequired,
    selectedAlgorithmId: PropTypes.string,
    isloading: PropTypes.bool,

    updateTab: PropTypes.func.isRequired,
};

ProblemLeaderboard.defaultProps = {
    selectedAlgorithmId: undefined,
    isLoading: true,
};

const mapStateToProps = (state, {tabId}) => ({
    selectedAlgorithmId: state.settings.editor.tabs[tabId].selectedAlgorithmId,
});

const mapDispatchToProps = (dispatch, {tabId}) => bindActionCreators({
    updateTab: content => actionsEditor.updateTabContent({tabId, ...content}),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([
    'data', 'selectedAlgorithmId',
])(ProblemLeaderboard));
