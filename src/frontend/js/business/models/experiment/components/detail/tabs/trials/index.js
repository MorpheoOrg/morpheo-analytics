/**
 * Created by guillaume on 3/3/17.
 */

import React from 'react';
import {onlyUpdateForKeys} from 'recompose';

import Chart from './chart/index';
import LChart from './lchart/index';
import Trial from './trial';
import Steps from './steps';

class Trials extends React.Component {
    componentWillMount() {
        if (!this.props.learnuplet.loading && !this.props.learnuplet.init) {
            this.props.loadLearnuplet(this.props.item.id)
        }
    }
    render() {
        const {loading, trials, algos, item, learnuplet, setIsExpanded, deleteTrial} = this.props;

        return !loading.algo && !loading.trial ? (trials && trials.length ?
            <div>
                <LChart
                    item={item}
                    learnuplet={learnuplet}
                />
                <Chart
                    item={item}
                    trials={trials}
                    algos={algos}
                />
                <div className="trial-list">
                    <ul>{trials.map(trial =>
                        <Trial
                            key={trial.id}
                            trial={trial}
                            item={item}
                            setIsExpanded={setIsExpanded}
                            deleteTrial={deleteTrial}
                        />)}</ul>
                </div>
            </div>
            : <Steps algos={algos.results}
                     setCreateModalAlgo={setCreateModalAlgo}/>) : null;
    }
}

export default onlyUpdateForKeys(['trials', 'algos', 'item', 'id', 'filters'])(Trials);
