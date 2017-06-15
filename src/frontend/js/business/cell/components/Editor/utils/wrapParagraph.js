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
