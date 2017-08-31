import React from 'react';
import PropTypes from 'prop-types';
import {keyframes, css} from 'emotion';
import {onlyUpdateForKeys} from 'recompose';

const grid = keyframes`
  0% {transform: scale(1)}
  50% {transform: scale(0.5); opacity: 0.7}
  100% {transform: scale(1);opacity: 1}
`;

const random = top => Math.random() * top;

class Loader extends React.Component {

    style = i => css`{
        display: inline-block;
        background-color: ${this.props.color};
        width: ${this.props.size};
        height: ${this.props.size};
        margin: ${this.props.margin};
        border-radius: 100%;
        animation-fill-mode: 'both';
        animation: ${grid} ${(random(100) / 100) + 0.6}s ${(random(100) / 100) - 0.2}s infinite ease;
    }`;

    wrapper = css`{        
        width: ${(parseFloat(this.props.size) * 3) + (parseFloat(this.props.margin) * 6)}px;
        font-size: 0;
    }`;

    a = this.style(1);
    b = this.style(2);
    c = this.style(3);
    d = this.style(4);
    e = this.style(5);
    f = this.style(6);
    g = this.style(7);
    h = this.style(8);
    i = this.style(8);

    render() {
        return this.props.loading ?
            <div className={this.wrapper}>
                <div className={this.a}/>
                <div className={this.b}/>
                <div className={this.c}/>
                <div className={this.d}/>
                <div className={this.e}/>
                <div className={this.f}/>
                <div className={this.g}/>
                <div className={this.h}/>
                <div className={this.i}/>
            </div> : null;
    }
}

Loader.propTypes = {
    loading: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.number,
    margin: PropTypes.string
};

Loader.defaultProps = {
    loading: true,
    color: '#000000',
    size: 15,
    margin: '2px'
};

export default onlyUpdateForKeys(['loading', 'color', 'size', 'margin'])(Loader);
