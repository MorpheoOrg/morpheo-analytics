import {PropTypes} from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Cell from './Cell';

import actions from '../actions';
import {message as messageActions} from '../../kernel/actions';

class CellList extends React.Component {
    constructor(props) {
        super(props);
        this.addCell = this.addCell.bind(this);
    }
    componentWillMount() {
        if (!this.props.cells.length) {
            this.props.addCell({id: (Math.max(this.props.cells.map(o => o.id))) + 1});
        }
    }
    addCell() {
        this.props.addCell({id: (Math.max(this.props.cells.map(o => o.id))) + 1});
    }
    render() {
        const {cells, deleteCell, send, set} = this.props;
        return (<div>
            {cells.map(cell =>
                <Cell
                    key={cell.id}
                    deleteCell={deleteCell}
                    send={send}
                    set={set}
                    cell={cell}
                />,
            )}
            <button onClick={this.addCell}>+</button>
        </div>);
    }
}

CellList.propTypes = {
    cells: PropTypes.arrayOf(PropTypes.shape({})),
    deleteCell: PropTypes.func,
    send: PropTypes.func,
    set: PropTypes.func,
    addCell: PropTypes.func,
};

const noop = () => {
};

CellList.defaultProps = {
    cells: {},
    deleteCell: noop,
    send: noop,
    set: noop,
    addCell: noop,
};

const mapStateToProps = state => ({
    cells: state.cell.results,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addCell: actions.add,
    deleteCell: actions.remove,
    set: actions.set,
    send: messageActions.send,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CellList);
