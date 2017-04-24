import {PropTypes} from 'prop-types';
import React from 'react';

import Cell from './Cell';


const CellList = ({cells, onDeleteClick, onSendClick}) => (
    <div>
        {cells.map(cell =>
            <Cell
                key={cell.id}
                onDeleteClick={onDeleteClick(cell.id)}
                onSendClick={onSendClick(cell.id)}
                cellId={cell.id}
                content={cell.content}
            />,
    )}
    </div>
);

CellList.propTypes = {
    cells: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
    }).isRequired).isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onSendClick: PropTypes.func.isRequired,
};

export default CellList;
