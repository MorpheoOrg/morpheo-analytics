import React from 'react';
import {css} from 'react-emotion';

import ExperimentItem from './ExperimentItem';


class ExperimentList extends React.Component {
    style = css`
    `;

    render() {
        return (<div
            css={this.style}
        >
            <div>Research Field</div>
            <ExperimentItem />
            <ExperimentItem />
            <ExperimentItem />
            <ExperimentItem />
        </div>);
    }
}

export default ExperimentList;
