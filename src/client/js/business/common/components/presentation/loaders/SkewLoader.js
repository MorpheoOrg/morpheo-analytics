import React from 'react';
import PropTypes from 'prop-types';
import {keyframes, css} from 'emotion';
import {onlyUpdateForKeys} from 'recompose';

const skew = keyframes`
  25% {transform: perspective(100px) rotateX(180deg) rotateY(0)}
  50% {transform: perspective(100px) rotateX(180deg) rotateY(180deg)}
  75% {transform: perspective(100px) rotateX(0) rotateY(180deg)}
  100% {transform: perspective(100px) rotateX(0) rotateY(0)}
`;

class Loader extends React.Component {

    style = css`{
        width: 0;
        height: 0;
        border-left: ${this.props.size}px solid transparent;
        border-right: ${this.props.size}px solid transparent;
        border-bottom: ${this.props.size}px solid ${this.props.color};
        display: inline-block;
        animation: ${skew} 3s 0s infinite cubic-bezier(.09,.57,.49,.9);
        animation-fill-mode: both;
    }`;


    render() {
        return this.props.loading ?
            <div className={this.style}>
            </div> : null;
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
    size: 20
};

export default onlyUpdateForKeys(['loading', 'color', 'size'])(Loader);
