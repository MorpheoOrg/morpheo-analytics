import React from 'react';
import {css} from 'emotion';

import Experiment from './Experiment';


class ExperimentList extends React.Component {
    style = css`
    `;

    render() {
        return (<div
            css={this.style}
        >
            <div>Research Field</div>
            <Experiment />
            <Experiment />
            <Experiment />
            <Experiment />
        </div>);
    }
}

export default ExperimentList;
