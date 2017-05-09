/* eslint react/no-danger: 0 */

import {PropTypes} from 'prop-types';
import React from 'react';
import {Button, Select} from 'antd';
import {onlyUpdateForKeys} from 'recompose';

import languages from '../languages';
import SlateEditor from './slate';

const box = {
    display: 'inline-block',
    verticalAlign: 'top',
    width: '50%',
    overflow: 'auto',
};

const style = {
    cell: {
        main: {
            margin: '1px 0 0 0',
            backgroundColor: '#fff',
            padding: '30px 30px 10px',
            borderRadius: 10,
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
            overflow: 'visible',
        },
        input: {
            ...box,
        },
        output: {
            ...box,
            paddingLeft: '5%',
        },
        error: {
            ...box,
            paddingLeft: '5%',
            color: 'red',
        },
        actions: {
            float: 'right',
            margin: 10,
        },
        select: {
            float: 'right',
            width: 100,
        },
    },
};

const Option = Select.Option;

class Cell extends React.Component {

    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    delete() {
        this.props.deleteCell(this.props.cell.id);
    }

    send() {
        this.props.send({code: this.props.cell.value, id: this.props.cell.id});
    }

    handleChange(language) {
        this.props.setLanguage({language, id: this.props.cell.id});
    }

    render() {
        const {cell, set, setSlate} = this.props;

        return (
            <div style={style.cell.main}>
                <div style={style.cell.input}>
                    <h2>Cell n°{cell.id} :</h2>
                    <Select style={style.cell.select} defaultValue={languages[0]} onChange={this.handleChange}>
                        {languages.map(o =>
                            <Option key={o} value={o}>{o}</Option>,
                        )}
                    </Select>
                    <SlateEditor set={set} setSlate={setSlate} cell={cell} />
                    <div style={style.cell.actions}>
                        <Button onClick={this.delete} icon="delete" />
                        <Button type={'primary'} onClick={this.send}>Send</Button>
                    </div>
                </div>
                {cell.content && cell.type === 'text' &&
                <div style={style.cell.output} dangerouslySetInnerHTML={{__html: cell.content}} />}
                {cell.content && cell.type === 'img' &&
                <img style={style.cell.output} alt="result" src={`data:image/png;base64,${cell.content}`} />}
                {cell.content && cell.type === 'error' &&
                <div style={style.cell.error}>
                    <span>{cell.content.ename}</span>
                    <p>{cell.content.evalue}</p>
                </div>
                }
            </div>);
    }
}

Cell.propTypes = {
    cell: PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string,
    }),
    deleteCell: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired,
    setLanguage: PropTypes.func.isRequired,
    setSlate: PropTypes.func.isRequired,
};

Cell.defaultProps = {
    cell: undefined,
};

export default onlyUpdateForKeys(['cell'])(Cell);
