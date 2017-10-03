/* globals window */
import PropTypes from 'prop-types';
import React from 'react';
import {css} from 'emotion';


class Tab extends React.Component {
    // Maybe introduces a status for dragged, overred, ...
    // To change the class name
    state = {
        status: '',
        dragged: false,
    }

    componentWillUnmount() {
        if (this.state.dragged) {
            console.log('first');
        }

        // prevent handleDragEnd on unmount component
        this.handleDragEnd();
    }

    handleMouseDown = (event) => {
        event.preventDefault();
        this.props.onMouseDown(event);

        // Manage the drag event
        window.addEventListener('mousemove', this.handleDragMove);
        window.addEventListener('mouseup', this.handleDragEnd);

        // Initiate the origin points to apply the drag move
        this.x0 = event.clientX;
        this.y0 = event.clientY;

        // Apply the onDragTabStart
        this.props.onDragStart(event);
    }

    handleDragMove = (event) => {
        // Drag move by applying a translation
        this.setState({
            dragged: true,
            x: event.clientX - this.x0,
            y: event.clientY - this.y0,
        });
    }

    handleDragEnd = (event) => {
        console.log('second');
        this.setState({
            dragged: false,
        });

        this.props.onDragEnd(event);

        // Remove the event created with handleMouseDown
        window.removeEventListener('mousemove', this.handleDragMove);
        window.removeEventListener('mouseup', this.handleDragEnd);
    }

    handleDrop = (event) => {
        console.log('drop');
        this.props.onDrop(event);
    }

    buttonStyle = css`
        display: flex;
        align-items: center;
        position: inherit;

        border: none;
        padding: 14px 16px;

        text-align: center;
        text-decoration: none;

        background-color: #f1f1f2;

        & button {
            border: none;
            margin-left: 3px;
            background-color: inherit;
            color: transparent;
            box-shadow: none !important;
        }

        &:hover,.active {
            background-color: white;
        }

        &:hover button,.active button{
            color: inherit;
        }

        & button:hover{
            color: red;
        }

        & button:focus {
            outline: 0;

        }

        & button:active {
            transform: scale(1.1);
        }

        .dragged {
            box-shadow: 0px 3px 10px rgba(0%, 0%, 0%, 0.30);
            pointer-events: none;
            transition: none;
            z-index: 10;

        }
    `;

    style = css`
        float: left;
        position: relative;

        & div{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .overred button{
            pointer-events: none;
        }

        .dragged {
        }
    `;

    render() {
        const {active, translation} = this.props;
        const {dragged, x, y} = this.state;
        if (translation !== 0) console.log(translation);

        return (<li
            className={dragged ?
                'dragged' :
                translation !== 0 ? 'overred' : ''}
            css={this.style}
            onMouseOver={this.props.onDragOver}
        >
            <div
                onMouseOut={this.props.onDragOut}
                onMouseUp={this.handleDrop}
            />

            <button
                className={dragged ?
                    'dragged active' :
                    active ? 'active' : ''}
                css={this.buttonStyle}
                style={
                    dragged ? {
                        transform: `translate(${x}px, ${y}px)`,
                    } : translation ? {
                        transform: `translate(${translation}px, 0)`,
                    } : {}
                }

                onMouseDown={this.handleMouseDown}
            >
                {this.props.children}
                <button
                    onMouseDown={(event) => {
                        event.stopPropagation();
                    }}
                    onClick={this.props.onClose}
                >
                    x
                </button>
            </button>
        </li>);
    }
}

Tab.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.string.isRequired,
    translation: PropTypes.number,

    onClose: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragOver: PropTypes.func,
    onDragOut: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDrop: PropTypes.func,
    onMouseDown: PropTypes.func,
};

const noop = () => {};

Tab.defaultProps = {
    active: false,
    translation: 0,

    onClose: noop,
    onDragStart: noop,
    onDragOver: noop,
    onDragOut: noop,
    onDragEnd: noop,
    onDrop: noop,
    onMouseDown: noop,
};


export default Tab;
