/**
 * Created by guillaume on 8/16/16.
 */

// Icon

import React, {PropTypes} from 'react';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const Bander = ({width, height, style, color}) =>
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        x="0px"
        y="0px"
        viewBox="0 0 90 92"
        style={style}
    >
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Group-Copy" transform="translate(10.000000, 2.000000)">
                <circle id="Oval-13" stroke={color} strokeWidth="3" cx="33.5" cy="3.5" r="3.5" />
                <path d="M5.4502181,87.8419833 C5.4502181,87.8419833 0.385385368,74.0156542 14.1490707,70.5159451 L51.7552607,70.2629917 C51.7552607,70.2629917 61.2333604,70.4298331 63.9941544,78.891736 C65.3175637,84.1709005 63.7033643,87.7366097 63.7033643,87.7366097 L5.4502181,87.8419833 Z" id="Path-37-Copy" fill={color} />
                <path d="M1.65375883,87.7593537 C1.65375883,87.7593537 -4.07235802,70.8490506 11.4883672,66.5687286 L54.0045666,66.2593537 C54.0045666,66.2593537 64.7201636,66.4634092 67.8414175,76.8127464 C69.3376162,83.2694328 67.5126607,87.6304763 67.5126607,87.6304763 L1.65375883,87.7593537 Z" id="Path-37" stroke={color} strokeWidth="3.2" />
                <path d="M11.298476,65.8130498 C11.298476,65.8130498 6.02803303,33.3016496 34.0711823,33.3016496 C62.1143316,33.3016496 57.7232647,65.5246609 57.7232647,65.5246609" id="Path-38" stroke={color} strokeWidth="3.2" />
                <path d="M26.9289568,33.8651866 C26.9289568,33.8651866 29.4630969,29.2093039 33.9949678,29.1866995 C38.5268386,29.1640951 41.0609783,33.9959788 41.0609783,33.9959788" id="Path-39" stroke={color} strokeWidth="3.2" />
                <path d="M30.2383264,30.4684639 L32.6067891,7.74064634 L34.6242191,7.97760617 L37.7804917,30.4684639" id="Path-40" stroke={color} strokeWidth="3.2" />
                <path d="M10.0292272,86.6310094 C10.0292272,86.6310094 5.76630419,75.3426111 14.2650276,72.5530437 L25.2262075,72.2629917 L31.877586,77.3603043 C31.877586,77.3603043 32.7280949,80.8121635 31.0207155,86.9998241 C27.0193071,87.0429723 10.0292272,86.6310094 10.0292272,86.6310094 Z" id="Path-41" stroke={color} fill="#FFFFFF" />
                <path d="M60.2985195,86.9980179 C60.2985195,86.9980179 64.5614425,75.7096195 56.0627191,72.9200521 L45.1015392,72.6300001 L38.4501607,77.7273127 C38.4501607,77.7273127 37.5996518,81.1791719 39.3070312,87.3668325 C43.3084395,87.4099807 60.2985195,86.9980179 60.2985195,86.9980179 Z" id="Path-41-Copy" stroke={color} fill="#FFFFFF" />
                <rect id="Rectangle-1" stroke={color} fill={color} x="17" y="79" width="5" height="5" />
                <rect id="Rectangle-1-Copy" stroke={color} fill={color} x="47" y="79" width="5" height="5" />
            </g>
            <path d="M40.3957345,6 L6.45831591,48.6295319" id="Path-53" stroke={color} strokeWidth="3" strokeDasharray="4,4" />
            <path d="M46,8 L73.6832504,42.8621712" id="Path-54" stroke={color} strokeWidth="3" strokeDasharray="4,4" />
            <path d="M48,4.7814909 L87.3178406,22.0088425" id="Path-55" stroke={color} strokeWidth="3" strokeDasharray="4,4" />
            <path d="M39.4897851,5.52283357 L2.93116754,17.7403097" id="Path-56" stroke={color} strokeWidth="3" strokeDasharray="4,4" />
        </g>
    </svg>;

Bander.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    style: PropTypes.shape({}),
};

Bander.defaultProps = {
    width: 90,
    height: 92,
    style: {},
    color: '#1883FF'
};

export default onlyUpdateForKeys(['width', 'height', 'style'])(Bander);
