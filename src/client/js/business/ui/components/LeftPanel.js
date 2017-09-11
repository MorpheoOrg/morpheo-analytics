/* eslint react/no-danger: 0 */
/* globals window */

import {PropTypes} from 'prop-types';
import {css} from 'emotion';
import styled from 'emotion/react';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {onlyUpdateForKeys} from 'recompose';

import actions from '../actions/leftPanel';


const Container = styled('div')`
    overflow: hidden;
    margin-left:auto;
    margin-right:auto;
`;


const Dragger = styled('div') `
    position: absolute;
    z-index: 1;
    opacity: 100;
    height: 100%;
    width: 10px;
    right: -5px;
    top: 0px;
    cursor: col-resize;
`;


class LeftMenu extends React.Component {
    state = {
        status: this.props.visible ? 'openned' : 'closed',
        width: this.props.width,
    };

    componentWillReceiveProps(nextProps) {
        // Add a transition when panel is shown or hidden
        if (nextProps.visible !== this.props.visible) {
            this.setState(prevState => ({
                status: nextProps.visible ? 'openning' : 'closing',
            }));

            // Remove the transition to let the user resize without problems
            setTimeout(() => this.setState(prevState => ({
                status: nextProps.visible ? 'openned' : 'closed',
            })), 150);
        }
    }

    onMouseDown = (event) => {
        event.preventDefault();

        this.clientX0 = event.clientX;
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);
    }

    onMouseMove = (event) => {
        event.preventDefault();
        this.updateWidth(event);
    }

    onMouseUp = (event) => {
        event.preventDefault();
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);

        const width = this.updateWidth(event);
        // We call resize only on MouseUp because for the fluidity of the UI
        this.props.resize({width});
    }

    updateWidth = (event) => {
        const width = this.state.width - (this.clientX0 - event.clientX);
        this.clientX0 = event.clientX;
        // We call setState instead of redux to preserve the app fluidity
        this.setState(prevState => ({
            width,
        }));

        return width;
    }

    staticStyle = () => css`
        composes: ${this.props.className};

        background-color: #FAFAFB;
        position: relative;

        .openning,.closing,.closed{
            min-width: 0px;
        }

        .closing,.closed{
            visibility: hidden;
        }

        .openning {
            transition: flex 150ms linear,
            width 150ms linear;
        }

        .closing {
            transition: flex 150ms linear,
            width 150ms linear,
            visibility 0s 150ms;
        }
    `;

    dynamicStyle = () => {
        const width = this.props.visible ? this.state.width : 0;
        return {
            flex: `0 0 ${width}px`,
            width: `${width}px`,
        };
    };

    render() {
        return (<div
            css={this.staticStyle()}
            className={this.state.status}
            style={this.dynamicStyle()}
        >
            <Container>
                <button onClick={this.props.hide}>Hide</button>
                {this.props.children}
            </Container>
            <Dragger
                className={this.slider}
                onMouseDown={this.onMouseDown}
            />
        </div>);
    }
}

LeftMenu.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    visible: PropTypes.bool,
    width: PropTypes.number,

    hide: PropTypes.func.isRequired,
    resize: PropTypes.func.isRequired,
};

LeftMenu.defaultProps = {
    className: '',
    children: null,
    visible: false,
    width: 400,
};

const mapStateToProps = ({parameters}, ownProps) => ({
    ...ownProps,
    visible: parameters.leftPanel.visible,
    width: parameters.leftPanel.width,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    hide: actions.hide,
    resize: actions.resize,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
    onlyUpdateForKeys(['className', 'visible'])(LeftMenu));
