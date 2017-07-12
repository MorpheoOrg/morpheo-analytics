/**
 * Created by guillaume on 6/29/17.
 */

import React from 'react';
import LChart from './lchart/index';

const Detail = ({id, name, date, data}) =>
    (<div>
        <dl>
            <dt>uuid</dt>
            <dd>{id}</dd>
            {name && <dt key={Math.random()}>name</dt>}
            {name && <dd>{name}</dd>}
            <dt>Created at</dt>
            <dd>{date}</dd>
        </dl>
        <LChart id={id} data={data} />
    </div>);

export default Detail;
