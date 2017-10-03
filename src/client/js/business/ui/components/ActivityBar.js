/* eslint react/no-array-index-key: 0 */

import {css} from 'emotion';
import styled from 'emotion/react';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onlyUpdateForKeys} from 'recompose';
import {bindActionCreators} from 'redux';

import actions from '../actions/sideBar';


const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;

    margin: 20px 0 20px 0;
    & button {
        margin: 5px;
        height: 42px;
        width: 42px;
    }
`;

const MenuButton = styled.button`
    border: none;
    background-color: inherit;
    color: #98999F;

    &:hover{
        color: #45464B;
    }

    .active{
        color: #45464B;
    }

    &:focus{
        outline: 0;
    }
`;

class ActivityBar extends React.Component {
    toogleSideBarElement = index => (event) => {
        this.props.toogleIndex(index);
    }

    openModalElement = index => (event) => {
        // Add function to open element
    }

    style = css`{
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #d2d2d6;
        justify-content: space-between;
    }`;

    render() {
        const {selectedIndex} = this.props;
        return (<div css={this.style}>
            <ButtonGroup>
                {this.props.menuContent.map(({icon}, index) => (<MenuButton
                    key={index}
                    className={selectedIndex === index ? 'active' : ''}
                    onClick={this.toogleSideBarElement(index)}
                >
                    {icon}
                </MenuButton>))}
            </ButtonGroup>

            <ButtonGroup>
                {this.props.modalContent.map(({icon}, index) => (<MenuButton
                    key={index}
                    onClick={this.openModalElement(index)}
                >
                    {icon}
                </MenuButton>))}
            </ButtonGroup>
        </div>);
    }
}


ActivityBar.propTypes = {
    menuContent: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            icon: PropTypes.element,
            content: PropTypes.element,
        }),
    ).isRequired,
    modalContent: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            icon: PropTypes.element,
            content: PropTypes.element,
        }),
    ).isRequired,
    selectedIndex: PropTypes.number.isRequired,

    toogleIndex: PropTypes.func.isRequired,
};

const mapStateToProps = ({parameters}) => ({
    selectedIndex: parameters.sideBar.selectedIndex,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toogleIndex: selectedIndex => actions.toogleIndex({
        selectedIndex,
    }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
    onlyUpdateForKeys(['selectedIndex'])(ActivityBar));
