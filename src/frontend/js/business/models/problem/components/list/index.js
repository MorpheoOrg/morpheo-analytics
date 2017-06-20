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
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {onlyUpdateForKeys} from 'recompose';
import {Link} from 'react-router-dom';
import {parse, format} from 'date-fns';

import actions from '../../actions';

const style = {
    link: {
        display: 'block',
        margin: '5px 0 0',
        fontWeight: 'bold',
    },
    li: {
        display: 'block',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 5,
        padding: 10,
        margin: '20px 0',
    },
    nested: {
        listStyleType: 'disc',
        margin: '0 0 0 15px',
        fontSize: 12,
    },
};

class List extends React.PureComponent {
    componentWillMount() {
        if (!this.props.problem.list.loading && !this.props.problem.list.init) {
            this.props.loadList();
        }
    }

    render() {
        const {problem} = this.props;

        return (<div><h1>Problems</h1>
            <ul>
                {problem.list.loading && <div>Loading...</div>}
                {!problem.list.loading && problem.list.results.map(o =>
                    (<li key={o.timestamp_upload} style={style.li}>
                        <dl>
                            <dt>created at:</dt>
                            <dd>{format(parse(o.timestamp_upload * 1000), 'DD/MM/YYYY HH:mm:ss.SSSZ')}</dd>
                            <dt>size train dataset:</dt>
                            <dd>{o.size_train_dataset}</dd>
                            <dt>test dataset:</dt>
                            <dd>
                                <ul>
                                    {o.test_dataset.map(o =>
                                        (<li style={style.nested} key={o}>
                                            {o}
                                        </li>))}
                                </ul>
                            </dd>
                            <dt>workflow:</dt>
                            <dd>{o.workflow}</dd>
                        </dl>

                        <Link style={style.link} to={`/problem/${o.uuid}`}>{'-> Manage related algos'}</Link>
                    </li>),
                )}
            </ul>
        </div>);
    }
}

// type := array|bool|func|shape|number|string|oneOf([...])|instanceOf(...)
// decl := ReactPropTypes.{type}(.isRequired)?
List.propTypes = {
    problem: PropTypes.shape({
        list: PropTypes.shape({
            loading: PropTypes.bool,
            init: PropTypes.init,
        }),
    }),
    loadList: PropTypes.func,
};

const noop = () => {};

List.defaultProps = {
    problem: null,
    loadList: noop,
};

function mapStateToProps(state, ownProps) {
    return {
        problem: state.models.problem,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadList: actions.list.request,
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys(['problem'])(List));
