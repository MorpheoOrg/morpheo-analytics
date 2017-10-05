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
        const {selected, tabs, droppableTab, id, tab, onTabDragStart, onTabDragEnd} = this.props;

        return <Container>
            <TabNavigation
                droppableTab={droppableTab}
                selected={selected}
                id={id}
                onTabDragStart={onTabDragStart}
                onTabDragEnd={onTabDragEnd}
                tabs={tabs}
            />
            {tab && <div key={`content-${id}`}>
                tab: {selected}, value: {tab.value}
            </div>
            }
        </Container>;
    }
}

// Pane
// droppable: activate the droppable mode

Pane.propTypes = {
    droppableTab: PropTypes.shape({}),
    id: PropTypes.string.isRequired,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            value: PropTypes.string,
        }),
    ).isRequired,
    selected: PropTypes.string.isRequired,
};

Pane.defaultProps = {
    droppableTab: undefined,
};

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    tab: ownProps.tabs.find(tab => tab.id === ownProps.selected),
});


//TODO : add onlyUpdateForKeys
export default connect(mapStateToProps)(Pane);
