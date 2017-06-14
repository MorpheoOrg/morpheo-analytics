/**
 * Created by guillaume on 6/14/17.
 */

import {Text, Block} from 'slate';

const wrapParagraph = (opts, transform) => {
    const {state} = transform;
    const {startBlock} = state;

    const parentBlock = state.document.getParent(startBlock.key);

    const text = parentBlock.getTexts().map(t => t.text).join('\n');

    // add paragraph and unwrap it for putting it on the same level of code_block
    transform.insertBlock(Block.create(
        {
            type: opts.exitBlockType,
            nodes: [Text.createFromString(text)],
        },
    )).unwrapBlock();

    // if need to delete remaining code_block with code lines in new state
    if (transform.state.document.getNode(parentBlock.key)) {
        // remove code line
        // parentBlock.nodes.forEach((node) => {
        //     console.log(state.document, node.key, state.document.getDescendant(node.key));
        //     transform.removeNodeByKey(node.key, {normalize: false});
        // });

        transform.removeNodeByKey(parentBlock.key, {normalize: false});
    }

    return transform;
};

export default wrapParagraph;
