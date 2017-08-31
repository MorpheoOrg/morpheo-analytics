import React from 'react';
import PropTypes from 'prop-types';
import {keyframes, css} from 'emotion';
import {onlyUpdateForKeys} from 'recompose';
import {calculateRgba} from './helpers';

const long = keyframes`
  0% {left: -35%;right: 100%} 
  60% {left: 100%;right: -90%}
  100% {left: 100%;right: -90%}
`;

const short = keyframes`
  0% {left: -200%;right: 100%} 
  60% {left: 107%;right: -8%}
  100% {left: 107%;right: -8%}
`;

class Loader extends React.Component {
    style = i => css`{
        position: absolute;
        height: ${this.props.height}px;
        overflow: hidden;
        background-color: ${this.props.color};
        background-clip: padding-box;
        display: block;
        border-radius: 2px;
        will-change: left, right;
        animation-fill-mode: forwards;
        animation: ${i === 1 ? long : short} 2.1s ${i === 2 ? '1.15s' : ''} ${i === 1 ? 'cubic-bezier(0.65, 0.815, 0.735, 0.395)' : 'cubic-bezier(0.165, 0.84, 0.44, 1)'} infinite;
    }`;

    wrapper = css`{        
        position: relative;
        width: ${this.props.width}px;
        height: ${this.props.height}px;
        overflow: hidden;
        background-color: ${calculateRgba(this.props.color, 0.2)};
        background-clip: padding-box;
    }`;

    long = this.style(1);
    short = this.style(2);

    render() {
        return this.props.loading ?
            <div className={this.wrapper}>
                <div className={this.long}/>
                <div className={this.short}/>
            </div> : null;
    }
}

Loader.propTypes = {
    loading: PropTypes.bool,
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
};

Loader.defaultProps = {
    loading: true,
    color: '#000000',
    width: 100,
    height: 4,
};

export default onlyUpdateForKeys('loading', 'color', 'width', 'height')(Loader);
