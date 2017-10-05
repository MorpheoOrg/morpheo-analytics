import React from 'react';
import {css} from 'emotion';

const style = css`
    flex-grow: 1;
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
