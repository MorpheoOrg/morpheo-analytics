import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {css} from 'react-emotion';

import Trophy from '../../../../components/icons/Trophy';
import ChartLine from '../../../../components/icons/ChartLine';
import {getLChartData, getLeaderboardData} from '../../../learnuplet/selector';
import LChart from './LChart';


class Performance extends React.Component {
    style = css`
        display: flex;
        flex-direction: column;

        & span{
            padding-bottom: 10px;
        }
        min-width: 50%;
    `;

    renderGraphic() {
        const {algorithmIndex, bestPerf, lChartData, name} = this.props;
        return (
            <div
                css={this.style}
            >
                <span>Performances of <b>{name}</b></span>
                <span><Trophy />{algorithmIndex + 1}</span>
                <span><ChartLine />{(bestPerf * 100).toFixed(2)}%</span>
                <span><LChart data={lChartData} /></span>
            </div>
        );
    }

    render() {
        const {algorithmIndex} = this.props;
        return (
            <div
                css={this.style}
            >
                {
                    algorithmIndex !== -1 ?
                        this.renderGraphic() :
                        <span>No algorithm avalaible for the problem.</span>
                }
            </div>
        );
    }
}

Performance.propTypes = {
    algorithmIndex: PropTypes.number,
    bestPerf: PropTypes.number,
    lChartData: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.number.isRequired,
        perf: PropTypes.number.isRequired
    })),
    name: PropTypes.string,
};

Performance.defaultProps = {
    algorithmIndex: -1,
    bestPerf: 0.0,
    lChartData: [],
    name: '',
};

const mapStateToProps = (state, {problemId, selectedAlgorithmId}) => {
    // Automatically select the first algorithm if available
    const algorithmData = getLeaderboardData(state)[problemId];

    const algorithmId = (
        selectedAlgorithmId ||
        (algorithmData && algorithmData.length !== 0) ?
            algorithmData[0].uuid : undefined
    );

    const algorithmIndex = algorithmId ?
        algorithmData.findIndex(({uuid}) => uuid === algorithmId) : -1;

    const lChartData = algorithmId ? getLChartData(state)[algorithmId] : [];

    const {bestPerf, name} = algorithmId ? algorithmData[algorithmIndex] : {};

    return ({
        algorithmIndex,
        lChartData,
        bestPerf,
        name,
    });
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([
    'algorithmId',
])(Performance));
