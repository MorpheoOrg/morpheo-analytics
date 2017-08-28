import React from 'react';
import PropTypes from 'prop-types';

class Loader extends React.Component {
    state = {
        name: 'pulseLoader',
    };
    constructor() {
        super();

        // don't break on server side rendering
        if (typeof document !== 'undefined') {
            let styleSheet = document.styleSheets[0];

            // do not readd if already added
            if (!Object.keys(styleSheet.cssRules).filter(o => styleSheet.cssRules[o].name === name).length) {
                let keyframes = `@keyframes ${this.state.name} {
                    0% {transform: scale(1);opacity: 1} 
                    45% {transform: scale(0.1);opacity: 0.7}
                    80% {transform: scale(1);opacity: 1}
                }`;

                styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
            }
        }
    }

    getStyle = (i) => ({
        backgroundColor: this.props.color,
        width: this.props.size,
        height: this.props.size,
        margin: this.props.margin,
        borderRadius: '100%',
        display: 'inline-block',
        animation: `${this.state.name} 0.75s ${i * 0.12}s infinite cubic-bezier(.2,.68,.18,1.08)`,
        animationFillMode: 'both',
    });

    render() {
        return this.props.loading ?
            <div className="react-spinners--pulse">
                <div style={this.getStyle(1)}/>
                <div style={this.getStyle(2)}/>
                <div style={this.getStyle(3)}/>
            </div> : null;
    }
}

/**
 * @type {object}
 */
Loader.propTypes = {
    loading: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.number,
    margin: PropTypes.number,
};

/**
 * @type {object}
 */
Loader.defaultProps = {
    loading: true,
    color: '#000000',
    size: 15,
    margin: 2,
};

export default Loader;
