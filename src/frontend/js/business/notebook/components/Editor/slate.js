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
import keydown from 'react-keydown';

import '../../../../../../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css';
import languages from './languages';
import themes from './themes';

import opts from './opts';
import onKeyDown from './onKeyDown';
import onPaste from './onPaste';
import schema from './schema/index';
import getCurrentCode from '../../../../../../../node_modules/slate-edit-code/dist/getCurrentCode';

import {wrapCodeBlock, wrapParagraph} from './utils';
import KEYS from './keys';


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
        this.handleAddParagraph = this.handleAddParagraph.bind(this);
        this.addInnerParagraphCell = this.addInnerParagraphCell.bind(this);
        this.addInnerCodeCell = this.addInnerCodeCell.bind(this);
        this.execute = this.execute.bind(this);
        this.remove = this.remove.bind(this);
        this.selectLanguage = this.selectLanguage.bind(this);
    }

    componentWillMount() {
        // replace first node with correct language
        const {state: {document}, settings: {preferred_language}} = this.props;
        this.selectLanguage(document.nodes.first().key, preferred_language ? languages[preferred_language] : languages[0]);
    }


    componentWillReceiveProps(nextProps) {
        // handle key from keyboard
        if (nextProps.keydown.event) {
            // prevent infinite loop
            const {key, ctrlKey, shiftKey} = nextProps.keydown.event;
            nextProps.keydown.event = null; // eslint-disable-line no-param-reassign
            // TODO, get KEYS from reducer user settings
            if (ctrlKey || shiftKey) {
                const {state} = nextProps;
                const document = state.document;

                let node = state.startBlock;
                if (node.type === opts.lineType) {
                    node = document.getParent(node.key);
                }
                const index = document.nodes.findIndex(o => o.key === node.key);

                if (ctrlKey) {
                    if (key === KEYS.above) { // above == before
                        this.addInnerParagraphCell(index);
                    }
                    else if (key === KEYS.below) { // below == after
                        this.addInnerParagraphCell(index + 1);
                    }
                }

                if (shiftKey && key === KEYS.enter) {
                    this.execute(node.key);
                }
            }
        }
    }

    onBeforeInput(event, data) {
        const {state} = this.props;
        const {anchorKey, anchorOffset, focusKey, focusOffset} = state.selection;
        const futureState = state.transform().select({
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
                return state;
            }
        });

        return exit ? state : undefined;
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
                    newState = wrapCodeBlock(opts, state, startBlock.key, l).focus().apply();
                }
            });
        }
        // TODO need to debounce this
        this.props.setSlate({state: newState});
    }

    onBlur(e, data, state) {
        const {startBlock, startText} = state;
        const currentCode = getCurrentCode(opts, state);

        let node = currentCode;

        let text = '';
        if (currentCode) {
            text = currentCode.getTexts().map(t => t.text).join('\n');
        }
        else if (startBlock.type === 'paragraph') {
            node = startText;
            text = node.text;
        }

        this.props.set({value: text, id: parseInt(node.key, 10)});
    }

    onToggleCode(type, key) {
        const {state, settings: {preferred_language}} = this.props;
        let newState = null;

        // transform to paragraph
        if (type === 'paragraph') {
            newState = wrapParagraph(opts, state, key).focus().apply();
        }
        // transform to code
        else {
            const language = preferred_language ? languages[preferred_language] : languages[0];
            const l = languagesMap.find(o => o.language === language);

            newState = wrapCodeBlock(opts, state, key, l).focus().apply();
        }

        this.props.setSlate({state: newState});
    }

    handleAddParagraph(e) {
        this.addInnerParagraphCell();
    }

    addInnerParagraphCell(index) {
        const {state} = this.props;

        const document = state.document;
        const transform = state.transform();

        const block = Block.create({
            type: opts.exitBlockType,
            nodes: [Text.createFromString('')],
        });

        transform.insertNodeByKey(document.key, typeof index !== 'undefined' ? index : document.nodes.size, block);
        const newState = transform.focus().apply();

        this.props.setSlate({state: newState});
    }

    addInnerCodeCell(e) {
        const {state, settings: {preferred_language}} = this.props;

        const document = state.document;
        const transform = state.transform();
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
        this.props.setSlate({state: newState});
    }

    execute(id) {
        const {state} = this.props;
        const {document} = state;

        // get node in last state result
        let node = document.nodes.find(o => o.key === id);
        if (node.type === opts.lineType) {
            node = document.getParent(node.key);
        }

        const code = node.getTexts().map(t => t.text).join('\n');

        this.props.send({id, code});
    }

    remove(key) {
        const {state} = this.props;
        const transform = state.transform();
        transform.removeNodeByKey(key, {normalize: false});
        const newState = transform.apply();
        this.props.setSlate({state: newState});
    }

    selectLanguage(key, syntax) {
        const {state} = this.props;
        const transform = state.transform();
        transform.setNodeByKey(key, {
            data: {syntax},
        });
        const newState = transform.focus().apply();

        this.props.setSlate({state: newState});
    }

    render() {
        const {state, settings: {theme, preferred_language, line_numbers}} = this.props;

        // TODO put in a selector
        const defaultLanguage = preferred_language ? languages[preferred_language] : languages[0];

        return (
            <div>
                <div style={style.actions}>
                    <Button type={'primary'} onClick={this.handleAddParagraph} icon="plus">
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
                    state={state}
                    onChange={this.onChange}
                    onKeyDown={SlateEditor.onKeyDown}
                    onPaste={SlateEditor.onPaste}
                    onBeforeInput={this.onBeforeInput}
                    onBlur={this.onBlur}
                    line_numbers={line_numbers}
                    schema={schema({
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

    state: PropTypes.shape({
        selection: PropTypes.shape({
            anchorKey: PropTypes.string,
            anchorOffset: PropTypes.number,
            focusKey: PropTypes.string,
            focusOffset: PropTypes.number,
        }),
        transform: PropTypes.func,
    }).isRequired,
    settings: PropTypes.shape({
        preferred_language: PropTypes.number,
        theme: PropTypes.number,
    }).isRequired,

    keydown: PropTypes.shape({
        event: PropTypes.shape({}),
    }),
};

SlateEditor.defaultProps = {
    keydown: null,
};

export default keydown(SlateEditor);
