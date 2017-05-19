/* eslint react/no-danger: 0 */

import {PropTypes} from 'prop-types';
import React from 'react';
import {Button} from 'antd';
import {onlyUpdateForKeys} from 'recompose';

import Editor from './Editor';

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
            marginLeft: '5%',
            width: '45%',
        },
        error: {
            ...box,
            marginLeft: '5%',
            width: '45%',
            color: 'red',
        },
        actions: {
            float: 'right',
            margin: '10px 8px 10px 10px',
        },
        buttons: {
            margin: '0 8px 0 0',
        },
    },
};

class Cell extends React.Component {

    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.remove = this.remove.bind(this);
        this.selectLanguage = this.selectLanguage.bind(this);
    }

    remove() {
        this.props.deleteCell(this.props.cell.id);
    }

    send() {
        this.props.send({code: this.props.cell.value, id: this.props.cell.id});
    }

    selectLanguage(language) {
        this.props.setLanguage({language, id: this.props.cell.id});
    }

    render() {
        const {cell, user, set, setSlate} = this.props;

        return (
            <div style={style.cell.main}>
                <div style={style.cell.input}>
                    <Editor
                        set={set}
                        setSlate={setSlate}
                        cell={cell}
                        user={user}
                        selectLanguage={this.selectLanguage}
                    />
                    <div style={style.cell.actions}>
                        <Button style={style.cell.buttons} onClick={this.remove} icon="delete"/>
                        {cell.slateState.startBlock.type.startsWith('code') &&
                        <Button type={'primary'} onClick={this.send}>Execute</Button>}
                    </div>
                </div>
                {cell.content && cell.type === 'text' &&
                <div style={style.cell.output} dangerouslySetInnerHTML={{__html: cell.content}}/>}
                {cell.content && cell.type === 'img' &&
                <img style={style.cell.output} alt="result" src={`data:image/png;base64,${cell.content}`}/>}
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
    user: PropTypes.shape({}),

    deleteCell: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired,
    setLanguage: PropTypes.func.isRequired,
    setSlate: PropTypes.func.isRequired,
};

Cell.defaultProps = {
    cell: undefined,
    user: undefined,
};

export default onlyUpdateForKeys(['cell', 'user'])(Cell);
