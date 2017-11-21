/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import styled from 'react-emotion';

import actions from '../actions';
import {dragActive, getMoveData, getPane} from '../selector';
import TabTitle from '../../../common/components/TabHeader';
import DropArea from './DropArea';


/**
 * Main Container of the component
 */
const MainContainer = styled.div`
    flex-grow: 1;
    border-right: 1px solid #ccc!important;
    position: relative;
`;

const TabNav = styled.nav`
    flex-grow: 1;
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
    background-color: rgba(255, 0, 0, 0.2);
    border: 0px solid yellow';
`;

const ContentContainer = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
`;

class Pane extends React.Component {
    handleDragStart = (tabId, tabIndex) => (event) => {
        event.preventDefault();
        console.log('hello');
        // We set some information about the tab we drag
        this.props.dragStart({
            tabIndex,
            tabId,
            width: event.currentTarget.offsetWidth,
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
        const {allowDrop, tabs, dragEnd} = this.props;
        return (
            <TabNav>
                <TabUl>
                    {/* Render each tabTitle */}
                    {tabs.map((
                        {active, tabId, title, xTranslation}, tabIndex
                    ) => (
                        <TabTitle
                            key={tabId}
                            tabId={tabId}
                            active={active}
                            onDragStart={this.handleDragStart(tabId, tabIndex)}
                            onDragOver={this.handleDragOver(tabId, tabIndex)}
                            onDragOut={this.handleDragOut(tabId, tabIndex)}
                            onDragEnd={dragEnd}
                            onDrop={this.handleDrop(tabId, tabIndex)}
                            allowDrop={allowDrop}
                            xTranslation={xTranslation}
                        >
                            {allowDrop ? 'Y' : 'N'} {tabId} {title}
                        </TabTitle>
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

    render() {
        console.log('Render Pane');
        return (
            <MainContainer>
                {this.renderTabNavigation()}
                <ContentContainer>
                    <DropArea paneId={this.props.paneId} lenght={1} />
                    Hello
                </ContentContainer>
            </MainContainer>
        );
    }
}

Pane.propTypes = {
    allowDrop: PropTypes.bool,
    tabs: PropTypes.arrayOf(PropTypes.shape({
        active: PropTypes.bool.isRequired,
        contentType: PropTypes.string.isRequired,
        contentId: PropTypes.string.isRequired,
        tabId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    })).isRequired,
    activeTabId: PropTypes.string.isRequired,

    dragStart: PropTypes.func.isRequired,
    dragOut: PropTypes.func.isRequired,
    dragOver: PropTypes.func.isRequired,
    dragEnd: PropTypes.func.isRequired,
    drop: PropTypes.func.isRequired,
};

Pane.defaultProps = {
    allowDrop: false,
};

const mapStateToProps = (state, {paneId, children}) => ({
    ...getPane(state, {paneId}),
    allowDrop: dragActive(state),
    // Get data to define the drop function
    _moveData: getMoveData(state),
});

const mapDispatchToProps = (dispatch, {paneId}) => bindActionCreators({
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
}, dispatch);


const mergeProps = (
    {_moveData, ...stateProps}, {_move, ...dispatchProps}, ownProps,
) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    drop: () => _move(_moveData),
});

export default connect(
    mapStateToProps, mapDispatchToProps, mergeProps
)(onlyUpdateForKeys([
    'activeTabId', 'tabs', 'allowDrop',
])(Pane));
