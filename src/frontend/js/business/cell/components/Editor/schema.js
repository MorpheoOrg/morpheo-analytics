/**
 * Created by guillaume on 5/4/17.
 */

import React from 'react';
import {Raw} from 'slate';

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

const schema = lineNumbersDisplayed => ({
    nodes: {
        code_block: {
            render: (props) => {
                const nodes = Raw.serialize(props.state, {terse: true}).nodes;
                const linesNumber = nodes[0].nodes.length;

                return (<pre
                    style={schemaStyle.code}
                    className={`language-${nodes[0].data.syntax} line-numbers`}
                >
                    <code className={`language-${nodes[0].data.syntax}`} {...props.attributes}>
                        {lineNumbersDisplayed && <span className="line-numbers-rows">
                            {[...Array(linesNumber).keys()].map(o =>
                                <span key={o}/>,
                            )}
                        </span>
                        }
                        {props.children}
                    </code>
                </pre>);
            },
        },
        paragraph: {
            render: (props) => {
                return <p style={schemaStyle.p}>{props.children}</p>;
            },
        },
    },
});

export default schema;

