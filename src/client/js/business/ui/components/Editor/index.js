import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'emotion/react';

import actions from '../../actions/editor';
import Pane from './Pane';

let valueToRemove = 0;

const Debug = styled.div`
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 5px;
    background-color: rgba(220, 0, 0, 0.4);
`;

const Button = styled.button`
    cursor: pointer;
    margin: 10px;
    padding: 5px;
    background: #eee;
    border: 1px solid #999;
    border-radius: 3px;
`;

const Container = styled.div`
    width: 100%;
    display: flex;
`;

class Editor extends React.Component {
    state = {
        droppableTab: undefined,
    };

    handleTabDragStart = (tab) => {
        // Activate the droppable mode
        this.setState({droppableTab: tab});
    };

    handleTabDragEnd = () => {
        // Deactivate the droppable mode
        this.setState({droppableTab: undefined });
    };

    // Next functions are provided just for test the component
    removeEditor = key => (event) => {
        event.preventDefault();
    };

    addGroup = (event) => {
        event.preventDefault();
        this.props.addGroup({groupIndex: 1, value: 'Hello'});
    };

    addTab = (event) => {
        event.preventDefault();
        valueToRemove += 1;
        this.props.addTab({groupIndex: 1, tabIndex: 1, value: `test${valueToRemove}`});
    };

    moveTab = (event) => {
        event.preventDefault();
        this.props.moveTab({fromIndex: 0, fromTabIndex: 0, toIndex: 1, toTabIndex: 0});
    };

    render() {
        const {space} = this.props;

        console.log('editor state:', this.state.droppableTab);

        return (<Container>
            <Debug>
                <Button onClick={this.addGroup}>add Group</Button>
                <Button onClick={this.addTab}>add Tab</Button>
                <Button onClick={this.moveTab}> move Tab </Button>
            </Debug>
            {space.map(({key, tabs, selectedIndex}, index) =>
                <Pane
                    key={key}
                    groupIndex={index}
                    tabs={tabs}
                    selectedIndex={selectedIndex}
                    droppableTab={this.state.droppableTab}
                    onTabDragStart={this.handleTabDragStart}
                    onTabDragEnd={this.handleTabDragEnd}
                />,
            )}
        </Container>);
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
    addGroup: actions.addGroup,
    addTab: actions.addTab,
    moveTab: actions.moveTab,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
