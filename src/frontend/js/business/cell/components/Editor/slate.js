/**
 * Created by guillaume on 5/4/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Editor} from 'slate';
import PluginEditCode from 'slate-edit-code';
import PluginPrism from 'slate-prism';
import {Select} from 'antd';

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

const Option = Select.Option;

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

    onToggleCode() {
        let newState = this.props.cell.slateState;

        // transform to paragraph
        if (pluginEditCode.utils.isInCodeBlock(this.props.cell.slateState)) {
            newState = wrapParagraph(opts, newState.transform()).focus().apply();
        }
        // transform to code
        else {
            const language = this.props.settings.preferred_language ? languages[this.props.settings.preferred_language] : languages[0];
            const l = languagesMap.find(o => o.language === language);
            newState = wrapCodeBlock(opts, newState.transform(), l).focus().apply();
        }

        this.props.setSlate({state: newState, id: this.props.cell.id});
    }

    render() {
        const {cell: {slateState}, settings: {theme, preferred_language, line_numbers}, selectLanguage} = this.props;

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
                        defaultValue={syntax || (preferred_language ? languages[preferred_language] : languages[0])}
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
                    className={theme ? themes[theme] : 'default'}
                    plugins={plugins}
                    state={slateState}
                    onChange={this.onChange}
                    onKeyDown={SlateEditor.onKeyDown}
                    onPaste={SlateEditor.onPaste}
                    onBeforeInput={this.onBeforeInput}
                    onBlur={this.onBlur}
                    line_numbers={line_numbers}
                    schema={schema({line_numbers})}
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

