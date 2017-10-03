import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {css} from 'emotion';

import actions from '../actions/editor';
import Pane from './Pane';

let valueToRemove = 0;

class Editor extends React.Component {
    state = {
        droppableTab: undefined,
    }

    handleTabDragStart = (tab) => {
        // Activate the droppable mode
        this.setState({
            droppableTab: tab,
        });
    }

    handleTabDragEnd = () => {
        // Deactivate the droppable mode
        this.setState({
            droppableTab: undefined,
        });
    }

    // Next functions are provided just for test the component
    removeEditor = key => (event) => {
        event.preventDefault();
    }

    addGroup = (event) => {
        event.preventDefault();
        this.props.addGroup(1, 'Hello');
    }

    addTab = (event) => {
        event.preventDefault();
        valueToRemove += 1;
        this.props.addTab(1, 1, `test${valueToRemove}`);
    }

    moveTab = (event) => {
        event.preventDefault();
        this.props.moveTab(0, 0, 1, 0);
    }

    style = css`
        width: 100%;
        display: flex;
    `;

    renderPanes = () => this.props.space.map(
        ({key, tabs, selectedIndex}, index) => (
            <Pane
                key={key}
                groupIndex={index}
                tabs={tabs}
                selectedIndex={selectedIndex}
                droppableTab={this.state.droppableTab}

                onTabDragStart={this.handleTabDragStart}
                onTabDragEnd={this.handleTabDragEnd}
            />
        ),
    );

    render() {
        console.log('editor state:', this.state.droppableTab);
        return (<div css={this.style}>
            <button onClick={this.addGroup}>+</button>
            <button onClick={this.addTab}>+</button>
            <button onClick={this.moveTab}> &gt; </button>
            {this.renderPanes()}
        </div>);
    }
}

Editor.propTypes = {
    space: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.number,
            tabs: PropTypes.arrayOf(
                PropTypes.shape({
                    tabKey: PropTypes.number,
                    value: PropTypes.string,
                }),
            ),
            selectedIndex: PropTypes.number,
        })).isRequired,

    addGroup: PropTypes.func.isRequired,
    addTab: PropTypes.func.isRequired,
    moveTab: PropTypes.func.isRequired,
};

const mapStateToProps = ({parameters}, ownProps) => ({
    ...ownProps,
    space: parameters.editor,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addGroup: (groupIndex, value) => actions.addGroup({groupIndex, value}),
    addTab: (groupIndex, tabIndex, value) => actions.addTab(
        {groupIndex, tabIndex, value}),
    moveTab: (fromIndex, fromTabIndex, toIndex, toTabIndex) =>
        actions.moveTab({fromIndex, fromTabIndex, toIndex, toTabIndex}),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
