import React from 'react';
import PropTypes from 'prop-types';
import {keyframes, css} from 'emotion';
import {onlyUpdateForKeys} from 'recompose';

// This returns an animation
const clip = keyframes`
  0% {transform: rotate(0deg) scale(1)} 
  50% {transform: rotate(180deg) scale(0.8)}
  100% {transform: rotate(360deg) scale(1)}
`;

class Loader extends React.Component {
    style = css`{
        background: transparent !important;
        width: ${this.props.size}px;
        height: ${this.props.size}px;
        border-radius: 100%;
        border: 2px solid;
        border-color: ${this.props.color};
        border-bottom-color: transparent;
        display: inline-block;
        animation: ${clip} 0.75s 0s infinite linear;
        animation-fill-mode: both;
    }`;

    render() {
        return this.props.loading ? <div className={this.style}/> : null;
    }
}

Loader.propTypes = {
    loading: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.number
};

Loader.defaultProps = {
    loading: true,
    color: '#000000',
    size: 35
};

export default onlyUpdateForKeys(['loading'])(Loader);
