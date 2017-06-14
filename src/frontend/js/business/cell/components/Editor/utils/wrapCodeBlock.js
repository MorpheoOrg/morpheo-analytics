/**
 * Created by guillaume on 6/14/17.
 */

import wrapCodeBlockByKey from './wrapCodeBlockByKey';

const wrapCodeBlock = (opts, transform, o) => {
    const {state} = transform;
    const {startBlock} = state;

    // Convert to code block
    transform = wrapCodeBlockByKey(opts, transform, startBlock.key, o); // eslint-disable-line no-param-reassign

    // TODO, find a way to correctly set the offset on a multilines code
    // Move selection back in the block
    transform = transform  // eslint-disable-line no-param-reassign
        .collapseToStartOf(transform.state.document.getDescendant(startBlock.key))
        .moveOffsetsTo(0);// selection.startOffset - 7);

    return transform;
};

export default wrapCodeBlock;
