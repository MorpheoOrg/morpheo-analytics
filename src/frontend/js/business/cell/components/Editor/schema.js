/**
 * Created by guillaume on 5/4/17.
 */

import React from 'react';

import '../../../../../../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css';

/**
 * Define a schema.
 *
 * @type {Object}
 */


const schemaStyle = {
    code: {
        width: '100%',
    },
    p: {
        border: '1px solid rgba(0, 0, 0, 0.1)',
        padding: 10,
    },
};

/* eslint-disable */

const schema = ({line_numbers}) => ({
    nodes: {
        code_block: {
            render: (props) => {
                const {editor, node} = props;
                const linesNumber = node.getTexts().size;

                return (<pre
                    style={schemaStyle.code}
                    className={`language-${node.data.get('syntax')} line-numbers`}
                >
                    <code className={`language-${node.data.get('syntax')}`} {...props.attributes}>
                        {editor.props.line_numbers && <span className="line-numbers-rows" contentEditable={false}>
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
        paragraph: {
            render: props => <p {...props.attributes} style={schemaStyle.p}>{props.children}</p>,
        },
    },
});

/* eslint-enable */

export default schema;

