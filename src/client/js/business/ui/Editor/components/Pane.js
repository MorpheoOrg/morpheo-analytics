import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'react-emotion';

import TabNavigation from './TabNavigation';
import ProblemDetail from '../../../models/problem/components/detail/ProblemDetail';


const Container = styled.div`
    flex-grow: 1;
    border-right: 1px solid #ccc!important;
`;

const Pane = ({
    id, selectedTab, tabs, draggedTab,
    onTabDragStart, onTabDragEnd}) => {
    const {contentId} = selectedTab;
    return (<Container>
        <TabNavigation
            id={id}
            tabs={tabs}
            draggedTab={draggedTab}
            onTabDragStart={onTabDragStart}
            onTabDragEnd={onTabDragEnd}
        />
        <ProblemDetail
            problemId={contentId}
            {...selectedTab}
        />
    </Container>);
}

Pane.propTypes = {
    id: PropTypes.string.isRequired,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            value: PropTypes.string,
        }),
    ).isRequired,
    selectedTab: PropTypes.shape({
        contentId: PropTypes.string.isRequired,
        contentType: PropTypes.string.isRequired,
        tabId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    draggedTab: PropTypes.shape({}),
};

Pane.defaultProps = {
    draggedTab: undefined,
};

// TODO: put in selector
const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
});


//TODO : add onlyUpdateForKeys
export default connect(mapStateToProps)(Pane);
