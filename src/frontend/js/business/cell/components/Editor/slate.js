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

import React from 'react';
import PropTypes from 'prop-types';
import {Editor, Block, Text} from 'slate';
import PluginEditCode from 'slate-edit-code';
import PluginPrism from 'slate-prism';
import {Button} from 'antd';

import '../../../../../../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css';
import languages from './languages';
import themes from './themes';

import opts from './opts';
import onKeyDown from './onKeyDown';
import onPaste from './onPaste';
import schema from './schema';
import getCurrentCode from '../../../../../../../node_modules/slate-edit-code/dist/getCurrentCode';

import {wrapCodeBlock, wrapParagraph} from './utils';

// make opts available for dealing with custom KeyDown

const pluginEditCode = PluginEditCode(opts);

const plugins = [
    PluginPrism({
        onlyIn: (node => node.type === 'code_block'),
        getSyntax: (node => node.data.get('syntax')),
    }),
    pluginEditCode,
];

const style = {
    editor: {
        clear: 'right',
    },
    actions: {
        margin: '0 0 25px 0',
    },
};

const regexPrefix = '^```',
    regexSuffix = '([\\s\\S]*?)```$';

const languagesMap = languages.map(l => ({
    language: l,
    regex: new RegExp(`${regexPrefix}${l}${regexSuffix}`, 'g'),
}));

class SlateEditor extends React.Component {

    static onKeyDown(e, data, state) {
        return onKeyDown(e, data, state, opts);
    }

    static onPaste(e, data, state) {
        return onPaste(e, data, state, opts);
    }

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onBeforeInput = this.onBeforeInput.bind(this);
        SlateEditor.onKeyDown = SlateEditor.onKeyDown.bind(this);
        SlateEditor.onPaste = SlateEditor.onPaste.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onToggleCode = this.onToggleCode.bind(this);
        this.addInnerCodeCell = this.addInnerCodeCell.bind(this);
        this.addInnerParagraphCell = this.addInnerParagraphCell.bind(this);
        this.execute = this.execute.bind(this);
        this.remove = this.remove.bind(this);
        this.selectLanguage = this.selectLanguage.bind(this);
    }

    onBeforeInput(event, data) {
        const {anchorKey, anchorOffset, focusKey, focusOffset} = this.props.cell.slateState.selection;
        const futureState = this.props.cell.slateState.transform().select({
            anchorKey,
            anchorOffset,
            focusKey,
            focusOffset,
        }).insertText(event.data).apply();

        const {startText} = futureState;
        const text = startText.text;
        // if we detect a code transformation, return own state, no need to save it with onInput
        let exit = false;
        languages.forEach((language) => {
            const l = languagesMap.find(o => language === o.language);
            if (text.match(l.regex)) {
                // event.preventDefault();
                // Notice that is calls event.preventDefault() to prevent the default browser behavior,
                // and it returns the current state to prevent the editor from continuing to resolve its plugins stack.
                exit = true;
                return this.props.cell.slateState;
            }
        });

        return exit ? this.props.cell.slateState : undefined;
    }

    onChange(state) {
        const {startBlock, startText} = state;

        let newState = state;

        const text = startText.text;
        if (startBlock.type === 'paragraph') {
            // does not work with rRegexp.test(text), don't know why

            languages.forEach((language) => {
                const l = languagesMap.find(o => language === o.language);
                if (text.match(l.regex)) {
                    newState = wrapCodeBlock(opts, state.transform(), l).focus().apply();
                }
            });
        }

        this.props.setSlate({state: newState, id: this.props.cell.id});
    }

    onBlur(e, data, state) {
        const {startBlock, startText} = state;
        const currentCode = getCurrentCode(opts, state);

        let text = '';
        if (currentCode) {
            text = currentCode.getTexts().map(t => t.text).join('\n');
        }
        else if (startBlock.type === 'paragraph') {
            text = startText.text;
        }

        this.props.set({value: text, id: this.props.cell.id});
    }

    onToggleCode(type, key) {
        const {cell: {slateState}, settings: {preferred_language}} = this.props;
        let state = null;

        // transform to paragraph
        if (type === 'paragraph') {
            state = wrapParagraph(opts, slateState, key).focus().apply();
        }
        // transform to code
        else {
            const language = preferred_language ? languages[preferred_language] : languages[0];
            const l = languagesMap.find(o => o.language === language);

            state = wrapCodeBlock(opts, slateState, key, l).focus().apply();
        }

        this.props.setSlate({state, id: this.props.cell.id});
    }

    addInnerParagraphCell() {
        const {cell: {slateState}} = this.props;

        const document = slateState.document;
        const transform = slateState.transform();

        const block = Block.create({
            type: opts.exitBlockType,
            nodes: [Text.createFromString('')],
        });

        transform.insertNodeByKey(document.key, document.nodes.size, block);
        const newState = transform.focus().apply();

        console.log(newState);

        this.props.setSlate({state: newState, id: this.props.cell.id});
    }

    addInnerCodeCell() {
        const {cell: {slateState}, settings: {preferred_language}} = this.props;

        const document = slateState.document;
        const transform = slateState.transform();
        const language = preferred_language ? languages[preferred_language] : languages[0];

        const block = Block.create({
            data: {syntax: language},
            type: opts.containerType,
            nodes: [
                {
                    type: opts.lineType,
                    nodes: [Text.createFromString('')],
                },
            ],
        });

        transform.insertNodeByKey(document.key, document.nodes.size, block);
        const newState = transform.focus().apply();
        this.props.setSlate({state: newState, id: this.props.cell.id});
    }

    execute(value) {
        this.props.send({code: value, id: this.props.cell.id});
    }

    remove(key) {
        const {cell: {slateState}} = this.props;
        const transform = slateState.transform();
        transform.removeNodeByKey(key, {normalize: false});
        const newState = transform.apply();
        this.props.setSlate({state: newState, id: this.props.cell.id});
    }

    selectLanguage(key, syntax) {
        const {cell: {slateState}} = this.props;
        const transform = slateState.transform();
        transform.setNodeByKey(key, {
            data: {syntax},
        });
        const newState = transform.focus().apply();

        this.props.setSlate({state: newState, id: this.props.cell.id});
    }

    render() {
        const {cell: {slateState}, settings: {theme, preferred_language, line_numbers}} = this.props;

        // TODO put in a selector
        const defaultLanguage = preferred_language ? languages[preferred_language] : languages[0];

        return (
            <div>
                <div style={style.actions}>
                    <Button type={'primary'} onClick={this.addInnerParagraphCell} icon="plus">
                        Add paragraph
                    </Button>
                    <Button type={'primary'} onClick={this.addInnerCodeCell} icon="plus">
                        Add code block
                    </Button>
                </div>
                <Editor
                    style={style.editor}
                    className={theme ? themes[theme] : 'default'}
                    plugins={plugins}
                    state={slateState}
                    onChange={this.onChange}
                    onKeyDown={SlateEditor.onKeyDown}
                    onPaste={SlateEditor.onPaste}
                    onBeforeInput={this.onBeforeInput}
                    onBlur={this.onBlur}
                    line_numbers={line_numbers}
                    schema={schema({
                        line_numbers,
                        onExecute: this.execute,
                        onToggleCode: this.onToggleCode,
                        defaultLanguage,
                        selectLanguage: this.selectLanguage,
                        remove: this.remove,
                    })}
                />
            </div>
        );
    }
}

SlateEditor.propTypes = {
    setSlate: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,

    cell: PropTypes.shape({
        id: PropTypes.number,
        slateState: PropTypes.shape({
            selection: PropTypes.shape({
                anchorKey: PropTypes.string,
                anchorOffset: PropTypes.number,
                focusKey: PropTypes.string,
                focusOffset: PropTypes.number,
            }),
            transform: PropTypes.func,
        }),
    }).isRequired,
    settings: PropTypes.shape({
        preferred_language: PropTypes.number,
        theme: PropTypes.number,
    }).isRequired,
};

export default SlateEditor;

