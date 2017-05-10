/**
 * Created by guillaume on 5/10/17.
 */

/* globals Prism */

import PluginPrism from 'slate-prism';

import SlateEditor from './slate';
import PrismPython from '../../../../utils/Prism/languages/python';
import PrismR from '../../../../utils/Prism/languages/r';
import PrismJulia from '../../../../utils/Prism/languages/julia';


// load python, R, julia language
Prism.languages.python = PrismPython;
Prism.languages.r = PrismR;
Prism.languages.julia = PrismJulia;

export default SlateEditor;
