import endsWith from 'ends-with';

import getCurrentIndent from '../../../../../../../node_modules/slate-edit-code/dist/getCurrentIndent';
import getCurrentCode from '../../../../../../../node_modules/slate-edit-code/dist/getCurrentCode';

/**
 * Copyright Morpheo Org. 2017
 *
 * contact@morpheo.co
 *
 * This software is part of the Morpheo project, an open-source machine
 * learning platform.
 *
 * This software is governed by the CeCILL license, compatible with the
 * GNU GPL, under French law and abiding by the rules of distribution of
 * free software. You can  use, modify and/ or redistribute the software
 * under the terms of the CeCILL license as circulated by CEA, CNRS and
 * INRIA at the following URL "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
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
