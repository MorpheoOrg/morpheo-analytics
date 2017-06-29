/**
 * Created by guillaume on 6/29/17.
 */

import React from 'react';
import LChart from './lchart';

const Algo = ({id, date, data}) =>
    <div>
        <dl>
            <dt>uuid</dt>
            <dd>{id}</dd>
            <dt>Created at</dt>
            <dd>{date}</dd>
        </dl>
        <LChart id={id} data={data}/>
    </div>;

export default Algo;
