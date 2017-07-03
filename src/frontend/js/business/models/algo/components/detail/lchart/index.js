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
import React from 'react';
import PropTypes from 'prop-types';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import {Card} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {onlyUpdateForKeys, shouldUpdate} from 'recompose';
import {isEqual} from 'lodash';

import learnupletActions from '../../../../learnuplet/actions';


const card = {
    width: '100%',
    margin: '20px 0px',
    borderRadius: '5px',
    overflow: 'visible',
};

const chart = {top: 5, right: 150, left: 0, bottom: 5};

const activeDot = {
        r: 8,
    },
    dot = {
        fill: '#8884d8',
    };


class LearnupletChart extends React.Component {
    componentWillMount() {
        this.props.loadLearnuplet(this.props.id);
    }

    render() {
        const {data, id} = this.props;

        return <Card
                title={`Performance of algo ${id}`}
                style={card}
            >
                <LineChart width={600} height={300} data={data} margin={chart}>
                    <XAxis dataKey="name" label="Number of trained data"/>
                    <YAxis label="Perf"/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip />
                    <Legend />
                    <Line dataKey="perf" stroke="#8884d8" dot={dot} activeDot={activeDot}/>
                </LineChart>
            </Card>;
    }
}

LearnupletChart.propTypes = {
    loadLearnuplet: PropTypes.func,
    id: PropTypes.string,
};

const noop = () => {
};

LearnupletChart.defaultProps = {
    loadLearnuplet: noop,
    id: null,
};

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadLearnuplet: learnupletActions.list.request,
    }, dispatch);
}

// only update if data is not deep equal, reference of array can be different
export default connect(mapStateToProps, mapDispatchToProps)(shouldUpdate((props, nextProps) => {
    return !isEqual(props.data, nextProps.data);
})(LearnupletChart));
