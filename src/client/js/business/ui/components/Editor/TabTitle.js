/* globals window */

import PropTypes from 'prop-types';
import React from 'react';
import {css} from 'emotion';
import styled from 'emotion/react';

const style = {
    li: css`
        float: left;
        position: relative;
    `,
    tab: (dragged, active, translation, x, y) => css`
        cursor: pointer;
        display: flex;
        align-items: center;
        position: relative;

        border: none;
        padding: 14px 16px;

        text-align: center;
        text-decoration: none;

        background-color: ${dragged || active ? 'white' : '#f1f1f2'};

        &:hover {
            background-color: white;
        }
        
        &:hover button {
            color: red;
        }

        box-shadow: ${dragged ? '0px 3px 10px rgba(0%, 0%, 0%, 0.30)' : 'inherit'};
        pointer-events: ${dragged ? 'none' : 'inherit'};
        transition: ${dragged ? 'none' : 'inherit'};
        z-index: ${dragged ? '10' : 'inherit'};
        transform: ${dragged ? `translate(${x}px, ${y}px)` : (translation ? `translate(${translation}px, 0)` : 'inherit')};
    `,
    close: (active) => css`
        cursor: pointer;
        border: none;
        margin-left: 3px;
        color: transparent;
        background-color: transparent;
        box-shadow: none !important;

        position: absolute;
        top: 2px;
        right: 2px;

        &:focus {
            outline: 0;
        }
        
        transform:${active ? 'scale(1.1)' : 'inherit'};
    `,
};

const Hidden = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

class TabTitle extends React.Component {
    state = {
        dragged: false,
    };

    componentWillUnmount() {
        if (this.state.dragged) {
            console.log('dragged');
        }

        // prevent handleDragEnd on unmount component
        this.handleDragEnd();
    }

    handleMouseDown = (event) => {
        event.preventDefault();
        this.props.onMouseDown(this.props.id);

        // Manage the drag event
        window.addEventListener('mousemove', this.handleDragMove);
        window.addEventListener('mouseup', this.handleDragEnd);

        // Initiate the origin points to apply the drag move
        this.x0 = event.clientX;
        this.y0 = event.clientY;

        // Apply the onDragTabStart
        const width = event.currentTarget.offsetWidth;
        this.props.onDragStart(this.props.id, width);
    };

    handleDragMove = (event) => {
        // Drag move by applying a translation
        this.setState({
            dragged: true,
            x: event.clientX - this.x0,
            y: event.clientY - this.y0,
        });
    };

    handleDragEnd = (event) => {
        this.setState({
            dragged: false,
        });

        this.props.onDragEnd(this.props.id);

        // Remove the event created with handleMouseDown
        window.removeEventListener('mousemove', this.handleDragMove);
        window.removeEventListener('mouseup', this.handleDragEnd);
    };

    onClose = () => this.props.onClose(this.props.id);
    onDragOver = () => this.props.onDragOver(this.props.id);
    onDragOut = () => this.props.onDragOut(this.props.id);
    onDrop = () => this.props.onDrop(this.props.id);

    onMouseDown = (event) => event.stopPropagation();

    render() {
        const {active, translation, value, id} = this.props;
        const {dragged, x, y} = this.state;

        return <li className={style.li} onMouseOver={this.onDragOver}>
            <Hidden onMouseOut={this.onDragOut} onMouseUp={this.onDrop}/>
            <div className={style.tab(dragged, active, translation, x, y)}
                 onMouseDown={this.handleMouseDown}>
                <span>{value} {id.slice(0, 8)}</span>
                <button onMouseDown={this.onMouseDown}
                        onClick={this.onClose}
                        className={style.close(active)}
                >
                    x
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


export default TabTitle;
