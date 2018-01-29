/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import styled from 'react-emotion';

import actions from '../actions';
import DropArea from './DropArea';
import TabContent from '../../../../components/TabContent';
import TabHeader from '../../../../components/TabHeader';
import TabTitle from '../../../../components/TabTitle';
import {dragActive, getMoveData, getPane} from '../selectors';


/**
 * Main Container of the component
 */
const MainContainer = styled.div`
    /* width is necessary to adapt the size of flex */
    width: 0;
    flex: 1 1 auto;
    /*overflow-y: auto;*/
    border-right: 1px solid #ccc!important;
    position: relative;

    display: flex;
    flex-direction: column;
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
    position: relative;

    display: flex;
    flex-direction: column;
    flex-grow: 1;

    /* Need to do that to be sure height is computed correctly. */
    height: 0;
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
        const {
            activeTab, paneId, renderers, setPaneActive, updateProps
        } = this.props;
        const {contentId, contentType, ...contentProps} = activeTab;
        return (
            <ContentContainer
                onClick={setPaneActive}
            >
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
    renderers: PropTypes.objectOf(PropTypes.shape({
        content: PropTypes.func.isRequired,
        title: PropTypes.func.isRequired,
    })).isRequired,
    tabs: PropTypes.arrayOf(PropTypes.shape({
        active: PropTypes.bool.isRequired,
        contentType: PropTypes.string.isRequired,
        contentId: PropTypes.string.isRequired,
        tabId: PropTypes.string.isRequired,
        xTranslation: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
    })).isRequired,

    /** Set the tab to active (for editor interactions) */
    setPaneActive: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    dragStart: PropTypes.func.isRequired,
    dragOut: PropTypes.func.isRequired,
    dragOver: PropTypes.func.isRequired,
    dragEnd: PropTypes.func.isRequired,
    drop: PropTypes.func.isRequired,
    updateProps: PropTypes.func.isRequired,
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
    _setTabActive: actions.tab.setActive,
    _move: actions.tab.move,
    _updateTabProps: actions.tab.updateProps,
}, dispatch);


const mergeProps = (
    {_moveData, activeTab, ...stateProps},
    {_move, _setTabActive, _updateTabProps, ...dispatchProps},
    ownProps,
) => ({
    activeTab,
    ...ownProps,
    ...stateProps,
    ...dispatchProps,

    drop: () => _move(_moveData),
    updateProps: data => _updateTabProps({
        tabId: activeTab.tabId,
        props: data
    }),
    // set active a tab also set pane to active
    setPaneActive: () => _setTabActive({
        paneId: ownProps.paneId,
        tabId: activeTab.tabId,
    }),
});

export default connect(
    mapStateToProps, mapDispatchToProps, mergeProps
)(onlyUpdateForKeys([
    'activeTab', 'tabs', 'allowDrop',
])(Pane));
