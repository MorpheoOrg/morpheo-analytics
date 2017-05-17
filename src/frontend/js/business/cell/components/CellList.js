import {PropTypes} from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from 'antd';
import {Raw} from 'slate';

import Cell from './Cell';
import languages from './Editor/languages';
import actions from '../actions';
import {message as messageActions} from '../../kernel/actions';


const createCell = (cells, preferred_language, type = 'code_block') => (
    {
        id: cells.length ? Math.max(...cells.map(o => o.id)) + 1 : 1,
        slateState: Raw.deserialize({
            nodes: [
                {
                    kind: 'block',
                    type,
                    ...(type === 'code_block' ? {
                        data: {syntax: preferred_language || languages[0]},
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
                    } : {
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
                    }),
                },
            ],
        }, {terse: true}),
    }
);


const style = {
    main: {
        padding: '10px 30px 0 30px',
        margin: '0 auto',
    },
};

class CellList extends React.Component {
    constructor(props) {
        super(props);
        this.addCell = this.addCell.bind(this);
        this.addTextCell = this.addTextCell.bind(this);
        this.addCodeCell = this.addCodeCell.bind(this);
        this.save = this.save.bind(this);
    }

    componentWillMount() {
        if (!this.props.cells.length) {
            this.props.addCell(createCell(this.props.cells, this.props.user.preferred_language));
        }
    }

    addCell(type = 'code_block') {
        this.props.addCell(createCell(this.props.cells, this.props.user.preferred_language, type));
    }

    addCodeCell() {
        this.addCell('code_block');
    }

    addTextCell() {
        this.addCell('paragraph');
    }

    // TODO : interface save with notebook services
    save() {
        this.props.save({code: ''});
    }

    render() {
        const {user, cells, deleteCell, send, set, setLanguage, setSlate} = this.props;
        return (<div style={style.main}>
            {cells.map(cell =>
                <Cell
                    key={cell.id}
                    deleteCell={deleteCell}
                    send={send}
                    set={set}
                    setLanguage={setLanguage}
                    setSlate={setSlate}
                    cell={cell}
                    user={user}
                />,
            )}
            <Button type={'primary'} onClick={this.addCodeCell} icon="plus"/>
            <Button type={'primary'} onClick={this.addTextCell}>Add paragraph</Button>
            <Button type={'primary'} onClick={this.save}>Save</Button>
        </div>);
    }
}

CellList.propTypes = {
    cells: PropTypes.arrayOf(PropTypes.shape({})),
    user: PropTypes.shape({
        preferred_language: PropTypes.string,
    }),
    deleteCell: PropTypes.func,
    send: PropTypes.func,
    set: PropTypes.func,
    save: PropTypes.func.isRequired,
    setLanguage: PropTypes.func,
    setSlate: PropTypes.func,
    addCell: PropTypes.func,
};

const noop = () => {
};

CellList.defaultProps = {
    cells: {},
    user: {},
    deleteCell: noop,
    send: noop,
    set: noop,
    save: noop,
    setLanguage: noop,
    setSlate: noop,
    addCell: noop,
};

const mapStateToProps = state => ({
    cells: state.cell.results,
    user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addCell: actions.add,
    deleteCell: actions.remove,
    set: actions.set,
    save: actions.save.request,
    setLanguage: actions.setLanguage,
    setSlate: actions.setSlate,
    send: messageActions.send,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CellList);
