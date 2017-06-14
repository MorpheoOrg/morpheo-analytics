/**
 * Created by guillaume on 6/14/17.
 */
import {Document} from 'slate';

import getCurrentCode from '../../../../../../../node_modules/slate-edit-code/dist/getCurrentCode';
import deserializeCode from '../../../../../../../node_modules/slate-edit-code/dist/deserializeCode';


/**
 * User is pasting content, insert it as text
 */
const onPaste = (event, data, state, opts) => {
    const currentCode = getCurrentCode(opts, state);

    // Convert to text if needed
    let text;
    if (data.type === 'fragment') {
        text = data.fragment.getTexts().map(t => t.text).join('\n');
    }
    else {
        text = data.text;
    }

    const {endBlock} = state;
    if (!currentCode || !currentCode.hasDescendant(endBlock.key)) {
        return state.transform().insertText(text).apply();
    }

    // Convert the text to code lines
    const lines = deserializeCode(opts, text).nodes;

    const fragment = Document.create({nodes: lines});

    return state.transform()
        .insertFragment(fragment)
        .apply();
};

export default onPaste;
