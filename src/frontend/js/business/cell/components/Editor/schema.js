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
import {Select, Button} from 'antd';

import languages from './languages';
import '../../../../../../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css';

// Define a schema.

const style = {
    code: {
        position: 'relative',
    },
    left: {
        display: 'inline-block',
        verticalAlign: 'top',
        margin: '0 1% 0 0',
        width: '29%',
    },
    select: {
        position: 'absolute',
        top: 10,
        right: 0,
    },
    pre: isFocused => ({
        display: 'inline-block',
        verticalAlign: 'top',
        width: '50%',
        border: `1px solid ${isFocused ? '#3f8bea' : 'transparent'}`,
    }),
    p: isFocused => ({
        display: 'inline-block',
        verticalAlign: 'top',
        border: `1px solid ${isFocused ? '#3f8bea' : 'rgba(0, 0,0, 0.1)'}`,
        padding: 10,
        width: '70%',
    }),
    pActions: {
        display: 'inline-block',
        verticalAlign: 'top',
        width: '29%',
    },
};

/* eslint-disable */

const schema = ({line_numbers, onExecute, onToggleCode, defaultLanguage, selectLanguage, remove}) => ({
    nodes: {
        code_block: {
            render: (props) => {
                const {editor, node, state} = props;
                const linesNumber = node.getTexts().size;
                const isFocused = state.selection.hasEdgeIn(node);

                return (<div style={style.code}
                             contentEditable={false}>
                    <Select
                        style={style.select}
                        defaultValue={node.data.get('syntax') || defaultLanguage}
                        onChange={(e) => selectLanguage(node.key, e)}
                    >
                        {languages.map(o =>
                            <Select.Option key={o} value={o}>
                                <span>{o}</span>
                            </Select.Option>,
                        )}
                    </Select>
                    <div style={style.left}>
                        <Button type={'primary'}
                                onMouseDown={(e) => onToggleCode('paragraph', node.key)}>Toggle</Button>
                        <Button type={'primary'}
                                onMouseDown={(e) => onExecute(node.getTexts().map(t => t.text).join('\n'))}>Execute</Button>
                        <Button onClick={(e) => remove(node.key)} icon="delete"/>
                    </div>
                    <pre
                        style={style.pre(isFocused)}
                        className={`language-${node.data.get('syntax')} line-numbers`}
                        contentEditable={true}
                        suppressContentEditableWarning
                    >
                        <code className={`language-${node.data.get('syntax')}`}
                              {...props.attributes}
                        >
                            {editor.props.line_numbers && <span className="line-numbers-rows">
                                {[...Array(linesNumber).keys()].map(o =>
                                    <span key={o}/>,
                                )}
                            </span>
                            }
                            {props.children}
                        </code>
                    </pre>
                </div>);
            },
        },
        paragraph: {
            render: props => {
                const {node, state} = props;
                const isFocused = state.selection.hasEdgeIn(node);
                return (<div contentEditable={false}>
                    <div style={style.pActions}>
                        <Button type={'primary'}
                                onMouseDown={(e) => onToggleCode('code', node.key)}>
                            Toggle
                        </Button>
                        <Button onMouseDown={(e) => remove(node.key)} icon="delete"/>
                    </div>
                    <p {...props.attributes} style={style.p(isFocused)} contentEditable={true} suppressContentEditableWarning>{props.children}</p>
                </div>);
            },
        },
    },
});

/* eslint-enable */

export default schema;

