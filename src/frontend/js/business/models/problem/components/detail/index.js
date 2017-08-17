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
import {parse, format} from 'date-fns';
import Link from 'redux-first-router-link';
import FormData from 'form-data';
import {isEmpty} from 'lodash';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from 'material-ui-icons/CloudUpload';

import BubbleLoading from '../../../../common/components/presentation/loaders/bubble';

import Algo from '../../../algo/components/detail';
import actions from '../../actions';
import algoActions from '../../../algo/actions';
import {getLChartData, getBestPerf} from '../../../learnuplet/selector';
import {getProblems} from '../../selector';

import theme from '../../../../../../css/variables';

const style = {
    li: {
        display: 'block',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 5,
        padding: 10,
        margin: '20px 0',
    },
    dropbox: {
        marginTop: 16,
        height: 180,
    },
    span: {
        fontSize: 14,
        marginLeft: 5,
    },
    loaderWrapper: {
        display: 'inline-block',
    },
    dropzone: {
        style: {
            margin: '0 auto',
            width: 350,
            padding: 10,
            cursor: 'pointer',
            border: '1px dashed #d9d9d9',
            transition: 'border-color .3s ease',
            borderRadius: 4,
            textAlign: 'center',
        },
        activeStyle: {
            borderColor: theme['primary-color'],
        },
        acceptStyle: {

        },
        rejectStyle: {
            borderColor: 'red',
        },
    },
    cloud: {
        color: theme['primary-color'],
        height: 80,
        width: 80,
    },
};

class Detail extends React.PureComponent {
    componentWillMount() {
        const {algo, id, init, loadList, loadProblem} = this.props;

        if (!algo.list.loading && typeof algo.list.results[id] === 'undefined') {
            loadList(id);
        }

        // load problem description if not already loaded
        if (!init) {
            loadProblem(id);
        }
    }

    onConfirm = (acceptedFiles) => {
        const file = acceptedFiles[0];

        const body = new FormData();
        body.append('name', file.name);
        body.append('size', file.size);
        body.append('blob', file);

        this.props.postAlgo({body, id: this.props.id});
    };

    render() {
        const {algo, data, id, name, best_perf, loading} = this.props;

        return (<div>
            <h1>Algos for Challenge {loading ?
                <div style={style.loaderWrapper}>
                    <BubbleLoading/>
                </div> :
                <span>{name}</span>}
            </h1>
            <h2>Algos with best performance are : {best_perf[id] ? best_perf[id].slice(0, 4).map(o => <div key={o.uuid}>
                <span>{o.name}</span>
                <span style={style.span}>({o.uuid})</span>
            </div>) : ''}
            </h2>
            <Link to="/problem">Back to problem</Link>

            <Dropzone multiple={false}
                      onDrop={this.onConfirm}
                      style={style.dropzone.style}
                      activeStyle={style.dropzone.activeStyle}>
                <CloudUploadIcon style={style.cloud} />
                <p>Click or drag file to this area to upload</p>
            </Dropzone>

            {algo.list.loading && <div>Loading...</div>}
            {!algo.list.loading && !!algo.list.results[id] && !!algo.list.results[id].length &&
            <ul>
                {algo.list.results[id].map(o =>
                    (<li key={o.uuid} style={style.li}>
                        <Algo
                            id={o.uuid}
                            name={o.name}
                            data={data[o.uuid]}
                            date={format(parse(o.timestamp_upload * 1000), 'DD/MM/YYYY HH:mm:ss.SSSZ')}
                        />
                    </li>))}
            </ul>
            }
        </div>);
    }
}

Detail.propTypes = {
    algo: PropTypes.shape({
        list: PropTypes.shape({
            loading: PropTypes.bool,
            init: PropTypes.bool,
        }),
    }),
    id: PropTypes.string,

    loadList: PropTypes.func,
    postAlgo: PropTypes.func,

    data: PropTypes.shape({}),
};

const noop = () => {
};

Detail.defaultProps = {
    algo: null,
    id: null,
    loadList: noop,
    postAlgo: noop,
    data: null,
};

function mapStateToProps(state, ownProps) {
    const p = getProblems(state).find(o => o.uuid === state.location.payload.id);

    return {
        algo: state.models.algo,
        name: p ? p.name : '',
        problems: getProblems(state),
        init: state.models.problem.init,
        loading: state.models.problem.item.loading || state.models.storage_problem.item.loading,
        id: state.location.payload.id,
        data: getLChartData(state),
        best_perf: getBestPerf(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadList: algoActions.list.request,
        loadProblem: actions.item.get.request,
        postAlgo: algoActions.item.post.request,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys(['algo', 'id', 'data', 'name', 'loading'])(Detail));
