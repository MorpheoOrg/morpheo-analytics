import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Select, Button} from 'antd';
import withUserAgent from 'react-useragent';

import languages from '../languages';
import Cell from './cell';
import '../../../../../../../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css';
import theme from '../../../../../../css/variables';

const Option = Select.Option;

const left = 200;

const style = {
    code: {
        position: 'relative',
        marginLeft: left,
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
        position: 'absolute',
        top: 10,
        left: left * -1,
        display: 'inline-block',
        verticalAlign: 'top',
        width: '29%',
    },
    button: {
        cursor: 'pointer',
        color: '#fff',
        backgroundColor: theme['primary-color'],
        borderColor: theme['primary-color'],
        border: '1px solid transparent',
        outline: 0,
        lineHeight: 1.5,
        fontSize: 12,
        borderRadius: 4,
        padding: '4px 15px',
    },
};

class CodeBlock extends React.Component {
    toggleCode = e => this.props.onToggleCode('paragraph', this.props.node.key);
    execute = e => this.props.onExecute(this.props.node.key);
    remove = e => this.props.remove(this.props.node.key);
    render() {
        const {
            node, state, cells, line_numbers, selectLanguage, defaultLanguage,
        } = this.props;

        const linesNumber = node.getTexts().size;
        const isFocused = state.selection.hasEdgeIn(node);
        const isFirefox = !!~this.props.ua.md.ua.indexOf('Firefox/');

        const cell = cells.find(c => c.parent_id === parseInt(node.key, 10));

        return (
            <div style={style.code}>
                <div contentEditable={false} style={style.select}>
                    <Select
                        defaultValue={node.data.get('syntax') || defaultLanguage}
                        onChange={e => selectLanguage(node.key, e)}
                    >
                        {languages.map(o =>
                            (<Option key={o} value={o}>
                                <span>{o}</span>
                            </Option>),
                        )}
                    </Select>
                </div>
                <div style={style.actions} contentEditable={false}>
                    {isFirefox && <button
                        type="button"
                        className="toggle"
                        style={style.button}
                        onMouseDown={this.toggleCode}
                        contentEditable={false}
                    />
                    }
                    {isFirefox && <button
                        type="button"
                        className="execute"
                        style={style.button}
                        onMouseDown={this.execute}
                        contentEditable={false}
                    />
                    }
                    {!isFirefox &&
                    <Button
                        type={'primary'}
                        onMouseDown={this.toggleCode}
                    >Toggle</Button>
                    }
                    {!isFirefox &&
                    <Button
                        type={'primary'}
                        onMouseDown={this.execute}
                    >Execute</Button>
                    }
                    <Button onClick={this.remove} icon="delete" />
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
    node: PropTypes.shape({
        key: PropTypes.string,
    }).isRequired,
    cells: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    line_numbers: PropTypes.bool.isRequired,
    selectLanguage: PropTypes.func.isRequired,
    onExecute: PropTypes.func.isRequired,
    onToggleCode: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    defaultLanguage: PropTypes.string.isRequired,
    attributes: PropTypes.shape({}).isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    ua: PropTypes.shape({
        md: PropTypes.shape({
            ua: PropTypes.string,
        }),
    }).isRequired,
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
export default connect(mapStateToProps)(withUserAgent(CodeBlock));
