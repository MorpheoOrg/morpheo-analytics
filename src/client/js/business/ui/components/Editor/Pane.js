import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'emotion/react';

import TabNavigation from './TabNavigation';

const Container = styled.div`
    flex-grow: 1;
    border-right: 1px solid #ccc!important;
`;

class Pane extends React.Component {
    state = {
        internalDrag: false,
    };

    render() {
        const {selectedIndex, tabs} = this.props;

        return <Container>
            <TabNavigation
                droppableTab={this.props.droppableTab}
                selectedIndex={this.props.selectedIndex}
                groupIndex={this.props.groupIndex}
                onTabDragStart={this.props.onTabDragStart}
                onTabDragEnd={this.props.onTabDragEnd}
                tabs={tabs}
            />
            {tabs.map(({tabKey, value}, index) => index === selectedIndex ?
                <div key={tabKey}>
                    tab: {selectedIndex}, value: {value}
                </div> : null
            )}
        </Container>;
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
};

Pane.defaultProps = {
    droppableTab: undefined,
};

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
});


//TODO : add onlyUpdateForKeys
export default connect(mapStateToProps)(Pane);
