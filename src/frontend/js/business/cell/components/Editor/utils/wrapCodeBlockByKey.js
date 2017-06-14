/**
 * Created by guillaume on 6/14/17.
 */

import deserializeCode from '../../../../../../../../node_modules/slate-edit-code/dist/deserializeCode';

const wrapCodeBlockByKey = (opts, transform, key, o) => {
    const {state} = transform;
    const {document} = state;

    const startBlock = document.getDescendant(key);
    let text = startBlock.text;

    // Remove all child
    startBlock.nodes.forEach((node) => {
        transform.removeNodeByKey(node.key, {normalize: false});
    });

    // do we need to transform from language markdown
    const res = o.regex.exec(text);

    if (res) {
        text = res['1'].substring(1, (res['1'].length - 1) || 1);
    }

    // Insert new text
    const toInsert = deserializeCode(opts, text);

    toInsert.nodes.forEach((node, i) => {
        transform.insertNodeByKey(startBlock.key, i, node);
    });

    // Set node type
    transform.setNodeByKey(startBlock.key, {
        type: opts.containerType,
        data: {syntax: o.language},
    });

    return transform;
};

export default wrapCodeBlockByKey;
