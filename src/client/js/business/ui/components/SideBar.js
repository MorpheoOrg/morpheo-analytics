/* eslint react/no-danger: 0 */
/* globals window */

import {PropTypes} from 'prop-types';
import {css} from 'emotion';
import styled from 'emotion/react';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {onlyUpdateForKeys} from 'recompose';
import {ChevronLeft} from 'mdi-material-ui';

import actions from '../actions/sideBar';


const Container = styled.div`
    overflow: hidden;
    margin-left:auto;
    margin-right:auto;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-bottom: 30px;

    & button{
        position: relative;
        right: 0;
    }
`;

const FlatButton = styled.div`
    border: none;
    background-color: inherit;
    color: #98999F;

    &:hover{
        color: #45464B;
    }

    .active{
        color: #45464B;
    }

    &:focus{
        outline: 0;
    }
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


class SideBar extends React.Component {
    state = {
        selectedIndex: this.props.selectedIndex < 0 ?
            0 : this.props.selectedIndex,
        status: this.props.selectedIndex < 0 ? 'closed' : 'openned',
        width: this.props.width,
    };

    componentWillReceiveProps(nextProps) {
        console.log('update');
        // Keep in mind the previous selectedIndex to display animation
        if (nextProps.selectedIndex >= 0) {
            this.setState({
                selectedIndex: nextProps.selectedIndex,
            });
        }

        // Add a transition when panel is shown or hidden
        if ((nextProps.selectedIndex < 0) !== (this.props.selectedIndex < 0)) {
            this.setState(prevState => ({
                status: (nextProps.selectedIndex < 0) ? 'closing' : 'openning',
            }));

            // Remove the transition to let the user resize without problems
            setTimeout(() => this.setState(prevState => ({
                status: (nextProps.selectedIndex < 0) ? 'closed' : 'openned',
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

        padding: 20px;
        padding-top: 40px;

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
        const {menuContent} = this.props;
        const {selectedIndex} = this.state;
        const {name = null, content = null} = selectedIndex >= 0 ?
            menuContent[selectedIndex] : {};

        return (<div
            css={this.staticStyle()}
            className={this.state.status}
            style={this.dynamicStyle()}
        >
            <Container>
                <div>
                    <Header>
                        <h1>{name}</h1>
                        <FlatButton onClick={this.props.hide}>
                            <ChevronLeft />
                        </FlatButton>
                    </Header>
                    {content}
                    {this.props.children}
                </div>
            </Container>
            <Dragger
                className={this.slider}
                onMouseDown={this.onMouseDown}
            />
        </div>);
    }
}

SideBar.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    menuContent: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            icon: PropTypes.element,
            content: PropTypes.element,
        }),
    ).isRequired,
    selectedIndex: PropTypes.number.isRequired,
    visible: PropTypes.bool,
    width: PropTypes.number,

    hide: PropTypes.func.isRequired,
    resize: PropTypes.func.isRequired,
};

SideBar.defaultProps = {
    menuContent: [],
    className: '',
    children: null,
    visible: false,
    width: 400,
};

const mapStateToProps = ({parameters}, ownProps) => ({
    ...ownProps,
    selectedIndex: parameters.sideBar.selectedIndex,
    visible: parameters.sideBar.selectedIndex >= 0,
    width: parameters.sideBar.width,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    hide: actions.hide,
    resize: actions.resize,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
    onlyUpdateForKeys(['className', 'selectedIndex', 'visible', 'width'])(SideBar));
