import {PropTypes} from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {addCell} from '../actions';

const AddCell = ({dispatch}) => (
    <div>
        <button onClick={() => dispatch(addCell())}>+</button>
    </div>
  );

AddCell.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default connect()(AddCell);
