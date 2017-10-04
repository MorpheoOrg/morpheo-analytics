import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'emotion/react';

import actions from '../../actions/editor';
import Tab from './Tab';
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

    getTranslation = (index) => {
        const {indexTabOver} = this.state;
        const {droppableTab} = this.props;
        if (!droppableTab || (indexTabOver === undefined)) {
            return 0;
        }

        const {groupIndex, tabIndex: indexTabDragged, width} = droppableTab;
        // Add the rule for inner-translation
        if (groupIndex === this.props.groupIndex) {
            console.log('tabOver', indexTabOver);
            return indexTabOver < indexTabDragged ?
                ((indexTabOver <= index) && (index < indexTabDragged) ? width : 0) :
                ((indexTabDragged < index) && (index <= indexTabOver) ? -width : 0);
        }

        return this.state.indexTabOver <= index ? width : 0;
    };

    handleMouseDown = tabIndex => {
        this.props.selectTab({
            selectedIndex: tabIndex,
            groupIndex: this.props.groupIndex,
        });
        this.setState({indexTabOver: tabIndex});
    };

    handleTabClose = tabIndex => {
        this.props.closeTab({
            tabIndex,
            groupIndex: this.props.groupIndex,
        });
    };

    handleTabDragStart = (event, tabIndex) => {
        // Get the size of the element
        const width = event.target.offsetWidth;
        // Add a width on the state
        this.props.onTabDragStart({
            tabIndex,
            groupIndex: this.props.groupIndex,
            width,
        });
    };

    handleTabDragOver = tabIndex => {
        if (this.props.droppableTab) {
            this.setState({
                indexTabOver: tabIndex,
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

    handleTabDrop = toTabIndex => {
        const {droppableTab, groupIndex} = this.props;

        this.props.moveTab({
            fromIndex: droppableTab.groupIndex,
            fromTabIndex: droppableTab.tabIndex,
            toIndex: groupIndex,
            toTabIndex,
        });
    };

    removeIndexTabOver = () => {
        if (this.state.indexTabOver !== undefined) {
            this.setState({
                indexTabOver: Infinity,
            });
            console.log(this.state);
        }
    };

    render() {
        const {droppableTab, groupIndex, tabs, selectedIndex} = this.props;

        return (<Container>
            <Ul>
                {tabs.map(({tabKey, value}, index) => (
                    <Tab
                        key={tabKey}
                        index={index}
                        active={selectedIndex === index}
                        translation={this.getTranslation(index)}

                        onClose={this.handleTabClose}
                        onDragStart={this.handleTabDragStart}
                        onDragOver={this.handleTabDragOver}
                        onDragOut={this.handleTabDragOut}
                        onDragEnd={this.handleTabDragEnd}
                        onDrop={this.handleTabDrop}
                        onMouseDown={this.handleMouseDown}
                    >
                        {value}
                    </Tab>
                ))}
                <Space
                    droppableTab={droppableTab}
                    length={tabs.length}
                    groupIndex={groupIndex}
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
    groupIndex: PropTypes.number.isRequired,
    selectedIndex: PropTypes.number.isRequired,

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
