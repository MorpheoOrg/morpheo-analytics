/* eslint react/no-danger: 0 */

import {PropTypes} from 'prop-types';
import React from 'react';

const style = {
    main: {
        margin: '0 auto',
        padding: '10px 30px 0 30px',
    },
    cell: {
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '30px 30px 10px',
        borderRadius: 10,
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
        overflow: 'visible',
    },
};

const Cell = ({dispatch, cellId, value, onDeleteClick, onSendClick, content}) => {
    let codeTextArea;
    return (
        <div style={style.main}>
            <div style={style.cell}>
                <div className="cell">
                  Cell n°{cellId} :
                  <textarea
                      ref={(textarea) => {
                          codeTextArea = textarea;
                      }}
                  >
                      {value}
                  </textarea>
                    <div>
                        <button onClick={onDeleteClick}>Delete</button>
                        <button onClick={() => onSendClick(codeTextArea.value)}>
                            Send
                        </button>
                    </div>
                </div>
                <div className="result" dangerouslySetInnerHTML={{__html: content}} />
            </div>
        </div>);
};

Cell.propTypes = {
    dispatch: PropTypes.func,
    cellId: PropTypes.number.isRequired,
    value: PropTypes.node,
    onDeleteClick: PropTypes.func.isRequired,
    onSendClick: PropTypes.func.isRequired,
    content: PropTypes.node,
};

Cell.defaultProps = {
    dispatch: undefined,
    value: undefined,
    content: undefined,
};


export default Cell;
