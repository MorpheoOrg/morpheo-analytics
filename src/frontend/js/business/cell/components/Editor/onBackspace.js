import endsWith from 'ends-with';

import getCurrentIndent from '../../../../../../../node_modules/slate-edit-code/dist/getCurrentIndent';
import getCurrentCode from '../../../../../../../node_modules/slate-edit-code/dist/getCurrentCode';

/**
 * User pressed Delete in an editor:
 * Remove last idnentation before cursor
 */
function onBackspace(event, data, state, opts) {
    if (state.isExpanded) {
        return;
    }

    const {
        startOffset,
        startText,
    } = state;

    const currentLine = state.startBlock;

    // Detect and remove indentation at cursor
    const indent = getCurrentIndent(opts, state);
    const beforeSelection = currentLine.text.slice(0, startOffset);

    // If the line before selection ending with the indentation?
    if (endsWith(beforeSelection, indent)) {
        // Remove indent
        event.preventDefault();

        return state.transform()
            .deleteBackward(indent.length)
            .focus()
            .apply();
    }

    // Otherwise check if we are in an empty code container...
    else if (opts.exitBlockType) {

        const currentCode = getCurrentCode(opts, state);
        const isStartOfCode = startOffset === 0
            && currentCode.getFirstText() === startText;
        // PERF: avoid checking for whole currentCode.text
        const isEmpty = currentCode.nodes.size === 1 && currentLine.text.length === 0;

        if (isStartOfCode && isEmpty) {
            event.preventDefault();

            // prevent from exiting code block
            return state.transform().insertText('').apply();

            // Convert it to default exit type
            // return state.transform()
            //     .setBlock(opts.exitBlockType)
            //     .unwrapNodeByKey(currentLine.key)
            //     .apply();
        }
    }
}

export default onBackspace;
