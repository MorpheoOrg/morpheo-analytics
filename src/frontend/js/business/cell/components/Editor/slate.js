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

const Option = Select.Option;

const onlyInCode = (node => node.type === 'code_block');

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
    width: '100%',
};

const schema = lineNumbersDisplayed => ({
    nodes: {
        code_block: {
            render: (props) => {
                const nodes = Raw.serialize(props.state, {terse: true}).nodes;
                const linesNumber = nodes[0].nodes.length;

                return (<pre
                    style={codeStyle}
                    className={`language-${nodes[0].data.syntax} line-numbers`}
                >
                    <code className={`language-${nodes[0].data.syntax}`} {...props.attributes}>
                        {lineNumbersDisplayed && <span className="line-numbers-rows">
                            {[...Array(linesNumber).keys()].map(o =>
                                <span key={o} />,
                        )}
                        </span>
                        }
                        {props.children}
                    </code>
                </pre>);
            },
        },
    },
});

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

// TODO: put a throttle on return key for avoiding lag

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
        const {cell: {slateState}, user, selectLanguage} = this.props;

        return (
            <div>
                <div style={style.main}>
                    <Select
                        style={style.select} defaultValue={user.preferred_languages || languages[0]}
                        onChange={selectLanguage}
                    >
                        {languages.map(o =>
                            <Option key={o} value={o}>{o}</Option>,
                        )}
                    </Select>
                </div>
                <Editor
                    style={style.editor}
                    className={user.theme || 'default'}
                    plugins={plugins}
                    state={slateState}
                    onChange={this.onChange}
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

