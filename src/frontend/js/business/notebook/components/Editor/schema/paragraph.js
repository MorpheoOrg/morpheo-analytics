import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';

const style = {
    p: isFocused => ({
        display: 'inline-block',
        verticalAlign: 'top',
        border: `1px solid ${isFocused ? '#3f8bea' : 'rgba(0, 0,0, 0.1)'}`,
        padding: 10,
        width: '60%',
    }),
    pActions: {
        display: 'inline-block',
        verticalAlign: 'top',
        width: '29%',
    },
};

const Paragraph = ({node, state, remove, onToggleCode, attributes, children}) => {
    const isFocused = state.selection.hasEdgeIn(node);
    return (<div>
        <div style={style.pActions} contentEditable={false}>
            <Button
                type={'primary'}
                onMouseDown={e => onToggleCode('code', node.key)}
            >
                Toggle
            </Button>
            <Button onMouseDown={e => remove(node.key)} icon="delete" />
        </div>
        <p
            {...attributes}
            style={style.p(isFocused)}
            contentEditable
            suppressContentEditableWarning
        >{children}</p>
    </div>);
};

Paragraph.propTypes = {
    node: PropTypes.shape({}).isRequired,
    state: PropTypes.shape({}).isRequired,
    onToggleCode: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    attributes: PropTypes.shape({}).isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Paragraph;
