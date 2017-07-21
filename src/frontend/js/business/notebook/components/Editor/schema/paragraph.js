import React from 'react';
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
    return (<div contentEditable={false}>
        <div style={style.pActions}>
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

export default Paragraph;
