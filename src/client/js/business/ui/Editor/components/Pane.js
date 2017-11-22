/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import styled from 'react-emotion';

import actions from '../actions';
import DropArea from './DropArea';
import TabContent from '../../../common/components/TabContent';
import TabHeader from '../../../common/components/TabHeader';
import TabTitle from '../../../common/components/TabTitle';
import {dragActive, getMoveData, getPane} from '../selector';


/**
 * Main Container of the component
 */
const MainContainer = styled.div`
    flex-grow: 1;
    border-right: 1px solid #ccc!important;
    position: relative;

    display: flex;
    flex-direction: column
`;

const TabNav = styled.nav`
    width: 100%;
`;

const TabUl = styled.ul`
    display: flex;
    margin: 0;
    padding: 0 0 0 0;
    list-style-type: none;
    background-color: #f1f1f2;
`;

const TabHiddenArea = styled.li`
    width: 100%;
    border: 0px solid yellow';
`;

const ContentContainer = styled.div`
    flex-grow: 1;
    position: relative;
`;

class Pane extends React.Component {
    handleClose = (tabId, tabIndex) => (event) => {
        event.preventDefault();
        this.props.close({
            tabId,
        });
    }

    handleDragStart = (tabId, tabIndex) => (event) => {
        event.preventDefault();
        // We set some information about the tab we drag
        this.props.dragStart({
            tabIndex,
            tabId,
            width: event.currentTarget.offsetWidth,
        });
        // We also do an over because event is throw only when mouse move
        this.props.dragOver({
            tabIndex,
            tabId,
        });
    }

    handleDragOver = (tabId, tabIndex) => (event) => {
        // Prevent launching action when we are not in the dropping mode
        if (!this.props.allowDrop) return;

        event.preventDefault();
        this.props.dragOver({
            tabIndex,
            tabId,
        });
    }

    handleDragOut = (tabId, tabIndex) => (event) => {
        // Prevent launching action when we are not in the dropping mode
        if (!this.props.allowDrop) return;

        event.preventDefault();
        this.props.dragOut();
    }

    handleDrop = (tabId, tabIndex) => (event) => {
        // Prevent launching action when we are not in the dropping mode
        if (!this.props.allowDrop) return;

        event.preventDefault();
        this.props.drop();
    }

    /**
     * Render the Tab Navigation.
     *
     * @return {ReactElement}
     */
    renderTabNavigation = () => {
        const {allowDrop, dragEnd, tabs, renderers} = this.props;
        return (
            <TabNav>
                <TabUl>
                    {/* Render each tab title */}
                    {tabs.map((
                        {active, tabId, xTranslation,
                            contentType, title, ...tabProps}, tabIndex
                    ) => (
                        <TabHeader
                            key={tabId}
                            tabId={tabId}
                            active={active}
                            onClose={this.handleClose(tabId, tabIndex)}
                            onDragStart={this.handleDragStart(tabId, tabIndex)}
                            onDragOver={this.handleDragOver(tabId, tabIndex)}
                            onDragOut={this.handleDragOut(tabId, tabIndex)}
                            onDragEnd={dragEnd}
                            onDrop={this.handleDrop(tabId, tabIndex)}
                            allowDrop={allowDrop}
                            xTranslation={xTranslation}
                        >
                            {/** Render the title by using the renderer
                                 corresponding to the `contentType`. */}
                            <TabTitle
                                renderers={renderers}
                                contentType={contentType}
                                title={title}
                                {...tabProps}
                            />
                        </TabHeader>
                    ))}

                    {/* Render an empty zone to drop element to the end */}
                    {allowDrop && <TabHiddenArea
                        onMouseOver={this.handleDragOver()}
                        onMouseOut={this.handleDragOut()}
                        onMouseUp={this.handleDrop()}
                    />}
                </TabUl>
            </TabNav>
        );
    }

    renderTabContent = () => {
        const {paneId, renderers, activeTab, updateProps} = this.props;
        const {contentId, contentType, ...contentProps} = activeTab;
        return (
            <ContentContainer>
                <TabContent
                    renderers={renderers}
                    contentId={contentId}
                    contentType={contentType}
                    updateProps={updateProps}
                    {...contentProps}
                />
                <DropArea
                    paneId={paneId}
                />
            </ContentContainer>
        );
    }

    render() {
        console.log('Render Pane');
        return (
            <MainContainer>
                {this.renderTabNavigation()}
                {this.renderTabContent()}
            </MainContainer>
        );
    }
}

Pane.propTypes = {
    activeTab: PropTypes.shape({
        contentType: PropTypes.string.isRequired,
        contentId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    allowDrop: PropTypes.bool.isRequired,
    paneId: PropTypes.string.isRequired,

    tabs: PropTypes.arrayOf(PropTypes.shape({
        active: PropTypes.bool.isRequired,
        contentType: PropTypes.string.isRequired,
        contentId: PropTypes.string.isRequired,
        tabId: PropTypes.string.isRequired,
        xTranslation: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
    })).isRequired,

    updateProps: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    dragStart: PropTypes.func.isRequired,
    dragOut: PropTypes.func.isRequired,
    dragOver: PropTypes.func.isRequired,
    dragEnd: PropTypes.func.isRequired,
    drop: PropTypes.func.isRequired,
};


const mapStateToProps = (state, {paneId, children}) => ({
    ...getPane(state, {paneId}),
    allowDrop: dragActive(state),
    // Get data to define the drop function
    _moveData: getMoveData(state),
});

const mapDispatchToProps = (dispatch, {paneId}) => bindActionCreators({
    close: ({tabId}) => actions.tab.remove({
        paneId,
        tabId,
    }),
    dragStart: ({tabId, tabIndex, width}) => actions.tab.dragStart({
        paneId,
        tabId,
        tabIndex,
        width,
    }),
    dragOver: ({tabId, tabIndex}) => actions.tab.dragOver({
        paneId,
        tabId,
        tabIndex,
    }),
    dragOut: () => actions.tab.dragOut(),
    dragEnd: () => actions.tab.dragEnd(),
    _move: actions.tab.move,
    _updateTabProps: actions.tab.updateProps,
}, dispatch);


const mergeProps = (
    {_moveData, activeTab, ...stateProps},
    {_move, _updateTabProps, ...dispatchProps},
    ownProps,
) => ({
    activeTab,
    ...ownProps,
    ...stateProps,
    ...dispatchProps,

    updateProps: data => _updateTabProps({
        tabId: activeTab.tabId,
        props: data
    }),
    drop: () => _move(_moveData),
});

export default connect(
    mapStateToProps, mapDispatchToProps, mergeProps
)(onlyUpdateForKeys([
    'activeTab', 'tabs', 'allowDrop',
])(Pane));
