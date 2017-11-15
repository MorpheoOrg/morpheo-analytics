import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'react-emotion';
import {onlyUpdateForKeys} from 'recompose';

import actions from '../actions';
import TabTitle from './TabTitle';
import Space from './Space';


const Container = styled.nav`
    flex-grow: 1;
    width: 100%;
`;

const Ul = styled.ul`
    display: flex;
    margin: 0;
    padding: 0 0 0 0;
    list-style-type: none;
    background-color: #f1f1f2;
`;

class TabNavigation extends React.Component {
    state = {
        overredTab: null,
    };

    // draggedTab need to live in highest parent, because panes need to know it
    handleTabDragStart = (id, width) => {
        // store dragged tab, no state, no render
        const draggedTab = {
            id,
            groupId: this.props.id,
            width,
        };
        this.props.onTabDragStart(draggedTab);
    };

    handleTabDragEnd = () => {
        // reset draggedTab
        const {onTabDragEnd} = this.props;
        onTabDragEnd();
    };

    getTranslation = (tabId) => {

        const {tabs, draggedTab, id} = this.props;
        // we know the draggedTab, the overredTab, the current Tab

        // if in dragged mode, calculate
        if (!!draggedTab && this.state.overredTab !== null) { // null different from undefined
            // retrieve index
            const overredTabIndex = tabs.findIndex(o => o.id === this.state.overredTab);
            const currentTabIndex = tabs.findIndex(o => o.id === tabId);
            const draggedTabIndex = tabs.findIndex(o => o.id === draggedTab.id);

            // same group
            if (draggedTab.groupId === id) {
                if (overredTabIndex !== -1 && (currentTabIndex >= overredTabIndex && currentTabIndex < draggedTabIndex)) {
                    return draggedTab.width;
                }
                else if ((currentTabIndex <= overredTabIndex || overredTabIndex === -1) && currentTabIndex > draggedTabIndex) {
                    return -draggedTab.width;
                }
            }
            // to another group
            else {
                if (overredTabIndex !== -1 && currentTabIndex >= overredTabIndex) {
                    return draggedTab.width;
                }
            }
        }

        return 0;
    };

    handleMouseDown = (id) => {
        if (this.props.selected !== id) {
            this.props.selectTab({
                tabId: id,
                paneId: this.props.id,
            });
        }
    };

    handleTabClose = (id) => {
        this.props.closeTab({
            tabId: id,
            paneId: this.props.id,
        });
    };

    handleTabDragOver = (id) => {
        const {draggedTab} = this.props;

        if (draggedTab) {
            // need to translate all tabs following tab overred, multi render
            if (id !== draggedTab.id) {
                if (id || this.props.id !== draggedTab.groupId) { // do not trigger render if undefined and same group
                    this.setState({overredTab: id});
                }
            }
            else if (this.state.overredTab !== null) {
                this.setState({overredTab: null});
            }
        }
    };

    handleTabDragOut = (id) => {
        const {draggedTab} = this.props;
        // need to reset position if dragged out
        if (draggedTab && id !== draggedTab.id) {
            this.setState({overredTab: undefined});
        }
    };

    handleTabDrop = (toTabId) => {
        const {id, moveTab, draggedTab} = this.props;

        // render
        this.setState({overredTab: null});

        // prevent dragged = null, and dropped = draggedTab.id
        // only trigger moveTab if toTabId is different
        if (draggedTab && draggedTab.id !== toTabId) {
            moveTab({
                paneIdFrom: draggedTab.groupId,
                tabId: draggedTab.id,
                paneIdTo: id,
                tabIndex: toTabId,
            });
        }
    };

    render() {
        const {tabs, draggedTab} = this.props;
        return (
            <Container>
                <Ul>
                    {tabs.map(({key, id, title, selected}, index) => (
                        <TabTitle
                            key={key}
                            id={id}
                            title={title}
                            selected={selected}
                            translation={this.getTranslation(id)}

                            onClose={this.handleTabClose}
                            onDragStart={this.handleTabDragStart}
                            onDragOver={this.handleTabDragOver}
                            onDragOut={this.handleTabDragOut}
                            onDragEnd={this.handleTabDragEnd}
                            onDrop={this.handleTabDrop}
                            onMouseDown={this.handleMouseDown}

                            draggedTab={draggedTab}
                        />
                    ))}
                    <Space
                        onMouseOver={this.handleTabDragOver}
                        onMouseOut={this.handleTabDragOut}
                        onMouseUp={this.handleTabDrop}
                    />
                </Ul>
            </Container>
        );
    }
}

TabNavigation.propTypes = {
    id: PropTypes.string.isRequired,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string,
            id: PropTypes.string,
            title: PropTypes.string,
            selected: PropTypes.bool,
            type: PropTypes.string,
        }),
    ).isRequired,

    draggedTab: PropTypes.shape({}),

    closeTab: PropTypes.func.isRequired,
    moveTab: PropTypes.func.isRequired,
    selectTab: PropTypes.func.isRequired,

};

TabNavigation.defaultProps = {
    draggedTab: null,
};

const mapStateToProps = (state, ownProps) => ({...ownProps});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    closeTab: actions.tab.remove,
    selectTab: actions.tab.setActive,
    moveTab: actions.tab.move,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([
    'draggedTab', 'tabs', 'selected'
])(TabNavigation));
