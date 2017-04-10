/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import clean from './clean';
import dll from './dll';
import run from "./run";
import fs from 'fs';

const DllArray = ['React', 'Redux', 'App'];
function DllBuilt () {
    for (var i = 0, l = DllArray.length; i < l; i++) {
        if (!fs.existsSync('./build/dll/' + DllArray[i] + '-manifest.json') ||
            !fs.existsSync('./build/dll/' + DllArray[i] + '.dll.js')) {
            return false;
        }
    }
    return true;
}

/**
 * Compiles the project from source files into a distributable
 * format and copies it to the output (build) folder.
 */
async function build() {

    await run(clean);
    if (!DllBuilt()) {
        await run(dll);
    }
    const bundle = require('./bundle');
    await run(bundle).catch(err => {
            console.error(err);
            process.exit(1);
        }
    );
}

export default build;
