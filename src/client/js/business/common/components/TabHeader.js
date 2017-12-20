/* globals window */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import styled, {css} from 'react-emotion';
import {throttle} from 'lodash';

import FlatButton from './FlatButton';
import Close from './icons/Close';


const Button = styled(FlatButton)`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 2px;

    & svg {
        width: 16px;
    }
    width: 16px;
    &:hover {
        color: red;
    }
`;

const Li = styled.li`
    position: relative;
    display: inline-block;
`;

const draggedTabStyle = css`
    background-color: white;
    box-shadow: 0px 3px 10px rgba(0%, 0%, 0%, 0.30);
    border-width: 0 0 0 0;
    pointer-events: none;
    z-index: 2;
`;

const Tab = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;

    border-radius: 4px 4px 0 0;
    border: 1px solid #ccc;
    border-width: 0 1px 0 0;
    padding: 6px 30px 6px 10px;

    text-align: center;
    text-decoration: none;

    white-space: nowrap;

    & button {
        visibility: ${({active}) => active ? 'visible' : 'hidden'};
    }

    &:hover {
        background-color: white;
    }

    &:hover button {
        visibility: visible;
    }

    background-color: ${({active}) => active ? 'white' : '#f1f1f2'};

    ${({dragged}) => dragged ? draggedTabStyle : null}
`;

const HiddenDropable = styled.div`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &:hover {
        background-color: blue;
    }
    z-index: 1;
`;

class TabTitle extends React.Component {
    state = {
        x: undefined,
        y: undefined,
        dragged: false,
    }

    componentWillUnmount() {
        this.handleDragEnd();
    }

    handleMouseDown = (event) => {
        event.preventDefault();

        // Manage the drag event
        window.addEventListener('mousemove', this.handleDragMove);
        window.addEventListener('mouseup', this.handleDragEnd);

        this.setState({
            dragged: true,
        });

        // Initiate the origin points to apply the drag move
        this.x = event.clientX;
        this.y = event.clientY;

        this.props.onDragStart(event);
    };


    // throttle the move event to limit rendering
    handleDragMove = throttle((event) => {
        // Drag move by applying a translation
        this.setState({
            x: event.clientX - this.x,
            y: event.clientY - this.y,
        });
    }, 0); // 17ms ~= 60Hz

    handleDragEnd = (event) => {
        this.setState({
            x: undefined,
            y: undefined,
            dragged: false,
        });

        // Remove the event created with handleMouseDown
        window.removeEventListener('mousemove', this.handleDragMove);
        window.removeEventListener('mouseup', this.handleDragEnd);

        this.props.onDragEnd(event);
    };

    // Put it into emotion css
    transform = () => {
        const {allowDrop, xTranslation} = this.props;
        const {x, y, dragged} = this.state;

        if (dragged) {
            return {
                transform: `translate(${x}px, ${y}px)`,
            };
        }
        else if (allowDrop && xTranslation) {
            return {transform: `translateX(${xTranslation}px)`};
        }
        return {};
    };

    // Todo reprendre avec css grid
    render() {
        const {dragged} = this.state;
        const {
            active, allowDrop, children,
            onClose, onDragOut, onDragOver, onDrop,
        } = this.props;
        return (
            <Li>
                {/* Can move during onDragOver */}
                <Tab
                    active={active}
                    dragged={dragged}
                    style={this.transform()}
                    onMouseDown={this.handleMouseDown}
                >
                    {children}
                    <Button
                        onClick={onClose}
                        active={active}
                        // Prevent to launch bad events during drag move
                        onMouseDown={evt => evt.stopPropagation()}
                    >
                        <Close />
                    </Button>
                </Tab>
                {/* Add fix dropable area when allowDrop */
                    allowDrop && <HiddenDropable
                        onMouseOver={onDragOver}
                        onMouseOut={onDragOut}
                        onMouseUp={onDrop}
                    />
                }
            </Li>
        );
    }
}

TabTitle.propTypes = {
    active: PropTypes.bool,
    allowDrop: PropTypes.bool,
    children: PropTypes.node.isRequired,
    xTranslation: PropTypes.number,

    onClose: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragOut: PropTypes.func,
    onDragOver: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDrop: PropTypes.func,
};

const noop = () => {};

TabTitle.defaultProps = {
    active: false,
    allowDrop: false,
    xTranslation: 0,

    onClose: noop,
    onDragStart: noop,
    onDragOut: noop,
    onDragOver: noop,
    onDragEnd: noop,
    onDrop: noop,
};

export default onlyUpdateForKeys([
    'active', 'allowDrop', 'xTranslation',
])(TabTitle);
