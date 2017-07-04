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

import onSelectAll from '../../../../../../../node_modules/slate-edit-code/dist/onSelectAll';
import onEnter from '../../../../../../../node_modules/slate-edit-code/dist/onEnter';
import onModEnter from '../../../../../../../node_modules/slate-edit-code/dist/onModEnter';
import onTab from '../../../../../../../node_modules/slate-edit-code/dist/onTab';
import onShiftTab from '../../../../../../../node_modules/slate-edit-code/dist/onShiftTab';
import getCurrentCode from '../../../../../../../node_modules/slate-edit-code/dist/getCurrentCode';

// custom BackSpace
import onBackspace from './onBackspace';

const KEY_ENTER = 'enter';
const KEY_TAB = 'tab';
const KEY_BACKSPACE = 'backspace';

function onKeyDown(e, data, state, opts) {
    // override onKeyDown
    const currentCode = getCurrentCode(opts, state);
    const {startBlock: {type}} = state;

    if (type === 'paragraph') {
        if (data.key !== 'enter') return;
        if (opts.onlyIn && !opts.onlyIn.includes(type)) return;
        if (opts.ignoreIn && opts.ignoreIn.includes(type)) return;

        return state
            .transform()
            .insertText('\n')
            .apply();
    }
    // Inside code ?
    else if (currentCode) {
        // Add opts in the argument list
        const args = [e, data, state, opts];

        // Select all the code in the block (Mod+a)
        if (data.key === 'a' && data.isMod && opts.selectAll) {
            return onSelectAll(...args);
        }

        // User is pressing Shift+Tab
        else if (data.key === KEY_TAB && data.isShift) {
            return onShiftTab(...args);
        }

        // User is pressing Tab
        else if (data.key === KEY_TAB) {
            return onTab(...args);
        }

        // User is pressing Mod+Enter
        else if (data.key === KEY_ENTER && data.isMod && opts.exitBlockType) {
            return onModEnter(...args);
        }
        // User is pressing Shift+Enter
        else if (data.key === KEY_ENTER && data.isShift) {
            return state;
        }

        // User is pressing Enter
        else if (data.key === KEY_ENTER) {
            return onEnter(...args);
        }

        // User is pressing Backspace
        else if (data.key === KEY_BACKSPACE) {
            return onBackspace(...args);
        }
    }
}

export default onKeyDown;
