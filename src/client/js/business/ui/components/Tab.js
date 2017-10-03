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

    componentWillUnmount() {
        if (this.state.dragged) {
            console.log('first');
        }

        // prevent handleDragEnd on unmount component
        this.handleDragEnd();
    }

    style = css`
        position: relative;

        & div{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        & button{
            z-index: 1;
        }

        & *{
            transition: inherit;
            position: inherit;
        }

        .overred button{
            pointer-events: none;
        }

        .dragged {
            z-index: 10;
        }

        .dragged button{
            box-shadow: 0px 3px 10px rgba(0%, 0%, 0%, 0.30);
            pointer-events: none;
            transition: none;
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
                className={active ? 'active' : ''}
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
            </button>
        </li>);
    }
}


// Tab
// active: is it the active tab ?
// children: content of the tab
// translation: how much pixel it must be translated

// onClick: launched when tab is clicked
// onCloseClick: launched when the close button is pushed (to add)
// onDragOver: launched when dragged and over the tab
// onDragOut: launched when dragged and over the tab
// onDragStart: launched when start to drag a tab
// onDragEnd: launched when is drop inside an element

// missing ??
// onDrop
// droppable

Tab.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.string.isRequired,
    translation: PropTypes.number,

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

    onClick: noop,
    onDragStart: noop,
    onDragOver: noop,
    onDragOut: noop,
    onDragEnd: noop,
    onDrop: noop,
    onMouseDown: noop,
};


export default Tab;
