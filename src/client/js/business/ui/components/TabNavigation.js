import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {css} from 'emotion';

import actions from '../actions/editor';
import Tab from './Tab';


class TabNavigation extends React.Component {
    state = {
        indexTabOver: undefined,
    }

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
    }

    handleMouseDown = tabIndex => () => {
        this.props.selectTab(tabIndex);
        this.setState({
            indexTabOver: tabIndex,
        });
    }

    handleTabDragStart = tabIndex => (event) => {
        // Get the size of the element
        const width = event.target.offsetWidth;
        // Add a width on the state
        this.props.onTabDragStart({
            tabIndex,
            groupIndex: this.props.groupIndex,
            width,
        });
    }

    handleTabDragOver = tabIndex => () => {
        if (this.props.droppableTab) {
            this.setState({
                indexTabOver: tabIndex,
            });
        }
    }

    handleTabDragOut = tabIndex => () => {
        console.log('hello out')
        this.removeIndexTabOver();
    }

    handleTabDragEnd = tabIndex => () => {
        this.props.onTabDragEnd();
        this.setState({
            indexTabOver: undefined,
        });
    }

    handleTabDrop = tabIndex => () => {
        const {droppableTab} = this.props;
        this.props.moveTab(
            droppableTab.groupIndex, droppableTab.tabIndex,
            this.props.groupIndex, tabIndex,
        );
    }

    removeIndexTabOver = () => {
        if (this.state.indexTabOver !== undefined) {
            this.setState({
                indexTabOver: Infinity,
            });
            console.log(this.state);
        }
    }

    style = css`
        flex-grow: 1;
    `;

    render() {
        const {droppableTab, groupIndex, children, selectedIndex} = this.props;
        // Remove 1 if the groupIndex is the one of the droppableTab
        const lastIndex = droppableTab && droppableTab.groupIndex === groupIndex ?
            children.length - 1 : children.length;
        console.log(lastIndex);
        return (<nav><ul>
            {children.map(({tabKey, value}, index) => (
                <Tab
                    key={tabKey}
                    active={selectedIndex === index}
                    translation={this.getTranslation(index)}

                    onMouseDown={this.handleMouseDown(index)}
                    onDragStart={this.handleTabDragStart(index)}
                    onDragOver={this.handleTabDragOver(index)}
                    onDragOut={this.handleTabDragOut(index)}
                    onDragEnd={this.handleTabDragEnd(index)}
                    onDrop={this.handleTabDrop(index)}
                >
                    {value}
                </Tab>
            ))}
            <div
                css={this.style}
                onMouseOver={this.handleTabDragOver(lastIndex)}
                onMouseOut={this.handleTabDragOut(lastIndex)}
                onMouseUp={this.handleTabDrop(lastIndex)}
            />
        </ul></nav>);
    }
}

TabNavigation.propTypes = {
    children: PropTypes.arrayOf(
        PropTypes.shape({
            tabKey: PropTypes.number,
            value: PropTypes.string,
        }),
    ).isRequired,
    droppableTab: PropTypes.shape({}),
    groupIndex: PropTypes.number.isRequired,
    selectedIndex: PropTypes.number.isRequired,

    moveTab: PropTypes.func.isRequired,
    onTabDragStart: PropTypes.func,
    onTabDragEnd: PropTypes.func,
    selectTab: PropTypes.func.isRequired,
};

const noop = () => {};

TabNavigation.defaultProps = {
    droppableTab: undefined,

    onTabDragStart: noop,
    onTabDragEnd: noop,
};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    selectTab: selectedIndex => actions.selectTab({
        selectedIndex,
        groupIndex: ownProps.groupIndex,
    }),
    moveTab: (fromIndex, fromTabIndex, toIndex, toTabIndex) =>
        actions.moveTab({fromIndex, fromTabIndex, toIndex, toTabIndex}),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigation);
