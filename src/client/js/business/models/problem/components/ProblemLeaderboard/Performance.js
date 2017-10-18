import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {css} from 'emotion';
import {Trophy, ChartLine} from 'mdi-material-ui';

import {getLeaderboardData} from '../../../learnuplet/selector';


class Performance extends React.Component {
    style = css`
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    `;

    render() {
        const {algorithmId, data} = this.props;
        const {bestPerf, name} = data;
        return (<div
            css={this.style}
        >
            <span>Performances of <b>{name}</b></span>
            <span><Trophy />{algorithmId + 1}</span>
            <span><ChartLine />{(bestPerf * 100).toFixed(2)}%</span>
        </div>);
    }
}

Performance.propTypes = {

};

Performance.defaultProps = {

};

const mapStateToProps = (state, {problemId, algorithmId}) => ({
    data: getLeaderboardData(state)[problemId][algorithmId],
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([
    'algorithmId',
])(Performance));
