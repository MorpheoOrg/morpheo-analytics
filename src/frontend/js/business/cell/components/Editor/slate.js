/**
 * Created by guillaume on 5/4/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Editor, Text, Block, Document} from 'slate';
import PluginEditCode from 'slate-edit-code';
import PluginPrism from 'slate-prism';
import {Select} from 'antd';

import '../../../../../../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css';
import languages from './languages';

import opts from './opts';
import onKeyDown from './onKeyDown';
import schema from './schema';
import getCurrentCode from '../../../../../../../node_modules/slate-edit-code/dist/getCurrentCode';
import deserializeCode from '../../../../../../../node_modules/slate-edit-code/dist/deserializeCode';

const Option = Select.Option;

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
    main: {
        float: 'right',
        margin: '0 0 2px 0',
    },
    select: {
        width: 100,
    },
    editor: {
        clear: 'right',
    },
};

const regexPrefix = '^```',
    regexSuffix = '([\\s\\S]*?)```$';

const languagesMap = languages.map(l => ({
    language: l,
    regex: new RegExp(`${regexPrefix}${l}${regexSuffix}`, 'g'),
}));

// TODO: put a throttle on return key for avoiding lag
class SlateEditor extends React.Component {

    static onKeyDown(e, data, state) {
        return onKeyDown(e, data, state, opts);
    }

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onBeforeInput = this.onBeforeInput.bind(this);
        SlateEditor.onKeyDown = SlateEditor.onKeyDown.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onToggleCode = this.onToggleCode.bind(this);
        this.onPaste = this.onPaste.bind(this);
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

    wrapCodeBlockByKey(opts, transform, key, o) {
        const {state} = transform;
        const {document} = state;

        const startBlock = document.getDescendant(key);
        let text = startBlock.text;

        // Remove all child
        startBlock.nodes.forEach((node) => {
            transform.removeNodeByKey(node.key, {normalize: false});
        });

        // do we need to transform from language markdown
        const res = o.regex.exec(text);
        if (res) {
            text = text.substring(1, res['1'].length - 1 || 1);
        }

        // Insert new text
        const toInsert = deserializeCode(opts, text);

        toInsert.nodes.forEach((node, i) => {
            transform.insertNodeByKey(startBlock.key, i, node);
        });

        // Set node type
        transform.setNodeByKey(startBlock.key, {
            type: opts.containerType,
            data: {syntax: o.language},
        });

        return transform;
    }

    wrapCodeBlock(transform, o) {
        const {state} = transform;
        const {startBlock, selection} = state;

        // Convert to code block
        transform = this.wrapCodeBlockByKey(opts, transform, startBlock.key, o);

        // TODO, find a way to correctly set the offset on a multilines code
        // Move selection back in the block
        transform = transform
            .collapseToStartOf(transform.state.document.getDescendant(startBlock.key))
            .moveOffsetsTo(0);// selection.startOffset - 7);

        return transform;
    }

    wrapParagraph(transform) {
        const {state} = transform;
        const {startBlock} = state;

        const parentBlock = state.document.getParent(startBlock.key);

        const text = parentBlock.getTexts().map(t => t.text).join('\n');

        // add paragraph and unwrap it for putting it on the same level of code_block
        transform.insertBlock(Block.create(
            {
                type: opts.exitBlockType,
                nodes: [Text.createFromString(text)],
            },
        )).unwrapBlock();

        // remove code line
        parentBlock.nodes.forEach((node) => {
            transform.removeNodeByKey(node.key, {normalize: false});
        });
        // remove code block
        transform.removeNodeByKey(parentBlock.key, {normalize: false});

        return transform;
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
                    newState = this.wrapCodeBlock(state.transform(), l).focus().apply();
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

    onToggleCode() {
        let newState = this.props.cell.slateState;

        // transform to paragraph
        if (pluginEditCode.utils.isInCodeBlock(this.props.cell.slateState)) {
            newState = this.wrapParagraph(newState.transform()).focus().apply();
        }
        // transform to code
        else {
            const language = this.props.user.preferred_language || languages[0];
            const l = languagesMap.find(o => o.language === language);
            newState = this.wrapCodeBlock(newState.transform(), l).focus().apply();
        }

        this.props.setSlate({state: newState, id: this.props.cell.id});
    }

    /**
     * User is pasting content, insert it as text
     */
    onPaste(event, data, state) {
        const currentCode = getCurrentCode(opts, state);

        // Convert to text if needed
        let text;
        if (data.type === 'fragment') {
            text = data.fragment.getTexts().map(t => t.text).join('\n');
        } else {
            text = data.text;
        }

        const {endBlock} = state;
        if (!currentCode || !currentCode.hasDescendant(endBlock.key)) {
            return state.transform().insertText(text).apply();
        }

        // Convert the text to code lines
        const lines = deserializeCode(opts, text).nodes;

        const fragment = Document.create({nodes: lines});

        return state.transform()
            .insertFragment(fragment)
            .apply();
    }

    render() {
        const {cell: {slateState}, user: {theme, preferred_language}, selectLanguage} = this.props;

        // TODO put in a selector
        const syntax = slateState.document.getParent(slateState.startBlock.key).data.get('syntax');

        return (
            <div>
                <button onClick={this.onToggleCode}>
                    {pluginEditCode.utils.isInCodeBlock(slateState) ? 'Paragraph' : 'Code Block'}
                </button>
                {slateState.startBlock.type.startsWith('code') &&
                <div style={style.main}>
                    <Select
                        style={style.select}
                        defaultValue={syntax || preferred_language || languages[0]}
                        onChange={selectLanguage}
                    >
                        {languages.map(o =>
                            <Option key={o} value={o}>{o}</Option>,
                        )}
                    </Select>
                </div>
                }
                <Editor
                    style={style.editor}
                    className={theme || 'default'}
                    plugins={plugins}
                    state={slateState}
                    onChange={this.onChange}
                    onKeyDown={SlateEditor.onKeyDown}
                    onPaste={this.onPaste}
                    onBeforeInput={this.onBeforeInput}
                    onBlur={this.onBlur}
                    schema={schema(true)}
                />
            </div>
        );
    }
}

SlateEditor.propTypes = {
    setSlate: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired,
    selectLanguage: PropTypes.func.isRequired,

    cell: PropTypes.shape({
        id: PropTypes.number,
        slateState: PropTypes.shape({}),
    }).isRequired,
    user: PropTypes.shape({
        preferred_language: PropTypes.string,
        theme: PropTypes.string,
    }).isRequired,
};

export default SlateEditor;

