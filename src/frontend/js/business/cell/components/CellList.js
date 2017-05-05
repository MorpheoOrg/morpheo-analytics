import {PropTypes} from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from 'antd';
import {Raw} from 'slate';

import Cell from './Cell';
import languages from '../languages';
import actions from '../actions';
import {message as messageActions} from '../../kernel/actions';

const createCell = cells => (
    {
        id: (Math.max(cells.map(o => o.id))) + 1,
        slateState: Raw.deserialize({
            nodes: [
                {
                    kind: 'block',
                    type: 'code_block',
                    data: {syntax: languages[0]},
                    nodes: [
                        {
                            kind: 'text',
                            ranges: [
                                {
                                    text: '', // initialize to empty
                                },
                            ],
                        },
                    ],
                },
            ],
        }, {terse: true}),
    }
);

const style = {
    padding: '10px 30px 0 30px',
    margin: '0 auto',
};

class CellList extends React.Component {
    constructor(props) {
        super(props);
        this.addCell = this.addCell.bind(this);
    }
    componentWillMount() {
        if (!this.props.cells.length) {
            this.props.addCell(createCell(this.props.cells));
        }
    }
    addCell() {
        this.props.addCell(createCell(this.props.cells));
    }
    render() {
        const {cells, deleteCell, send, set, setLanguage, setSlate} = this.props;
        return (<div style={style}>
            {cells.map(cell =>
                <Cell
                    key={cell.id}
                    deleteCell={deleteCell}
                    send={send}
                    set={set}
                    setLanguage={setLanguage}
                    setSlate={setSlate}
                    cell={cell}
                />,
            )}
            <Button type={'primary'} onClick={this.addCell} icon="plus" />
        </div>);
    }
}

CellList.propTypes = {
    cells: PropTypes.arrayOf(PropTypes.shape({})),
    deleteCell: PropTypes.func,
    send: PropTypes.func,
    set: PropTypes.func,
    setLanguage: PropTypes.func,
    setSlate: PropTypes.func,
    addCell: PropTypes.func,
};

const noop = () => {
};

CellList.defaultProps = {
    cells: {},
    deleteCell: noop,
    send: noop,
    set: noop,
    setLanguage: noop,
    setSlate: noop,
    addCell: noop,
};

const mapStateToProps = state => ({
    cells: state.cell.results,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addCell: actions.add,
    deleteCell: actions.remove,
    set: actions.set,
    setLanguage: actions.setLanguage,
    setSlate: actions.setSlate,
    send: messageActions.send,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CellList);
