import {connect} from 'react-redux';

import CellList from '../components/CellList';

import {removeCell, sendCode} from '../actions';


const mapStateToProps = state => ({
    cells: state.cells,
});

const mapDispatchToProps = dispatch => ({
    onDeleteClick: id => () => dispatch(removeCell(id)),
    onSendClick: id => python_code => dispatch(sendCode(python_code, id)),
});

const NotebookCellList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CellList);

export default NotebookCellList;
