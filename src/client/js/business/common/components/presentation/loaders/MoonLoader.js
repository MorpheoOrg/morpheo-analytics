import React from 'react';
import PropTypes from 'prop-types';
import {keyframes, css} from 'emotion';
import {onlyUpdateForKeys} from 'recompose';

const moon = keyframes`
  100% {transform: rotate(360deg)}
`;

class Loader extends React.Component {
    moonSize = this.props.size / 7;
    ballStyle = (size) => css`{
        width: ${size}px;
        height: ${size}px;
        border-radius: 100%;
    }`;
    wrapper = css`{
        position: relative;
        width: ${this.props.size + this.moonSize * 2}px;
        height: ${this.props.size + this.moonSize * 2}px;
        animation: ${moon} 0.6s 0s infinite linear;
        animation-fill-mode: forwards;

    }`;
    ball = css`
        composes: ${this.ballStyle(this.moonSize)};
        background-color: ${this.props.color};
        opacity: 0.8;
        position: absolute;
        top: ${(this.props.size / 2) - (this.moonSize / 2)}px;
        animation: ${moon} 0.6s 0s infinite linear;
        animation-fill-mode: forwards;
    `;
    circle = css`
        composes: ${this.ballStyle(this.props.size)};
        border: ${this.moonSize}px solid ${this.props.color};
        opacity: 0.1;
    `;

    render() {
        return this.props.loading ?
            <div className={this.wrapper}>
                <div className={this.ball}/>
                <div className={this.circle}/>
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

export default onlyUpdateForKeys('loading', 'color', 'size')(Loader);
