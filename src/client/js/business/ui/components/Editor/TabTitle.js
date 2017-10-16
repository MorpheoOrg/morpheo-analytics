/* globals window */

import PropTypes from 'prop-types';
import React from 'react';
import {css} from 'emotion';
import {onlyUpdateForKeys} from 'recompose';
import {Poll, Close} from 'mdi-material-ui';

const debug = false;

const style = {
    li: css`
        position: relative;
        display: inline-block;
    `,
    tab: (dragged, active) => css`
        cursor: pointer;
        display: flex;
        align-items: center;
        position: relative;

        border-radius: 4px 4px 0 0;
        border: 1px solid #ccc;
        border-width: 1px 1px 0 1px;
        padding: 6px 30px 6px 10px;

        text-align: center;
        text-decoration: none;

        white-space: nowrap;

        background-color: ${dragged || active ? 'white' : '#f1f1f2'};

        & svg {
            width: 13px;
        }

        & span {
            padding-left: 10px;
        }

        &:hover {
            background-color: white;
        }

        &:hover button {
            color: red;
        }

        box-shadow: ${dragged ? '0px 3px 10px rgba(0%, 0%, 0%, 0.30)' : 'inherit'};
        pointer-events: ${dragged ? 'none' : 'inherit'};
        z-index: ${dragged ? '1' : 'inherit'};
    `,
    close: css`
        cursor: pointer;
        border: none;
        color: transparent;
        background-color: transparent;
        box-shadow: none !important;

        position: absolute;
        top: 0;
        bottom: 0;
        right: 2px;

        & svg {
            width: 16px;
        }

        &:focus {
            outline: 0;
        }
`,
};

const hidden = (draggedTab, id) => css`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${debug ? (draggedTab && draggedTab.id === id ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)') : 'inherit'};
    border: ${debug ? '1px solid yellow' : 'inherit'};
    z-index: ${draggedTab ? '1' : 'inherit'};
`;

class TabTitle extends React.Component {
    state = {
        dragged: false,
    };

    componentWillUnmount() {
        this.handleDragEnd();
    }

    handleMouseDown = (event) => {
        event.preventDefault();
        this.props.onMouseDown(this.props.id);

        // Manage the drag event
        window.addEventListener('mousemove', this.handleDragMove);
        window.addEventListener('mouseup', this.handleDragEnd);

        // Initiate the origin points to apply the drag move
        this.x = event.clientX;
        this.y = event.clientY;

        // Apply the onDragTabStart
        const width = event.currentTarget.offsetWidth;
        this.props.onDragStart(this.props.id, width);
        this.setState({dragged: true});
    };

    handleDragMove = (event) => {
        // Drag move by applying a translation
        // render
        this.setState({
            x: event.clientX - this.x,
            y: event.clientY - this.y,
        });
    };

    handleDragEnd = () => {
        //reset
        this.setState({
            ...this.state,
            x: undefined,
            y: undefined,
            dragged: false,
        });

        this.props.onDragEnd();
        // Remove the event created with handleMouseDown
        window.removeEventListener('mousemove', this.handleDragMove);
        window.removeEventListener('mouseup', this.handleDragEnd);
    };

    onClose = () => this.props.onClose(this.props.id);
    onDragOver = (event) => this.props.onDragOver(this.props.id);
    onDragOut = () => this.props.onDragOut(this.props.id);
    onDrop = () => this.props.onDrop(this.props.id);

    onMouseDown = (event) => event.stopPropagation();

    transform = () => {
        const {translation} = this.props;
        const {x, y, dragged} = this.state;

        return {
            ...(dragged ? {transform: `translate(${x}px, ${y}px)`} : {transform: `translate(${translation}px, 0)`}),
            //...((!dragged && draggedTab) || (droppedTab && droppedTab.id === id) ? {transition: `transform ${this.duration}ms`} : {}),
        };
    };

    render() {
        const {active, value, id, draggedTab} = this.props;
        const {dragged} = this.state;

        return <li className={style.li}>
            <div className={hidden(draggedTab, id)}
                 onMouseOut={this.onDragOut}
                 onMouseUp={this.onDrop}
                 onMouseOver={this.onDragOver}/>
            <div className={style.tab(dragged, active)}
                 style={this.transform()}
                 onMouseDown={this.handleMouseDown}>
                <Poll />
                <span>{value}</span>
                <button onMouseDown={this.onMouseDown}
                        onClick={this.onClose}
                        className={style.close}
                >
                    <Close />
                </button>
            </div>
        </li>;
    }
}

TabTitle.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    translation: PropTypes.number,
    onClose: PropTypes.func,
};

const noop = () => {
};

TabTitle.defaultProps = {
    active: false,
    translation: 0,

    onClose: noop,
};


export default onlyUpdateForKeys(['draggedTab', 'active', 'translation'])(TabTitle);
