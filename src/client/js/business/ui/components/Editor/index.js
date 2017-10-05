import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'emotion/react';
import uuidv4 from 'uuid/v4';

import actions from '../../actions/editor';
import Pane from './Pane';

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
        // TODO change with uuid from sideBar
        const tabId = uuidv4();
        if (this.props.panes.length < 3) {
            this.props.addGroup({id: tabId, value: 'Tab'});
        }
    };

    addTab = (event) => {
        event.preventDefault();
        console.log(this.props.panes);
        // TODO change with uuid from sideBar
        const tabId = uuidv4();
        this.props.addTab({
            groupId: this.props.panes[0].id,
            tabId: tabId,
            value: 'Tab'
        });
    };

    moveTab = (event) => {
        event.preventDefault();
        this.props.moveTab({
            fromGroupId: this.props.panes[0].id,
            fromTabId: this.props.panes[0].tabs[0].id,
            toGroupId: this.props.panes[1].id,
            toTabId: this.props.panes[1].tabs[0].id
        });
    };

    render() {
        const {panes} = this.props;

        //console.log('editor state:', this.state.droppableTab);

        return (<Container>
            <Debug>
                <Button onClick={this.addGroup}>add Group</Button>
                <Button onClick={this.addTab}>add Tab to First Group</Button>
                <Button onClick={this.moveTab}>move Tab 0 from group 0 to group 1 at index 0</Button>
            </Debug>
            {panes.map(({id, tabs, selected}) =>
                <Pane
                    key={id}
                    id={id}
                    tabs={tabs}
                    selected={selected}
                    droppableTab={this.state.droppableTab}
                    onTabDragStart={this.handleTabDragStart}
                    onTabDragEnd={this.handleTabDragEnd}
                />,
            )}
        </Container>);
    }
}

Editor.propTypes = {
    panes: PropTypes.arrayOf(
        PropTypes.shape({
            tabs: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.string,
                }),
            ),
            selected: PropTypes.string,
        })).isRequired,

    addGroup: PropTypes.func.isRequired,
    addTab: PropTypes.func.isRequired,
    moveTab: PropTypes.func.isRequired,
};

const mapStateToProps = ({parameters}, ownProps) => ({
    ...ownProps,
    panes: parameters.editor.panes,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addGroup: actions.addGroup,
    addTab: actions.addTab,
    moveTab: actions.moveTab,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
