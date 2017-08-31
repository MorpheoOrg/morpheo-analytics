import React from 'react';
import PropTypes from 'prop-types';
import {keyframes, css} from 'emotion';
import {onlyUpdateForKeys} from 'recompose';

const rotate = keyframes`
  100% {transform: rotate(360deg)}
`;

const bounce = keyframes`
  0%, 100% {transform: scale(0)} 
  50% {transform: scale(1.0)}
`;

class Loader extends React.Component {
    style = i => css`{
        position: absolute;
        top: ${i % 2 ? '0' : 'auto'};
        bottom: ${i % 2 ? 'auto' : '0'};
        height: ${this.props.size / 2}px;
        width: ${this.props.size / 2}px;
        background-color: ${this.props.color};
        border-radius: 100%;
        animation-fill-mode: forwards;
        animation: ${bounce} 2s ${i === 2 ? '-1s' : '0s'} infinite linear;
    }`;

    wrapper = css`{        
        position: relative;
        width: ${this.props.size}px;
        height: ${this.props.size}px;
        animation-fill-mode: forwards;
        animation: ${rotate} 2s 0s infinite linear;
    }`;

    a = this.style(1);
    b = this.style(2);

    render() {
        return this.props.loading ?
            <div className={this.wrapper}>
                <div className={this.a}/>
                <div className={this.b}/>
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
