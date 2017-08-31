import React from 'react';
import PropTypes from 'prop-types';
import {keyframes, css} from 'emotion';
import {onlyUpdateForKeys} from 'recompose';

const right = keyframes`
  0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)}
  100% {transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg)}
`;

const left = keyframes`
  0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)}
  100% {transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg)}
`;


class Loader extends React.Component {
    style = i => css`{
        position: absolute;
        top: 0;
        left: 0;
        width: ${this.props.size}px;
        height: ${this.props.size}px;
        border: ${this.props.size / 10}px solid ${this.props.color};
        opacity: 0.4;
        borderRadius: 100%;
        animation-fill-mode: forwards;
        perspective: 800px;
        animation: ${i === 1 ? right : left} 2s 0s infinite linear;
    }`;

    wrapper = css`{        
        width: ${this.props.size}px;
        height: ${this.props.size}px;
        position: relative;
    }`;

    left = this.style(1);
    right = this.style(2);

    render() {
        return this.props.loading ?
            <div className={this.wrapper}>
                <div className={this.left}/>
                <div className={this.right}/>
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
    size: 60
};

export default onlyUpdateForKeys(['loading', 'color', 'size'])(Loader);
