import React, {Component} from 'react';
import {Icon, Tag} from 'antd';
import {withRouter} from 'react-router';
import {onlyUpdateForKeys} from 'recompose';

class Experiment extends Component {
    constructor(props) {
        super(props);

        this.handleExperimentClick = this.handleExperimentClick.bind(this);

        this.style = {
            icon: {
                color: '#b6b5b5',
            },
            wrapperTag: {
                marginTop: 5,
            },
            tag: {
                fontSize: 11,
            }
        };
    }

    handleExperimentClick() {
        this.props.history.replace(`/experiments/${this.props.experiment.id}/`);
    }

    render() {
        const {experiment} = this.props;

        return (
            <li className="experiment-list-item" onClick={this.handleExperimentClick}>
                <h3>
                    <Icon
                        type={experiment.shared_with.length ? 'team' : 'lock'}
                        style={this.style.icon}
                    />
                    {experiment.name}
                </h3>
                <div style={this.style.wrapperTag}>
                    <Tag color='blue' style={this.style.tag}>{experiment.owner}</Tag>
                </div>
                <div className="algo-count">
                    <span>{experiment.algo_count}</span>
                    <br />algos
                </div>
                <div className="trial-count">
                    <span>{experiment.trial_count}</span>
                    <br />trials
                </div>
            </li>
        );
    }
}

export default onlyUpdateForKeys(['experiment'])(withRouter(Experiment));
