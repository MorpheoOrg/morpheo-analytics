import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'emotion/react';

import actions from '../../actions/editor';
import TabTitle from './TabTitle';
import Space from './Space';

const Container = styled.nav`
    flex-grow: 1;
    width: 100%;
`;

const Ul = styled.ul`
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;
    background-color: #f1f1f2;
`;

class TabNavigation extends React.Component {
    state = {
        indexTabOver: undefined,
    };

    // Not sure we don't need it ????
    // componentWillUpdate() {
    //     console.log('hey');
    //     this.removeIndexTabOver();
    // }

    getTranslation = (id) => {
        console.log(id);
        const {indexTabOver} = this.state;
        const {droppableTab} = this.props;
        if (!droppableTab || (indexTabOver === undefined)) {
            return 0;
        }

        const {groupId, tabId: indexTabDragged, width} = droppableTab;
        // Add the rule for inner-translation
        if (groupId === this.props.id) {
            //console.log('tabOver', indexTabOver);
            return indexTabOver < indexTabDragged ?
                ((indexTabOver <= id) && (id < indexTabDragged) ? width : 0) :
                ((indexTabDragged < id) && (id <= indexTabOver) ? -width : 0);
        }

        return this.state.indexTabOver <= id ? width : 0;
    };

    handleMouseDown = id => {
        this.props.selectTab({
            selected: id,
            id: this.props.id,
        });
        this.setState({indexTabOver: id});
    };

    handleTabClose = id => {
        this.props.closeTab({
            tabId: id,
            groupId: this.props.id,
        });
    };

    handleTabDragStart = (tabId, width) => {
        // Add a width on the state
        this.props.onTabDragStart({
            tabId,
            groupId: this.props.id,
            width,
        });
    };

    handleTabDragOver = id => {
        if (this.props.droppableTab) {
            this.setState({
                indexTabOver: id,
            });
        }
    };

    handleTabDragOut = (index) => {
        console.log('Tab Drag Out');
        this.removeIndexTabOver();
    };

    handleTabDragEnd = (index) => {
        this.props.onTabDragEnd();
        this.setState({
            indexTabOver: undefined,
        });
    };

    handleTabDrop = toTabId => {
        const {droppableTab, id, moveTab} = this.props;

        if (droppableTab && droppableTab.tabId !== toTabId) {
            moveTab({
                fromGroupId: droppableTab.groupId,
                fromTabId: droppableTab.tabId,
                toGroupId: id,
                toTabId,
            });
        }
    };

    removeIndexTabOver = () => {
        if (this.state.indexTabOver !== undefined) {
            this.setState({
                indexTabOver: Infinity,
            });
            //console.log(this.state);
        }
    };

    render() {
        const {droppableTab, tabs, id, selected} = this.props;

        return (<Container>
            <Ul>
                {tabs.map(({id, value}) => (
                    <TabTitle
                        key={`title-${this.props.id}-${id}`}
                        id={id}
                        value={value}
                        active={selected === id}
                        translation={this.getTranslation(id)}

                        onClose={this.handleTabClose}
                        onDragStart={this.handleTabDragStart}
                        onDragOver={this.handleTabDragOver}
                        onDragOut={this.handleTabDragOut}
                        onDragEnd={this.handleTabDragEnd}
                        onDrop={this.handleTabDrop}
                        onMouseDown={this.handleMouseDown}
                    />
                ))}
                <Space
                    droppableTab={droppableTab}
                    length={tabs.length}
                    id={id}
                    onMouseOver={this.handleTabDragOver}
                    onMouseOut={this.handleTabDragOut}
                    onMouseUp={this.handleTabDrop}
                />
            </Ul>
        </Container>);
    }
}

TabNavigation.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            tabKey: PropTypes.number,
            value: PropTypes.string,
        }),
    ).isRequired,
    droppableTab: PropTypes.shape({}),
    id: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,

    closeTab: PropTypes.func.isRequired,
    moveTab: PropTypes.func.isRequired,
    onTabDragStart: PropTypes.func,
    onTabDragEnd: PropTypes.func,
    selectTab: PropTypes.func.isRequired,
};

const noop = () => {
};

TabNavigation.defaultProps = {
    droppableTab: undefined,

    onTabDragStart: noop,
    onTabDragEnd: noop,
};

const mapStateToProps = (state, ownProps) => ({...ownProps});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    closeTab: actions.closeTab,
    selectTab: actions.selectTab,
    moveTab: actions.moveTab,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigation);
