import React from 'react';
import PropTypes from 'prop-types';
import {keyframes, css} from 'emotion';
import {onlyUpdateForKeys} from 'recompose';
import {calculateRgba} from './helpers';


class Loader extends React.Component {
    thickness = this.props.size / 5;
    lat = (this.props.size - this.thickness) / 2;
    offset = this.lat - this.thickness;
    color = calculateRgba(this.props.color, 0.75);
    before = keyframes`
          0% {width: ${this.thickness}px;box-shadow: ${this.lat}px ${-this.offset}px ${this.props.color}, ${-this.lat}px ${this.offset}px ${this.props.color}} 
          35% {width: ${this.props.size}px;box-shadow: 0 ${-this.offset}px ${this.props.color}, 0 ${this.offset}px ${this.props.color}}
          70% {width: ${this.thickness}px;box-shadow: ${-this.lat}px ${-this.offset}px ${this.props.color}, ${this.lat}px ${this.offset}px ${this.props.color}}
          100% {box-shadow: ${this.lat}px ${-this.offset}px ${this.props.color}, ${-this.lat}px ${this.offset}px ${this.props.color}}
        `;
    after = keyframes`
          0% {height: ${this.thickness}px;box-shadow: ${this.offset}px ${this.lat}px ${this.props.color}, ${-this.offset}px ${-this.lat}px ${this.props.color}} 
          35% {height: ${this.props.size}px;box-shadow: ${this.offset}px 0 ${this.props.color}, ${-this.offset}px 0 ${this.props.color}}
          70% {height: ${this.thickness}px;box-shadow: ${this.offset}px ${-this.lat}px ${this.props.color}, ${-this.offset}px ${this.lat}px ${this.props.color}}
          100% {box-shadow: ${this.offset}px ${this.lat}px ${this.props.color}, ${-this.offset}px ${-this.lat}px ${this.props.color}}
        `;
    style = i => css`{
        position: absolute;
        content: '';
        top: 50%;
        left: 50%;
        display: block;
        width: ${this.props.size / 5}px;
        height: ${this.props.size / 5}px;
        border-radius: ${this.props.size / 10}px;
        transform: translate(-50%, -50%);
        animation-fill-mode: none;
        animation: ${i === 1 ? this.before : this.after} 2s infinite;
    }`;

    wrapper = css`{        
        position: relative;
        width: ${this.props.size}px;
        height: ${this.props.size}px;
        transform: rotate(165deg);
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
    size: PropTypes.number,
    color: PropTypes.string,
};

Loader.defaultProps = {
    loading: true,
    size: 50,
    color: '#000000',
};

export default onlyUpdateForKeys(['loading', 'color', 'size'])(Loader);
