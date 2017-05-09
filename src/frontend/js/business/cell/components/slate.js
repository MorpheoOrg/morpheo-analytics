/**
 * Created by guillaume on 5/4/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Editor, Raw} from 'slate';
import PluginEditCode from 'slate-edit-code';
import PluginPrism from 'slate-prism';
import PrismPython from '!!raw-loader!../../../../../../node_modules/prismjs/components/prism-python.js';
import PrismR from '!!raw-loader!../../../../../../node_modules/prismjs/components/prism-r.js';

import '../../../../../../node_modules/prismjs/themes/prism.css';

const onlyInCode = (node => node.type === 'code_block');

// load python and R language
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
    overflowX: 'auto',
    width: '100%',
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
        const nodes = Raw.serialize(state, {terse: true}).nodes;

        // do not allow code block suppression by a default paragraph
        if (nodes.length && nodes[0].type !== 'paragraph') {
            this.props.setSlate({state, id: this.props.cell.id});
        }
    }

    onBlur(e) {
        // format code for having correct return

        const nodes = Raw.serialize(this.props.cell.slateState, {terse: true}).nodes;

        if (nodes) {
            const value = nodes[0].nodes.map(o => o.nodes.length ? o.nodes[0].text : []).join('\n');
            this.props.set({value, id: this.props.cell.id});
        }
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

SlateEditor.propTypes = {
    setSlate: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired,
    cell: PropTypes.shape({
        id: PropTypes.number,
        slateState: PropTypes.shape({}),
    }).isRequired,
};

export default SlateEditor;

