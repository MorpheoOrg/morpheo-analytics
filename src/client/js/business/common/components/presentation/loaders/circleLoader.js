import React from 'react';
import PropTypes from 'prop-types';
import {keyframes, css} from 'emotion';
import {onlyUpdateForKeys} from 'recompose';

const circle = keyframes`
  0% {transform: rotate(0deg)} 
  50% {transform: rotate(180deg)}
  100% {transform: rotate(360deg)}
`;

class Loader extends React.Component {
    style = i => css`{
        position: absolute;
        height: ${this.props.size * (1 - (i / 10))}px;
        width: ${this.props.size * (1 - (i / 10))}px;
        border: 1px solid ${this.props.color};
        border-radius: 100%;
        transition: 2s;
        border-bottom: none;
        border-right: none;
        top: ${(i * 0.7 * 2.5)}%;
        left: ${(i * 0.35 * 2.5)}%;
        animation-fill-mode: '';
        animation: ${circle} 1s ${i * 0.2}s infinite linear;
    }`;

    wrapper = css`{        
        position: relative;
        width: ${this.props.size}px;
        height: ${this.props.size}px;
    }`;

    a = this.style(0);
    b = this.style(1);
    c = this.style(2);
    d = this.style(3);
    e = this.style(4);

    render() {
        return this.props.loading ?
            <div className={this.wrapper}>
                <div className={this.a}/>
                <div className={this.b}/>
                <div className={this.c}/>
                <div className={this.d}/>
                <div className={this.e}/>
            </div> : null;
    }
}

Loader.propTypes = {
    loading: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.number,
};

Loader.defaultProps = {
    loading: true,
    color: '#000000',
    size: 50,
};

export default onlyUpdateForKeys(['loading'])(Loader);
