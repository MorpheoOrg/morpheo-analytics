import React from 'react';
import PropTypes from 'prop-types';
import {keyframes, css} from 'emotion';
import {onlyUpdateForKeys} from 'recompose';

const riseAmount = 30;

const even = keyframes`
  0% {transform: scale(1.1)}
  25% {translateY(-${riseAmount}px)}
  50% {transform: scale(0.4)}
  75% {transform: translateY(${riseAmount}px)}
  100% {transform: translateY(0) scale(1.0)}
`;

const odd = keyframes`
  0% {transform: scale(0.4)}
  25% {translateY(${riseAmount}px)}
  50% {transform: scale(1.1)}
  75% {transform: translateY(${-riseAmount}px)}
  100% {transform: translateY(0) scale(0.75)}
`;

class Loader extends React.Component {
    style = i => css`{
        background-color: ${this.props.color};
        width: ${this.props.size}px;
        height: ${this.props.size}px;
        margin: ${this.props.margin};
        border-radius: 100%;
        display: inline-block;
        animation: ${i % 2 === 0 ? even : odd} 1s 0s infinite cubic-bezier(.15,.46,.9,.6);
        animation-fill-mode: both;
    }`;

    a = this.style(1);
    b = this.style(2);
    c = this.style(3);
    d = this.style(4);
    e = this.style(5);

    render() {
        return this.props.loading ?
            <div>
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
    margin: PropTypes.string
};

Loader.defaultProps = {
    loading: true,
    color: '#000000',
    size: 15,
    margin: '2px',
};

export default onlyUpdateForKeys(['loading', 'color', 'size', 'margin'])(Loader);
