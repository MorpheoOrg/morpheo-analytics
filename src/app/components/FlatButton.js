import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import styled, {css} from 'react-emotion';


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
    color: ${({active}) => active ? '#45464B' : '#98999F'};
    cursor: pointer;

    padding: 0;

    &:hover {
        color: #45464B;
    }

    &:focus {
        outline: 0;
    }

    ${({disabled}) => disabled ? disabledStyle : null}
`;

FlatButton.propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
};

FlatButton.defaultProps = {
    active: false,
    disabled: false,
};

export default onlyUpdateForKeys([
    'active', 'disabled',
])(FlatButton);
