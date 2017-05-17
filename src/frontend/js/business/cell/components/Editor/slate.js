/**
 * Created by guillaume on 5/4/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Editor, Raw} from 'slate';
import PluginEditCode from 'slate-edit-code';
import PluginPrism from 'slate-prism';
import {Select} from 'antd';

import '../../../../../../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css';
import languages from './languages';

import Options from '../../../../../../../node_modules/slate-edit-code/dist/options';
import onKeyDown from './onKeyDown';
import schema from './schema';
import getCurrentCode from '../../../../../../../node_modules/slate-edit-code/dist/getCurrentCode';

const Option = Select.Option;

// make opts available for dealing with custom KeyDown
const opts = new Options({});
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

const rRegexp = new RegExp(/^```r[\s\S]*?```$/, 'g');

// TODO: put a throttle on return key for avoiding lag

class SlateEditor extends React.Component {

    static onKeyDown(e, data, state) {
        return onKeyDown(e, data, state, opts);
    }

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        SlateEditor.onKeyDown = SlateEditor.onKeyDown.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(state) {
        const {startBlock, startText} = state;
        const currentCode = getCurrentCode(opts, state);

        let text = '';
        if (currentCode) {
            text = currentCode.getTexts().map(t => t.text).join('\n');
        }
        else if (startBlock.type === 'paragraph') {
            text = startText.text;
            if (text.match(rRegexp)) { // does not work with rRegexp.test(text), dont't knw why

                // TODO find a way to create it with an helper, and auto focus new state

                // pluginEditCode.transforms.toggleCodeBlock(state.transform(), 'paragraph')
                //     .focus()
                //     .apply()

                // const newState = pluginEditCode.transforms.wrapCodeBlock(state.transform()).focus()
                //     .apply();

                const newState = Raw.deserialize({
                    nodes: [
                        {
                            kind: 'block',
                            type: 'code_block',
                            data: {syntax: languages[1]},
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
                }, {terse: true});


                this.props.setSlate({state: newState, id: this.props.cell.id});
                return;
            }
        }

        // do not allow code block suppression by a default paragraph
        this.props.setSlate({state, id: this.props.cell.id});
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

    render() {
        const {cell: {slateState}, user: {theme, preferred_language}, selectLanguage} = this.props;

        return (
            <div>
                {slateState.startBlock.type.startsWith('code') &&
                <div style={style.main}>
                    <Select
                        style={style.select} defaultValue={slateState.startBlock.data.get('syntax') || preferred_language || languages[0]}
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

