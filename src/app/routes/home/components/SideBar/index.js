import React from 'react';
import {PropTypes} from 'prop-types';
import styled from 'react-emotion';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {onlyUpdateForKeys} from 'recompose';

import actions from './actions';
import {menuContent} from './iconDefinition';
import {getVisible} from './selector';
import ResizableContainer from '../../../../components/ResizableContainer';
import FlatButton from '../../../../components/FlatButton';
import ChevronLeft from '../../../../components/icons/ChevronLeft';


const Header = styled.div`
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 30px;

    & h2 {
        font-weight: 400;
    }
`;


const FlexContainer = styled.div`
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
`;


const HideButton = props => (
    <FlatButton {...props} >
        <ChevronLeft />
    </FlatButton>
);


class SideBar extends React.Component {
    close = () => {
        this.props.setStatus('closed');
    };

    render() {
        const {
            resize, selectedIndex, visible, width,
        } = this.props;

        return (visible ?
            <ResizableContainer
                with={width}
                onResize={resize}
            >
                <Header>
                    <h2>{menuContent[selectedIndex].name}</h2>
                    <HideButton onClick={this.close} />
                </Header>
                <FlexContainer>
                    {menuContent[selectedIndex].content}
                </FlexContainer>
            </ResizableContainer>
            : null
        );
    }
}

SideBar.propTypes = {
    selectedIndex: PropTypes.number.isRequired,
    visible: PropTypes.bool,
    width: PropTypes.number,

    setStatus: PropTypes.func.isRequired,
    resize: PropTypes.func.isRequired,
};

SideBar.defaultProps = {
    menuContent: [],
    children: null,
    visible: false,
    width: 400,
};


const mapStateToProps = (state, ownProps) => ({
    selectedIndex: state.settings.sideBar.selectedIndex,
    width: state.settings.sideBar.width,
    status: state.settings.sideBar.status,
    duration: state.settings.sideBar.duration,
    visible: getVisible(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setStatus: actions.setStatus,
    resize: actions.resize,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([
    'selectedIndex', 'visible', 'status',
])(SideBar));
