import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'react-emotion';
import {onlyUpdateForKeys} from 'recompose';

const disabledStyle = css`
    color: #C0C0C8;

    &:hover {
        color: #C0C0C8;
    }

    pointer-events: none;
`;

const FlatButton = styled.button`
    border: none;
    background-color: inherit;
    cursor: pointer;
    color: ${({active}) => active ? '#45464B' : '#98999F'};
    margin: 5px;
    height: 42px;
    width: 42px;

    &:hover {
        color: #45464B;
    }

    &:focus {
        outline: 0;
    }

    ${({disabled}) => disabled ? disabledStyle : null}
`;

class MenuButton extends React.Component {
    onClick = event => this.props.onClick(this.props.index);

    render() {
        const {disabled, active, icon} = this.props;

        return (<FlatButton
            onClick={this.onClick}
            disabled={disabled}
            active={active}
        >
            {icon}
        </FlatButton>);
    }
}

MenuButton.propTypes = {
    active: PropTypes.bool,
    icon: PropTypes.shape({}).isRequired,
};

MenuButton.defaultProps = {
    active: false,
    icon: undefined,
};

export default onlyUpdateForKeys(['active'])(MenuButton);
