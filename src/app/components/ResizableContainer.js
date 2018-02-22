/* globals window */
import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import styled, {css} from 'react-emotion';
import {throttle} from 'lodash';

import Dragger from './Dragger';


const Container = styled.div`
    overflow: hidden;
    margin-left:auto;
    margin-right:auto;
    padding: 20px;
`;

class ResizableContainer extends React.Component {
    // width is in state for UI responsiveness
    state = {
        width: Math.max(this.props.width, this.props.minWidth),
    };

    handleMouseDown = (event) => {
        event.preventDefault();

        // Todo correct the problem with the mouse under min size => space with dragger
        this.clientX = event.clientX;
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    };

    // throttle the move event to limit rendering
    handleMouseMove = throttle((event) => {
        event.preventDefault();
        this.updateWidth(event);
    }, 30);

    handleMouseUp = (event) => {
        event.preventDefault();
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);

        // We call resize only on MouseUp for the fluidity of the UI
        const width = this.updateWidth(event);
        this.props.onResize(width);
    };

    updateWidth = (event) => {
        const width = Math.max(
            this.state.width - (this.clientX - event.clientX),
            this.props.minWidth,
        );
        this.clientX = event.clientX;
        this.setState({
            width,
        });
        return width;
    };

    style = () => css`
        position: relative;
        padding-top: 30px;

        flex: 0 0 ${this.state.width}px;
        width: ${this.state.width}px;
        min-width: ${this.props.minWidth}px;

        background-color: #FAFAFB;
        user-select: none;
        cursor: default;
    `;

    render() {
        const {children} = this.props;
        return (
            <div
                css={this.style()}
            >
                <Container>
                    {children}
                </Container>
                <Dragger onMouseDown={this.handleMouseDown} />
            </div>
        );
    }
}

ResizableContainer.propTypes = {
    children: PropTypes.node,
    minWidth: PropTypes.number,
    width: PropTypes.number,
    onResize: PropTypes.func,
};

const noop = () => {};

ResizableContainer.defaultProps = {
    children: null,
    minWidth: 300,
    width: 300,
    onResize: noop,
};


export default onlyUpdateForKeys([
    'children', 'minWidth', 'width',
])(ResizableContainer);
