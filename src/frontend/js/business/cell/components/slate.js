/**
 * Created by guillaume on 5/4/17.
 */
import React from 'react';
import {Editor, Raw} from 'slate';
import PluginEditCode from 'slate-edit-code';
import PluginPrism from 'slate-prism';
import PrismPython from '!!raw-loader!../../../../../../node_modules/prismjs/components/prism-python.js';

import '../../../../../../node_modules/prismjs/themes/prism.css';

const onlyInCode = (node => node.type === 'code_block');

// load python language
eval(PrismPython);

const plugins = [
    PluginPrism({
        onlyIn: onlyInCode,
        getSyntax: (node => node.data.get('syntax')),
    }),
    PluginEditCode({
        onlyIn: onlyInCode,
    }),
];

/**
 * Define a schema.
 *
 * @type {Object}
 */

const codeStyle = {
    backgroundColor: '#f5f5f5',
    padding: 15,
};

const schema = {
    nodes: {
        code_block: {
            render: props => <pre style={codeStyle}><code {...props.attributes}>{props.children}</code></pre>,
        },
    },
};

class SlateEditor extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.state = {
            state: Raw.deserialize({
                nodes: [
                    {
                        kind: 'block',
                        type: 'code_block',
                        data: {syntax: this.props.cell.language || 'python'},
                        nodes: [
                            {
                                kind: 'text',
                                ranges: [
                                    {
                                        text: this.props.cell.value || '',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            }, {terse: true}),
        };
    }

    onChange(state) {
        this.setState({
            state,
        });
    }

    onBlur(e) {
        // format code for having correct return
        const value = Raw.serialize(this.state.state, {terse: true}).nodes[0].nodes.map(o => o.nodes[0].text).join('\n');
        this.props.set({value, id: this.props.cell.id});
    }

    render() {
        return (
            <div>
                <Editor
                    placeholder={'Enter some code...'}
                    plugins={plugins}
                    state={this.state.state}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    schema={schema}
                />
            </div>
        );
    }
}

export default SlateEditor;

