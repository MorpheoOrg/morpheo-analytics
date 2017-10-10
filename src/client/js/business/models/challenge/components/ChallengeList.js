import React from 'react';
import {css} from 'emotion';

import ChallengeItem from './ChallengeItem';


class ChallengeList extends React.Component {
    style = css`
    `;

    render() {
        return (<div
            css={this.style}
        >
            <div>Research Field</div>
            <ChallengeItem />
            <ChallengeItem />
        </div>);
    }
}

export default ChallengeList;
