/* eslint react/no-danger: 0 */

import {PropTypes} from 'prop-types';
import React from 'react';


const Cell = ({dispatch, cellId, value, onDeleteClick, onSendClick, content}) => {
    let codeTextArea;
    console.log(content);
    return (<div>
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
