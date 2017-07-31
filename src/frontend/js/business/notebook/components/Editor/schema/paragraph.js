import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';
import withUserAgent from 'react-useragent';
import theme from '../../../../../../css/variables';

const left = 200;

const style = {
    wrapper: {
        position: 'relative',
        marginLeft: left,
    },
    p: isFocused => ({
        display: 'inline-block',
        verticalAlign: 'top',
        border: `1px solid ${isFocused ? '#3f8bea' : 'rgba(0, 0,0, 0.1)'}`,
        padding: 10,
        width: '60%',
    }),
    actions: {
        position: 'absolute',
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
};

class Paragraph extends React.Component {
    toggleCode = e => this.props.onToggleCode('code', this.props.node.key);
    remove = e => this.props.remove(this.props.node.key);

    render() {
        const {node, state, attributes, children} = this.props;
        const isFocused = state.selection.hasEdgeIn(node);
        const isFirefox = !!~this.props.ua.md.ua.indexOf('Firefox/');

        return (
            <div style={style.wrapper}>
                <div style={style.actions} contentEditable={false}>
                    {isFirefox && <button
                        type="button"
                        className="toggle"
                        style={style.button}
                        onMouseDown={this.toggleCode}
                        contentEditable={false}/>
                    }
                    {!isFirefox &&
                    <Button
                        type={'primary'}
                        onMouseDown={this.toggleCode}
                        contentEditable={false}
                    >Toggle</Button>}

                    <Button
                        onMouseDown={this.remove}
                        icon="delete"
                        contentEditable={false}
                        readOnly
                        unselectable="ON"/>
                </div>
                <p
                    {...attributes}
                    style={style.p(isFocused)}
                    contentEditable
                    suppressContentEditableWarning
                >{children}</p>
            </div>);
    }
}

Paragraph.propTypes = {
    node: PropTypes.shape({
        key: PropTypes.string,
    }).isRequired,
    state: PropTypes.shape({}).isRequired,
    onToggleCode: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    attributes: PropTypes.shape({}).isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default withUserAgent(Paragraph);
