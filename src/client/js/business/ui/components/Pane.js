/* globals window */
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {css} from 'emotion';

import actions from '../actions/editor';
import Tab from './Tab';
import TabNavigation from './TabNavigation';

class Pane extends React.Component {
    state = {
        internalDrag: false,
    };

    style = css`
        flex-grow: 1;

        & nav {
            width: 100%;
        }

        & nav ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            display: flex;
            background-color: #f1f1f2;
        }

        & nav li {
            float: left;
        }

        & nav li button {
            border: none;
            display: block;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            background-color: #f1f1f2;
        }

        & nav li button:hover {
            background-color: white;
        }

        & nav li button:focus {
            outline: 0;
        }

        & .active {
            background-color: white;
        }
    `

    selectTab = tabIndex => () => {
        this.props.selectTab(tabIndex);
    }

    renderHeader = () => (
        <TabNavigation
            droppableTab={this.props.droppableTab}
            selectedIndex={this.props.selectedIndex}
            groupIndex={this.props.groupIndex}

            onTabDragStart={this.props.onTabDragStart}
            onTabDragEnd={this.props.onTabDragEnd}
        >
            {this.props.tabs}
        </TabNavigation>
    );


    renderContent = () => {
        const {selectedIndex, tabs} = this.props;
        return tabs.map(({tabKey, value}, index) => index === selectedIndex ? (
            <div key={tabKey}>
                hello {selectedIndex} {value}
            </div>
        ) : null);
    }

    render() {
        return (<div css={this.style}>
            {this.renderHeader()}
            {this.renderContent()}
        </div>);
    }
}

// Pane
// droppable: activate the droppable mode

Pane.propTypes = {
    droppableTab: PropTypes.shape({}),
    groupIndex: PropTypes.number.isRequired,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            tabKey: PropTypes.number,
            value: PropTypes.string,
        }),
    ).isRequired,
    selectedIndex: PropTypes.number.isRequired,

    onTabDragStart: PropTypes.func,
    onTabDragEnd: PropTypes.func,
    selectTab: PropTypes.func.isRequired,
};

const noop = () => {};

Pane.defaultProps = {
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
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pane);
