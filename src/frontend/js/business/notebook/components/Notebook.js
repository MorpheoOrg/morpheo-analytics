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
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {onlyUpdateForKeys} from 'recompose';

import actions from '../actions';
import {message as messageActions} from '../../kernel/actions';
import Editor from './Editor';

const box = {
    display: 'inline-block',
    verticalAlign: 'top',
    width: '50%',
    overflow: 'auto',
};

const style = {
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
};

class Notebook extends React.Component {

    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.selectLanguage = this.selectLanguage.bind(this);
    }

    selectLanguage(language) {
        const {slateState} = this.props;
        const code_block = slateState.document.getParent(slateState.startBlock.key);
        const state = slateState.transform().setNodeByKey(code_block.key, {
            data: {
                ...code_block.data,
                syntax: language,
            },
        }).focus().apply();
        this.props.setLanguage({language, state});
    }

    send() {
        console.log('send');
        //this.props.send({code: this.props.cell.value, id: this.props.cell.id});
    }

    render() {
        const {slateState, cells, settings, set, send, setSlate} = this.props;

        return (
            <div style={style.main}>
                <Editor
                    set={set}
                    setSlate={setSlate}
                    state={slateState}
                    cells={cells}
                    settings={settings}
                    selectLanguage={this.selectLanguage}
                    send={send}
                />
            </div>);
    }
}

Notebook.propTypes = {
    cells: PropTypes.arrayOf(PropTypes.shape({})),
    slateState: PropTypes.shape({}),
    settings: PropTypes.shape({
        preferred_language: PropTypes.number,
    }),

    send: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired,
    setLanguage: PropTypes.func.isRequired,
    setSlate: PropTypes.func.isRequired,
};

Notebook.defaultProps = {
    cells: [],
    slateState: undefined,
    settings: undefined,
};

const mapStateToProps = state => ({
    slateState: state.notebook.slate.state,
    line_numbers: state.notebook.slate.line_numbers,
    cells: state.notebook.cells.results,
    settings: state.settings,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    set: actions.set,
    save: actions.save.request,
    setLanguage: actions.setLanguage,
    setSlate: actions.setSlate,
    send: messageActions.send,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys(['slateState', 'settings', 'cells', 'line_numbers'])(Notebook));
