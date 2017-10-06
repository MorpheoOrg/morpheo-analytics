/**
 * Created by guillaume on 6/29/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import LChart from './lchart/index';

const Detail = ({id, name, date, data}) =>
    (<div>
        <dl>
            <dt>uuid</dt>
            <dd>{id}</dd>
            {name && <dt>name</dt>}
            {name && <dd>{name}</dd>}
            <dt>Created at</dt>
            <dd>{date}</dd>
        </dl>
        <LChart id={id} data={data} />
    </div>);

Detail.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    data: PropTypes.shape({}).isRequired,
};

export default Detail;
