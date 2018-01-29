/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'react-emotion';

import {
    dragActive, getPanesLength, getPaneIndex,
    getMoveIntoNewPaneData, getMoveData, getOverredPanel
} from '../selectors';
import actions from '../actions';


/**
 * A Wrapper used to avoid using keys and arrayes or extra div
 */
const Wrapper = ({children}) => children;


/**
 * A basic div positionned absolutely taking full height.
 *
 * @param {string} [width='inherit'] -
 *     Width of the element.
 * @param {string} [left='inherit] -
 *     Left positionning of the element.
 * @param {string} [right='inherit] -
 *     Right positionning of the element
 * @return {ReactElement}
 */
const AbsoluteDiv = styled.div`
    position: absolute;

    width: ${({width = 'inherit'}) => width};
    top: 0;
    bottom: 0;
    left: ${({left = 'inherit'}) => left};
    right: ${({right = 'inherit'}) => right};

    z-index: 1;
`;


/**
 * An hidden element used to create interaction with drag'n drop.
 *
 * @param {string} [width='inherit'] -
 *     Width of the element.
 * @param {string} [left='inherit] -
 *     Left positionning of the element.
 * @param {string} [right='inherit] -
 *     Right positionning of the element
 * @return {ReactElement}
 */
const HiddenDropArea = styled(AbsoluteDiv)`
    background-color: rgba(255, 0, 0, 0.);
`;


/**
 * A colored div positionned absolutely.
 *
 * @param {string} [width='inherit'] -
 *     Width of the element.
 * @param {string} [left='inherit] -
 *     Left positionning of the element.
 * @param {string} [right='inherit] -
 *     Right positionning of the element
 * @return {ReactElement}
 */
const HoverArea = styled(AbsoluteDiv)`
    right: 0;
    background-color: rgba(0, 255, 0, 0.2);
`;


/**
 * A drop area element used to drop a file into the Panes. The behavior changes
 * depending of the length of panes. If length < 3 the drop area is divide into
 * three areas: 'left', 'central', 'right' otherwise only the central area is
 * rendered.
 */
class DropArea extends React.Component {
    state = {}
    handleLeftDragOver = (event) => {
        // To prevent launching action when we are not in the dropping mode
        if (!this.props.allowDrop) return;

        event.preventDefault();
        this.setState({
            overredPanel: 'left',
        });
        this.props.leftDragOver();
    }

    handleCenterDragOver = (event) => {
        // To prevent launching action when we are not in the dropping mode
        if (!this.props.allowDrop) return;

        event.preventDefault();
        this.setState({
            overredPanel: 'central',
        });
        this.props.centerDragOver();
    }

    handleRightDragOver = (event) => {
        // To prevent launching action when we are not in the dropping mode
        if (!this.props.allowDrop) return;

        event.preventDefault();
        this.setState({
            overredPanel: 'right',
        });
        this.props.rightDragOver();
    }

    handleDragOut = (event) => {
        // To prevent launching action when we are not in the dropping mode
        if (!this.props.allowDrop) return;
        this.setState({
            overredPanel: undefined,
        });

        event.preventDefault();
        this.props.dragOut();
    }

    handleDrop = (event) => {
        // To prevent launching action when we are not in the dropping mode
        if (!this.props.allowDrop) return;
        this.setState({
            overredPanel: undefined,
        });

        event.preventDefault();
        this.props.drop();
    }

    handleDropIntoNewPane = (event) => {
        // To prevent launching action when we are not in the dropping mode
        if (!this.props.allowDrop) return;
        this.setState({
            overredPanel: undefined,
        });

        event.preventDefault();
        this.props.dropInNewPane();
    }

    render() {
        const {allowDrop, length} = this.props;
        const {overredPanel} = this.state;

        return allowDrop && (length < 3 ? (
            <Wrapper>
                {overredPanel === 'left' && (
                    <HoverArea left="0" width="200px" />
                )}
                {overredPanel === 'central' && (
                    <HoverArea left="0" width="100%" />
                )}
                {overredPanel === 'right' && (
                    <HoverArea right="0" width="200px" />
                )}
                <HiddenDropArea
                    left="0"
                    width="15%"
                    onMouseOver={this.handleLeftDragOver}
                    onMouseOut={this.handleDragOut}
                    onMouseUp={this.handleDropIntoNewPane}
                />
                <HiddenDropArea
                    left="15%"
                    width="70%"
                    onMouseOver={this.handleCenterDragOver}
                    onMouseOut={this.handleDragOut}
                    onMouseUp={this.handleDrop}
                />
                <HiddenDropArea
                    left="85%"
                    width="15%"
                    onMouseOver={this.handleRightDragOver}
                    onMouseOut={this.handleDragOut}
                    onMouseUp={this.handleDropIntoNewPane}
                />
            </Wrapper>
        ) : (
            <Wrapper>
                {overredPanel === 'central' && (
                    <HoverArea left="0" width="100%" />
                )}
                <HiddenDropArea
                    left="0"
                    width="100%"
                    onMouseOver={this.handleCenterDragOver}
                    onMouseOut={this.handleDragOut}
                    onMouseUp={this.handleDrop}
                />
            </Wrapper>
        ));
    }
}

DropArea.propTypes = {
    allowDrop: PropTypes.bool.isRequired,
    length: PropTypes.number.isRequired,

    leftDragOver: PropTypes.func.isRequired,
    centerDragOver: PropTypes.func.isRequired,
    rightDragOver: PropTypes.func.isRequired,

    dragOut: PropTypes.func.isRequired,
    drop: PropTypes.func.isRequired,
    dropInNewPane: PropTypes.func.isRequired,
};


const mapStateToProps = (state, {paneId}) => ({
    allowDrop: dragActive(state),
    length: getPanesLength(state),
    overredPanel: getOverredPanel(state),
    _moveData: getMoveData(state),
    _moveIntoNewPaneData: getMoveIntoNewPaneData(state),
    _paneIndex: getPaneIndex(state, {paneId}),
});


const mapDispatchToProps = dispatch => bindActionCreators({
    dragOut: () => actions.tab.dragOut(),
    _move: actions.tab.move,
    _moveIntoNewPane: actions.tab.moveIntoNewPane,
    _dragOver: actions.tab.dragOver,
}, dispatch);


const mergeProps = (
    {_moveData, _moveIntoNewPaneData, _paneIndex, ...stateProps},
    {_move, _moveIntoNewPane, _dragOver, ...dispatchProps},
    {paneId},
) => ({
    ...stateProps,
    ...dispatchProps,

    leftDragOver: () => _dragOver({
        paneIndex: _paneIndex,
    }),
    centerDragOver: () => _dragOver({
        paneId,
    }),
    rightDragOver: () => _dragOver({
        paneIndex: _paneIndex + 1,
    }),

    drop: () => _move(_moveData),
    dropInNewPane: () => _moveIntoNewPane(_moveIntoNewPaneData),
});


export default connect(
    mapStateToProps, mapDispatchToProps, mergeProps
)(onlyUpdateForKeys([
    'allowDrop', 'length', 'drop', 'dropInNewPane',
])(DropArea));

