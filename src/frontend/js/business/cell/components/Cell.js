/**
 * Copyright Morpheo Org. 2017
 *
 * contact@morpheo.co
 *
 * This software is part of the Morpheo project, an open-source machine
 * learning platform.
 *
 * This software is governed by the CeCILL license, compatible with the
 * GNU GPL, under French law and abiding by the rules of distribution of
 * free software. You can  use, modify and/ or redistribute the software
 * under the terms of the CeCILL license as circulated by CEA, CNRS and
 * INRIA at the following URL "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
 */

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
        this.setActive = this.setActive.bind(this);
    }

    setActive() {
        this.props.setActive(this.props.cell.id);
    }

    selectLanguage(language) {
        const {cell} = this.props;
        const {slateState} = cell;
        const code_block = slateState.document.getParent(slateState.startBlock.key);
        const state = slateState.transform().setNodeByKey(code_block.key, {
            data: {
                ...code_block.data,
                syntax: language,
            },
        }).focus().apply();
        this.props.setLanguage({language, id: cell.id, state});
    }

    send() {
        this.props.send({code: this.props.cell.value, id: this.props.cell.id});
    }

    remove() {
        this.props.deleteCell(this.props.cell.id);
    }

    render() {
        const {cell, settings, set, setSlate} = this.props;

        // TODO : create a selector on style
        return (
            <div
                style={{...style.cell.main, ...(cell.isActive ? {border: '2px solid #3f8bea'} : {border: '2px solid transparent'})}}
                onClick={this.setActive}
                role="textbox"
                tabIndex={cell.id}
            >
                <div style={style.cell.input}>
                    <Editor
                        set={set}
                        setSlate={setSlate}
                        cell={cell}
                        settings={settings}
                        selectLanguage={this.selectLanguage}
                    />
                    <div style={style.cell.actions}>
                        <Button style={style.cell.buttons} onClick={this.remove} icon="delete" />
                        {cell.slateState.startBlock.type.startsWith('code') &&
                        <Button type={'primary'} onClick={this.send}>Execute</Button>}
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
    settings: PropTypes.shape({}),

    deleteCell: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired,
    setLanguage: PropTypes.func.isRequired,
    setSlate: PropTypes.func.isRequired,
    setActive: PropTypes.func.isRequired,
};

Cell.defaultProps = {
    cell: undefined,
    settings: undefined,
};

export default onlyUpdateForKeys(['cell', 'settings'])(Cell);
