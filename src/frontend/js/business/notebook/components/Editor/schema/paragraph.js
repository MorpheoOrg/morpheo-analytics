import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';

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
};

class Paragraph extends React.Component {
    render() {
        const {node, state, remove, onToggleCode, attributes, children} = this.props;
        const isFocused = state.selection.hasEdgeIn(node);

        return (
            <div style={style.wrapper}>
                <div style={style.actions} contentEditable={false}>
                    <Button
                        type={'primary'}
                        onMouseDown={e => onToggleCode('code', node.key)}
                        contentEditable={false}
                    >
                        Toggle
                    </Button>
                    <Button onMouseDown={e => remove(node.key)} icon="delete"/>
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
    node: PropTypes.shape({}).isRequired,
    state: PropTypes.shape({}).isRequired,
    onToggleCode: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    attributes: PropTypes.shape({}).isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Paragraph;
