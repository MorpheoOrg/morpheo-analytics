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

        &:hover {
            color: red;
        }
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

class Tab extends React.Component {
    // Maybe introduces a status for dragged, overred, ...
    // To change the class name
    state = {
        status: '',
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
        this.props.onMouseDown(this.props.index);

        // Manage the drag event
        window.addEventListener('mousemove', this.handleDragMove);
        window.addEventListener('mouseup', this.handleDragEnd);

        // Initiate the origin points to apply the drag move
        this.x0 = event.clientX;
        this.y0 = event.clientY;

        // Apply the onDragTabStart
        this.props.onDragStart(event, this.props.index);
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

        this.props.onDragEnd(this.props.index);

        // Remove the event created with handleMouseDown
        window.removeEventListener('mousemove', this.handleDragMove);
        window.removeEventListener('mouseup', this.handleDragEnd);
    };

    onClose = () => this.props.onClose(this.props.index);
    onDragOver = () => this.props.onDragOver(this.props.index);
    onDragOut = () => this.props.onDragOut(this.props.index);
    onDrop = () => this.props.onDrop(this.props.index);

    onMouseDown = (event) => event.stopPropagation();
    render() {
        const {active, translation} = this.props;
        const {dragged, x, y} = this.state;

        return (<li className={style.li} onMouseOver={this.onDragOver} >
            <Hidden onMouseOut={this.onDragOut} onMouseUp={this.onDrop} />

            <div className={style.tab(dragged, active, translation, x, y)} onMouseDown={this.handleMouseDown}>
                {this.props.children}
                <button onMouseDown={this.onMouseDown}
                        onClick={this.onClose}
                        className={style.close(active)}
                >
                    x
                </button>
            </div>
        </li>);
    }
}

Tab.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.string.isRequired,
    translation: PropTypes.number,
    onClose: PropTypes.func,
};

const noop = () => {
};

Tab.defaultProps = {
    active: false,
    translation: 0,

    onClose: noop,
};


export default Tab;
