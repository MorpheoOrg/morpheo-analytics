import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Select, Button} from 'antd';

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
};

class CodeBlock extends React.Component {
    render() {
        const {
            node, state, cells, line_numbers, selectLanguage, defaultLanguage,
            onExecute, onToggleCode, remove,
        } = this.props;

        const linesNumber = node.getTexts().size;
        const isFocused = state.selection.hasEdgeIn(node);

        const cell = cells.find(c => c.parent_id === parseInt(node.key, 10));

        return (<div
            style={style.code}
            contentEditable={false}
        >
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
    node: PropTypes.shape({}).isRequired,
    state: PropTypes.shape({}).isRequired,
    cells: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    line_numbers: PropTypes.bool.isRequired,
    selectLanguage: PropTypes.func.isRequired,
    onExecute: PropTypes.func.isRequired,
    onToggleCode: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    defaultLanguage: PropTypes.string.isRequired,
    attributes: PropTypes.shape({}).isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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
export default connect(mapStateToProps)(CodeBlock);
