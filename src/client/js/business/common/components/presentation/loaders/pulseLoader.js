import React from 'react';
import PropTypes from 'prop-types';

const getStyle = (i) => ({
    backgroundColor: this.props.color,
    width: this.props.size,
    height: this.props.size,
    margin: this.props.margin,
    borderRadius: '100%',
    display: 'inline-block',
    animation: `pulseLoader 0.75s ${i * 0.12}s infinite cubic-bezier(.2,.68,.18,1.08)`,
    animationFillMode: 'both',
});

class Loader extends React.Component {
    constructor() {
        super();

        // don't break on server side rendering
        if (typeof document !== 'undefined') {
            let styleSheet = document.styleSheets[0];
            let keyframes = `@keyframes pulseLoader {
                0% {transform:scale(1), opacity:1} 
                45% {transform:scale(0.1), opacity:0.7}
                80% {transform:scale(1), opacity:1}
            }`;

            styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        }
    }

    render() {
        return this.props.loading ?
            <div className="react-spinners--pulse">
                <div style={getStyle(1)}/>
                <div style={getStyle(2)}/>
                <div style={getStyle(3)}/>
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
