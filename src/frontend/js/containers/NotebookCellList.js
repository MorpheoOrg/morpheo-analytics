import {connect} from 'react-redux';

import CellList from '../components/CellList';

import {removeCell} from '../actions';

import {
  message as messageActions,
} from '../business/kernel/actions';


const mapStateToProps = state => ({
    cells: state.cells,
});

const mapDispatchToProps = dispatch => ({
    onDeleteClick: id => () => dispatch(removeCell(id)),
    onSendClick: id => python_code => dispatch(messageActions.send(python_code, id)),
});

const NotebookCellList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CellList);

export default NotebookCellList;
