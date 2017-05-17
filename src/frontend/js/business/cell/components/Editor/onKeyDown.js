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

/**
 * User pressed Delete in an editor:
 * Remove last idnentation before cursor
 */
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

        // User is pressing Shift+Enter
        else if (data.key === KEY_ENTER && data.isMod && opts.exitBlockType) {
            return onModEnter(...args);
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
