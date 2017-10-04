import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import {onlyUpdateForKeys} from 'recompose';

const style = active => css`
    border: none;
    background-color: inherit;
    cursor: pointer;
    color: ${active ? '#45464B' : '#98999F'};
    margin: 5px;
    height: 42px;
    width: 42px;

    &:hover {
        color: #45464B;
    }

    &:focus {
        outline: 0;
    }
`;

class MenuButton extends React.Component {
    onClick = (event) => this.props.onClick(this.props.index);

    render() {
        const {active, icon} = this.props;

        return <button
            className={style(active)}
            onClick={this.onClick}
        >
            {icon}
        </button>;
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
