import React, {Component} from 'react'
import {round, min, max} from 'lodash';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Row, Col, Card} from 'antd';
import {onlyUpdateForKeys} from 'recompose';

import {getQuery, getTrials, getAlgos, getScatterChartData} from '../../selector';

import actions from '../../actions';
import trialActions from '../../../trial/actions';

import Top from './top';

import LineChartWidget from './widgets/line-chart/index'
// import RadarChartWidget from './widgets/radar-chart-widget'
import ScatterChartWidget from './widgets/scatter-chart/index'

// TODO separate code, selector

class Dashboard extends Component {
    componentWillMount() {
        if (!this.props.loading && this.props.id && !this.props.item) {
            this.props.loadItem(this.props.id);
        }
    }

    render() {

        const {item, algos, trials, filters} = this.props;

        return item ? (
            <div className='main-container'>
                <Top {...this.props}/>
                <Row>
                    <Col span={6}>
                        <Card bordered={false} className='dashboard-number'>
                            <h1>{item.trial_count}</h1>
                            <p>total trials</p>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} className='dashboard-number'>
                            <h1>{item.algo_count}</h1>
                            <p>total algos</p>
                        </Card>
                    </Col>
                    {item && item.metrics && trials.length && item.metrics.map((metric, i) => {
                            // TODO put best in a selector
                            let best = trials.map((k) => k.results[metric]);
                            best = round(filters.desc === 'true' ? min(best) : max(best), 2);
                            return <Col span={6} key={i}>
                                <Card bordered={false} className='dashboard-number'>
                                    <h1>{best}</h1>
                                    <p>{filters.desc === 'true' ? 'min' : 'max'} {metric}</p>
                                </Card>
                            </Col>
                        }
                    )}
                    {item && trials && item.metrics && item.metrics.map((metric, i) =>
                        <LineChartWidget
                            key={i}
                            metric={metric}
                            trials={trials}
                        />
                    )}
                    {item && trials && trials.length && algos && algos.length && <ScatterChartWidget {...this.props} /> }
                </Row>
            </div>
        ) : null;
    }
}

function mapStateToProps(s, ownProps) {

    const state = s.models.experiment;

    const id = ownProps.match.params.id || state.item.id,
        item = id ? state.item.results[id] : null;

    return {
        query: getQuery(ownProps),
        filters: state.filters,
        scatter: state.widget.scatter,
        scatterChartData: getScatterChartData(s),
        item,
        trials: getTrials(s),
        algos: getAlgos(s),
        loading: state.item.loading,
        id,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadItem: actions.item.get.request,

        loadTrials: trialActions.item.get.request,

        setScatterX: actions.widget.scatter.x.set,
        setScatterY: actions.widget.scatter.y.set,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys(['item', 'algos', 'trials', 'filters'])(withRouter(Dashboard)));
