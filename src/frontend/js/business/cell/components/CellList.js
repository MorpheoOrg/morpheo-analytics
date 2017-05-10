import {PropTypes} from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Select} from 'antd';
import {Raw} from 'slate';

import Cell from './Cell';
import languages from './Editor/languages';
import actions from '../actions';
import {message as messageActions} from '../../kernel/actions';
import {settings as settingsActions} from '../../user/actions';

const Option = Select.Option;

const themes = [
    '',
    'coy',
    'dark',
    'funky',
    'okaidia',
    'solarizedlight',
    'tomorrow',
    'twilight',
];

const createCell = (cells, preferred_language) => (
    {
        id: cells.length ? Math.max(...cells.map(o => o.id)) + 1 : 1,
        slateState: Raw.deserialize({
            nodes: [
                {
                    kind: 'block',
                    type: 'code_block',
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
    select: {
        width: 130,
        float: 'right',
    },
};

class CellList extends React.Component {
    constructor(props) {
        super(props);
        this.addCell = this.addCell.bind(this);
        this.selectTheme = this.selectTheme.bind(this);
    }
    componentWillMount() {
        if (!this.props.cells.length) {
            this.props.addCell(createCell(this.props.cells, this.props.user.preferred_language));
        }
    }
    addCell() {
        this.props.addCell(createCell(this.props.cells, this.props.user.preferred_language));
    }

    selectTheme(theme) {
        this.props.setTheme(theme);
    }
    render() {
        const {user, cells, deleteCell, send, set, setLanguage, setTheme, setSlate} = this.props;
        return (<div style={style.main}>
            <Select
                style={style.select} defaultValue={user.theme || themes[0]}
                onChange={this.selectTheme}>
                {themes.map(o =>
                    <Option key={o} value={o}>{o || 'morpheo'}</Option>,
                )}
            </Select>
            {cells.map(cell =>
                <Cell
                    key={cell.id}
                    deleteCell={deleteCell}
                    send={send}
                    set={set}
                    setLanguage={setLanguage}
                    setTheme={setTheme}
                    setSlate={setSlate}
                    cell={cell}
                    user={user}
                />,
            )}
            <Button type={'primary'} onClick={this.addCell} icon="plus" />
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
    setLanguage: PropTypes.func,
    setTheme: PropTypes.func,
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
    setLanguage: noop,
    setTheme: noop,
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
    setLanguage: actions.setLanguage,
    setTheme: settingsActions.setTheme,
    setSlate: actions.setSlate,
    send: messageActions.send,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CellList);
