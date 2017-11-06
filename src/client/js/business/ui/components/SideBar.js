/* globals window */

import React from 'react';
import {PropTypes} from 'prop-types';
import styled, {css} from 'react-emotion';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {onlyUpdateForKeys} from 'recompose';
import {ChevronLeft} from 'mdi-material-ui';

import actions from '../actions/sideBar';
import {menuContent} from './iconDefinition';
import {getVisible} from '../selector';
import Dragger from '../../common/components/Dragger';
import ResizableContainer from '../../common/components/ResizableContainer';


const Container = styled.div`
    overflow: hidden;
    margin-left:auto;
    margin-right:auto;
    padding: 20px;
`;

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

const Content = styled.div`
display: flex;
position: relative;
justify-content: space-between;
align-items: center;
`;

const FlatButton = styled.button`
    border: none;
    background-color: inherit;
    color: #98999F;
    right: 0;
    cursor: pointer;
    padding: 0;

    &:hover {
        color: #45464B;
    }

    .active {
        color: #45464B;
    }

    &:focus {
        outline: 0;
    }
`;

class SideBar extends React.Component {
    close = () => {
        this.props.setStatus('closed');
    };

    render() {
        const {selectedIndex, visible} = this.props;

        return (visible ?
            <ResizableContainer

            >
                <Header>
                    <h2>{menuContent[selectedIndex].name}</h2>
                    <FlatButton onClick={this.close}>
                        <ChevronLeft/>
                    </FlatButton>
                </Header>
                <Content>
                    {menuContent[selectedIndex].content}
                </Content>
            </ResizableContainer>
            : null
        );

        // return (visible ? <div className={this.style()}>
        //     {<Container>
        //         <Header>
        //             <h2>{menuContent[selectedIndex].name}</h2>
        //             <FlatButton onClick={this.close}>
        //                 <ChevronLeft/>
        //             </FlatButton>
        //         </Header>
        //         <Content>
        //             {menuContent[selectedIndex].content}
        //         </Content>
        //     </Container>
        //     }
        //     <Dragger onMouseDown={this.onMouseDown}/>
        // </div> : null);
    }
}

SideBar.propTypes = {
    selectedIndex: PropTypes.number.isRequired,
    visible: PropTypes.bool,
    status: PropTypes.string,
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
    ...ownProps,
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
    'selectedIndex', 'visible', 'status'
])(SideBar));
