import React from 'react';
import {css} from 'emotion';
import {connect} from 'react-redux';

const style = css`
    flex-grow: 1;
`;

class Space extends React.Component {

    onMouseOver = () => this.props.onMouseOver(this.props.lastIndex);
    onMouseOut = () => this.props.onMouseOut(this.props.lastIndex);
    onMouseUp = () => this.props.onMouseUp(this.props.lastIndex);

    render() {
        return <li className={style}
                    onMouseOver={this.onMouseOver}
                    onMouseOut={this.onMouseOut}
                    onMouseUp={this.onMouseUp}
        />;
    }
}

const mapStateToProps = (state, ownProps) => {
    const {droppableTab, length, groupIndex} = ownProps;

    // TODO put in selector
    return {
        lastIndex: droppableTab && droppableTab.groupIndex === groupIndex ? length - 1 : length,
    }
};

export default connect(mapStateToProps)(Space);
