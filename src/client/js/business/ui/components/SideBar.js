/* globals window */

import React from 'react';
import {PropTypes} from 'prop-types';
import {css} from 'emotion';
import styled from 'emotion/react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {onlyUpdateForKeys} from 'recompose';
import {ChevronLeft} from 'mdi-material-ui';

import actions from '../actions/sideBar';
import {menuContent} from './iconDefinition';
import {getVisible} from '../selector';

const Container = styled.div`
    overflow: hidden;
    margin-left:auto;
    margin-right:auto;
`;

const Header = styled.div`
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 30px;
`;

const Content = styled.div`
display: flex;
position: relative;
justify-content: space-between;
align-items: center;
`;

const FlatButton = styled.button`
    border: none;
    background-color: inherit;
    color: #98999F;
    right: 0;
    cursor: pointer;

    &:hover {
        color: #45464B;
    }

    .active {
        color: #45464B;
    }

    &:focus {
        outline: 0;
    }
`;

const Dragger = styled.div`
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
    // width is in state for UI responsiveness
    state = {
        width: this.props.width,
    };
    onMouseDown = (event) => {
        event.preventDefault();

        this.clientX = event.clientX;
        // TODO need to debounce mousemove
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);
    };

    onMouseMove = (event) => {
        event.preventDefault();
        this.updateWidth(event);
    };

    onMouseUp = (event) => {
        event.preventDefault();
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);

        // We call resize only on MouseUp for the fluidity of the UI
        const width = this.updateWidth(event);
        this.props.resize(width);
    };

    updateWidth = (event) => {
        const width = this.state.width - (this.clientX - event.clientX);
        this.clientX = event.clientX;
        this.setState({width});
        return width;
    };

    style = () => css`
        background-color: #FAFAFB;
        position: relative;
        padding-top: 30px;
        flex: 0 0 ${['opening', 'opened'].includes(this.props.status) ? this.state.width : 0}px;
        min-width: ${['closing', 'opening'].includes(this.props.status) ? '0px' : 'auto'};
        transition: ${['closing', 'opening'].includes(this.props.status) ? `flex ${this.props.duration}ms ease-out` : 'auto'};
    `;

    close = () => {
        const {setStatus} = this.props;
        setStatus('closing');
        setTimeout(() => {
            setStatus('closed');
        }, this.props.duration);
    };

    render() {
        const {selectedIndex, visible} = this.props;

        return (<div className={this.style()}>
            {visible && <Container>
                <Header>
                    <h3>{menuContent[selectedIndex].name}</h3>
                    <FlatButton onClick={this.close}>
                        <ChevronLeft/>
                    </FlatButton>
                </Header>
                <Content>
                    {menuContent[selectedIndex].content}
                </Content>
            </Container>
            }
            <Dragger onMouseDown={this.onMouseDown}/>
        </div>);
    }
}

SideBar.propTypes = {
    selectedIndex: PropTypes.number.isRequired,
    visible: PropTypes.bool,
    status: PropTypes.string,
    width: PropTypes.number,

    setStatus: PropTypes.func.isRequired,
    resize: PropTypes.func.isRequired,
};

SideBar.defaultProps = {
    menuContent: [],
    children: null,
    visible: false,
    width: 400,
};

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    selectedIndex: state.parameters.sideBar.selectedIndex,
    width: state.parameters.sideBar.width,
    status: state.parameters.sideBar.status,
    duration: state.parameters.sideBar.duration,
    visible: getVisible(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setStatus: actions.setStatus,
    resize: actions.resize,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys(['selectedIndex', 'visible', 'status'])(SideBar));
