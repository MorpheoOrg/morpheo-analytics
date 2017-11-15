import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {onlyUpdateForKeys} from 'recompose';
import styled from 'react-emotion';

import {getPanes} from '../selector';
// import actions from './actions';
import Pane from './components/Pane';


const Debug = styled.div`
    position: absolute;
    z-index: 1;
    bottom: 0;
    right: 0;
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
    // store dragged table which is droppable in state
    state = {
        draggedTab: null,
    };

    handleTabDragStart = (draggedTab) => {
        // Activate the droppable mode
        this.setState({draggedTab});
    };

    handleTabDragEnd = () => {
        // Deactivate the droppable mode
        this.setState({draggedTab: null});
    };

    // Next functions are provided just for test the component
    removeEditor = key => (event) => {
        event.preventDefault();
    };


    // DEBUG
    // addGroup = (event) => {
    //     event.preventDefault();
    //     if (this.props.panes.length < 3) {
    //         this.props.addGroup({value: 'Tab'});
    //     }
    // };

    // addTab = (event) => {
    //     event.preventDefault();
    //     this.props.addTab({
    //         groupId: this.props.panes[0].id,
    //         value: 'Tab'
    //     });
    // };

    // moveTab = (event) => {
    //     event.preventDefault();
    //     this.props.moveTab({
    //         fromGroupId: this.props.panes[0].id,
    //         fromTabId: this.props.panes[0].tabs[0].id,
    //         toGroupId: this.props.panes[1].id,
    //         toTabId: this.props.panes[1].tabs[0].id,
    //     });
    // };

    render() {
        const {panes} = this.props;
        console.log(panes);
        return (
            <Container>
                {/* <Debug>
                    <Button onClick={this.addGroup}>add Group</Button>
                    <Button onClick={this.addTab}>add Tab to First Group</Button>
                    <Button onClick={this.moveTab}>move Tab 0 from group 0 to group 1 at index 0</Button>
                </Debug> */}
                {panes.map(({key, id, tabs, selectedTab}) => (
                    <Pane
                        key={key}
                        id={id}
                        tabs={tabs}
                        selectedTab={selectedTab}
                        draggedTab={this.state.draggedTab}
                        droppedTab={this.state.droppedTab}
                        onTabDragStart={this.handleTabDragStart}
                        onTabDragEnd={this.handleTabDragEnd}
                    />
                ))}
            </Container>
        );
    }
}

Editor.propTypes = {
    panes: PropTypes.arrayOf(PropTypes.shape({
        tabs: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string,
        })),
        selected: PropTypes.string,
    })).isRequired,

    // addGroup: PropTypes.func.isRequired,
    // addTab: PropTypes.func.isRequired,
    // moveTab: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    panes: getPanes(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    // addGroup: ({value}) => actions.tab.add({
    //     value,
    // }),
    // addTab: ({groupId, value}) => actions.tab.add({
    //     tabId: uuidv4(),
    //     groupId,
    //     value,
    // }),
    // moveTab: actions.tab.move,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([
    'panes',
])(Editor));
