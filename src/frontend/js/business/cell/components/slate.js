/**
 * Created by guillaume on 5/4/17.
 */
import React from 'react';
import {Editor, Raw} from 'slate';
import PluginEditCode from 'slate-edit-code';
import PluginPrism from 'slate-prism';
import PrismPython from '!!raw-loader!../../../../../../node_modules/prismjs/components/prism-python.js';
import PrismR from '!!raw-loader!../../../../../../node_modules/prismjs/components/prism-r.js';

import '../../../../../../node_modules/prismjs/themes/prism.css';

const onlyInCode = (node => node.type === 'code_block');

// load python and r language
eval(PrismPython);
eval(PrismR);

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
    }

    onChange(state) {
        // do not allow code block suppression by a default paragraph
        if (Raw.serialize(state, {terse: true}).nodes[0].type !== 'paragraph') {
            this.props.setSlate({state, id: this.props.cell.id});
        }
    }

    onBlur(e) {
        // format code for having correct return
        const value = Raw.serialize(this.props.cell.slateState, {terse: true}).nodes[0].nodes.map(o => o.nodes[0].text).join('\n');
        this.props.set({value, id: this.props.cell.id});
    }

    render() {
        const {cell: {slateState}} = this.props;

        return (
            <div>
                <Editor
                    plugins={plugins}
                    state={slateState}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    schema={schema}
                />
            </div>
        );
    }
}

export default SlateEditor;

