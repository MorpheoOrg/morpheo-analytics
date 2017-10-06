import React from 'react';
import {css} from 'emotion';

const debug = true;

const style = css`
    display: inline-block;
    min-width: 30px;
    width: 100%;
    background-color: ${debug ? 'rgba(255, 0, 0, 0.2)' : 'inherit'};
    border: ${debug ? '1px solid yellow' : 'inherit'};
`;

class Space extends React.Component {

    onMouseOver = () => this.props.onMouseOver();
    onMouseOut = () => this.props.onMouseOut();
    onMouseUp = () => this.props.onMouseUp();

    render() {
        return <li className={style}
                    onMouseOver={this.onMouseOver}
                    onMouseOut={this.onMouseOut}
                    onMouseUp={this.onMouseUp}
        />;
    }
}

export default Space;
