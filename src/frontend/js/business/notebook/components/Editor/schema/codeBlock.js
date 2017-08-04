import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Menu, {MenuItem} from 'material-ui/Menu';
import Button from 'material-ui/Button';
import withUserAgent from 'react-useragent';

import languages from '../languages';
import Cell from './cell';
import '../../../../../../../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css';
import theme from '../../../../../../css/variables';


const left = 250;

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
        top: 0,
        left: left * -1,
        display: 'inline-block',
        verticalAlign: 'top',
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
    b: {
        marginRight: 5,
    },
};

class CodeBlock extends React.Component {
    state = {
        anchorEl: undefined,
        open: false,
        selectedIndex: languages.findIndex(o => o === (this.props.node.data.get('syntax') || this.props.defaultLanguage)),
    };
    toggleCode = e => this.props.onToggleCode('paragraph', this.props.node.key);
    execute = e => this.props.onExecute(this.props.node.key);
    remove = e => this.props.remove(this.props.node.key);
    handleClick = (event) => {
        this.setState({open: true, anchorEl: event.currentTarget});
    };
    handleRequestClose = (e) => {
        this.setState({open: false});
    };
    selectLanguage = (o) => {
        this.props.selectLanguage(this.props.node.key, o);
        this.setState({open: false});
    };

    render() {
        const {
            node, state, cells, line_numbers, defaultLanguage,
        } = this.props;

        const linesNumber = node.getTexts().size;
        const isFocused = state.selection.hasEdgeIn(node);
        const isFirefox = !!~this.props.ua.md.ua.indexOf('Firefox/');

        const cell = cells.find(c => c.parent_id === parseInt(node.key, 10));

        return (
            <div style={style.code}>
                <div contentEditable={false} style={style.select}>
                    <Button aria-owns="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                        {node.data.get('syntax') || defaultLanguage}
                    </Button>
                    <Menu
                        anchorEl={this.state.anchorEl}
                        open={this.state.open}
                        onRequestClose={this.handleRequestClose}
                    >
                        {languages.map((o, i) =>
                            (<MenuItem
                                key={o}
                                selected={i === this.state.selectedIndex}
                                onClick={e => this.selectLanguage(o, i)}
                            >{o}</MenuItem>),
                        )}
                    </Menu>
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
                        raised
                        color={'primary'}
                        style={style.b}
                        onMouseDown={this.toggleCode}
                    >Toggle</Button>
                    }
                    {!isFirefox &&
                    <Button
                        raised
                        color={'primary'}
                        onMouseDown={this.execute}
                    >Execute</Button>
                    }
                    <IconButton onClick={this.remove}>
                        <DeleteIcon />
                    </IconButton>
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
        data: PropTypes.shape({
            get: PropTypes.func,
        }),
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
