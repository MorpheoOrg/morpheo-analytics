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
import Link from 'redux-first-router-link';
import {parse, format} from 'date-fns';

import BubbleLoading from '../../../../common/components/presentation/loaders/bubble';
import actions from '../../actions';
import {getProblems} from '../../selector';


const style = {
    link: {
        display: 'block',
        margin: '5px 0 0',
        fontWeight: 'bold',
    },
    dl: {
        width: '100%',
    },
    li: {
        display: 'block',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 5,
        padding: 10,
        margin: '20px 0',
        overflow: 'auto',
    },
    nested: {
        listStyleType: 'disc',
        margin: '0 0 0 15px',
        fontSize: 12,
    },
};

class List extends React.PureComponent {
    componentWillMount() {
        const {loading, init, loadList} = this.props;
        if (!loading && !init) {
            loadList();
        }
    }

    render() {
        const {problems, loading} = this.props;

        return (<div><h1>Problems</h1>
            <ul>
                {loading && <BubbleLoading/>}
                {!loading && problems.map(o =>
                    (<li key={o.timestamp_upload} style={style.li}>
                        {o.loading && <PulseLoader color={theme['primary-color']} size={6}/>}
                        {!o.loading &&
                        <dl style={style.dl}>
                            {o.name && <dt>name:</dt>}
                            {o.name && <dd>{o.name}</dd>}
                            {o.description && <dt>description:</dt>}
                            {o.description && <dd><a href={o.description} target="_blank">{o.description}</a></dd>}
                            <dt>created at:</dt>
                            <dd>{format(parse(o.timestamp_upload * 1000), 'DD/MM/YYYY HH:mm:ss.SSSZ')}</dd>
                        </dl>
                        }
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
    results: PropTypes.arrayOf(PropTypes.shape({})),
    loading: PropTypes.bool,
    storage_loading: PropTypes.bool,
    init: PropTypes.bool,
    loadList: PropTypes.func,
};

const noop = () => {
};

List.defaultProps = {
    problems: null,
    loading: true,
    init: false,
    loadList: noop,
};

function mapStateToProps(state, ownProps) {
    return {
        problems: getProblems(state),
        loading: state.models.problem.list.loading,
        init: state.models.problem.list.init,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadList: actions.list.request,
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys(['problems', 'loading'])(List));
