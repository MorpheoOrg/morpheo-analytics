import React from 'react';
import PropTypes from 'prop-types';

const box = {
    backgroundColor: '#1b1b1b',
    border: '1px solid black',
    padding: 10,
    borderRadius: 3,
};

const s = {
    output: {
        ...box,
        color: '#ffffff',
    },
    error: {
        ...box,
        color: 'red',
    },
};

const Cell = ({content, type, style}) =>
    (<div style={style} contentEditable={false}>
        {content && type === 'text' &&
        <div style={s.output} dangerouslySetInnerHTML={{__html: content}} />
        }

        {content && type === 'img' &&
        <img style={s.output} alt="result" src={`data:image/png;base64,${content}`} />
        }

        {content && type === 'error' &&
        <div style={s.error}>
            <span>{content.ename}</span>
            <p>{content.evalue}</p>
        </div>}
    </div>);

Cell.propTypes = {
    content: PropTypes.string,
    type: PropTypes.string,
    style: PropTypes.shape({}),
};

Cell.defaultProps = {
    content: null,
    type: '',
    style: null,
};

export default Cell;
