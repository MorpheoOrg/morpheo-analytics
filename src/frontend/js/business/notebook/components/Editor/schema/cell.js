import React from 'react';
import PropTypes from 'prop-types';

const box = {
    backgroundColor: '#1b1b1b',
    border: '1px solid black',
    padding: 10,
    borderRadius: 3,
};

const style = {
    output: {
        ...box,
        color: '#ffffff',
    },
    error: {
        ...box,
        color: 'red',
    },
};

const Cell = ({content, type}) =>
    (<div>
        {content && type === 'text' &&
        <div style={style.output} dangerouslySetInnerHTML={{__html: content}} />
        }

        {content && type === 'img' &&
        <img style={style.output} alt="result" src={`data:image/png;base64,${content}`} />
        }

        {content && type === 'error' &&
        <div style={style.error}>
            <span>{content.ename}</span>
            <p>{content.evalue}</p>
        </div>}
    </div>);

Cell.propTypes = {
    content: PropTypes.shape({}).isRequired,
    type: PropTypes.string.isRequired,
};

export default Cell;
