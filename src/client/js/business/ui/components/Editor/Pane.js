import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'emotion/react';

import TabNavigation from './TabNavigation';
import ProblemDetail from '../../../models/problem/components/detail/ProblemDetail';

const Container = styled.div`
    flex-grow: 1;
    border-right: 1px solid #ccc!important;
    overflow: hidden;
`;

const Pane = ({selected, tabs, draggedTab, id, tab, onTabDragStart, onTabDragEnd}) =>
    <Container>
        <TabNavigation
            draggedTab={draggedTab}
            selected={selected}
            id={id}
            onTabDragStart={onTabDragStart}
            onTabDragEnd={onTabDragEnd}
            tabs={tabs}
        />
        {tab && <ProblemDetail
            key={`content-${id}`}
            problemId={tab.id}
        />}
    </Container>;

// Pane

Pane.propTypes = {
    draggedTab: PropTypes.shape({}),
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
    draggedTab: undefined,
};

// TODO: put in selector
const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    tab: ownProps.tabs.find(tab => tab.id === ownProps.selected),
});


//TODO : add onlyUpdateForKeys
export default connect(mapStateToProps)(Pane);
