import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Select, Button} from 'antd';
import keydown from 'react-keydown';

import opts from '../opts';
import KEYS from '../keys';

import languages from '../languages';
import Cell from './cell';
import '../../../../../../../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css';

const Option = Select.Option;

const style = {
    code: {
        position: 'relative',
    },
    left: {
        display: 'inline-block',
        verticalAlign: 'top',
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
        width: '60%',
        border: `1px solid ${isFocused ? '#3f8bea' : 'transparent'}`,
    }),
    rows: {
        khtmlUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
    },
    actions: {
        display: 'inline',
    },
};

class CodeBlock extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.keydown.event) {
            // prevent infinite loop
            const {key, ctrlKey, shiftKey} = nextProps.keydown.event;
            nextProps.keydown.event = null; // eslint-disable-line no-param-reassign
            // TODO, get KEYS from reducer user settings
            if (ctrlKey || shiftKey) {
                const {state} = nextProps;
                const document = state.document;

                let node = state.startBlock;
                if (node.type === opts.lineType) {
                    node = document.getParent(node.key);
                }
                const index = document.nodes.findIndex(o => o.key === node.key);

                if (ctrlKey) {
                    if (key === KEYS.above) { // above == before
                        this.props.addInnerParagraphCell(index);
                    }
                    else if (key === KEYS.below) { // below == after
                        this.props.addInnerParagraphCell(index + 1);
                    }
                }

                if (shiftKey && key === KEYS.enter) {
                    this.props.onExecute(node.key);
                }
            }
        }
    }

    onFocus = () => {
        const state = this.props.editor.props.state.transform().collapseToStartOf(this.props.node).focus().apply();
        if (!this.props.state.selection.hasEdgeIn(this.props.node)) {
            this.props.setSlate({state});
        }
    };

    render() {
        const {
            node, state, cells, line_numbers, selectLanguage, defaultLanguage,
            onExecute, onToggleCode, remove,
        } = this.props;

        const linesNumber = node.getTexts().size;
        const isFocused = state.selection.hasEdgeIn(node);

        const cell = cells.find(c => c.parent_id === parseInt(node.key, 10));

        return (
            <div style={style.code} onFocus={this.onFocus} contentEditable={false}>
                <div style={style.actions} contentEditable={false}>
                    <Select
                        style={style.select}
                        defaultValue={node.data.get('syntax') || defaultLanguage}
                        onChange={e => selectLanguage(node.key, e)}
                    >
                        {languages.map(o =>
                            (<Option key={o} value={o}>
                                <span>{o}</span>
                            </Option>),
                        )}
                    </Select>
                    <div style={style.left}>
                        <Button
                            type={'primary'}
                            onMouseDown={e => onToggleCode('paragraph', node.key)}
                        >Toggle</Button>
                        <Button
                            type={'primary'}
                            onMouseDown={e => onExecute(node.key)}
                        >Execute</Button>
                        <Button onClick={e => remove(node.key)} icon="delete" />
                    </div>
                </div>
                <pre
                    style={style.pre(isFocused)}
                    className={`language-${node.data.get('syntax')}${line_numbers ? ' line-numbers' : ''}`}
                    contentEditable
                    suppressContentEditableWarning
                >
                    <code className={`language-${node.data.get('syntax')}`} {...this.props.attributes}>
                        {line_numbers &&
                        <span
                            className="line-numbers-rows"
                            style={style.rows}
                            contentEditable={false}
                        >
                            {[...Array(linesNumber).keys()].map(o =>
                                <span key={o} />,
                            )}
                        </span>}
                        {this.props.children}
                    </code>
                </pre>
                {cell && <Cell content={cell.content} type={cell.type} />}
            </div>);
    }
}

CodeBlock.propTypes = {
    keydown: PropTypes.shape({
        event: PropTypes.shape({}),
    }),
    state: PropTypes.shape({
        selection: PropTypes.shape({
            anchorKey: PropTypes.string,
            anchorOffset: PropTypes.number,
            focusKey: PropTypes.string,
            focusOffset: PropTypes.number,
            hasEdgeIn: PropTypes.func,
        }),
        transform: PropTypes.func,
    }).isRequired,
    editor: PropTypes.shape({
        props: PropTypes.shape({
            state: PropTypes.shape({
                transform: PropTypes.func,
            }),
        }),
    }).isRequired,
    node: PropTypes.shape({}).isRequired,
    cells: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    line_numbers: PropTypes.bool.isRequired,
    selectLanguage: PropTypes.func.isRequired,
    onExecute: PropTypes.func.isRequired,
    onToggleCode: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    defaultLanguage: PropTypes.string.isRequired,
    attributes: PropTypes.shape({}).isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    setSlate: PropTypes.func.isRequired,
    addInnerParagraphCell: PropTypes.func.isRequired,
};

CodeBlock.defaultProps = {
    keydown: null,
};

const mapStateToProps = (state, props) => ({
    ...props,
    cells: state.notebook.cells.results,
    line_numbers: state.settings.line_numbers,
});

// we need to connect to cells for bypassing slate schema rendering
export default connect(mapStateToProps)(keydown(CodeBlock));
