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
import {Icon, Upload, message} from 'antd';
import {Link} from 'react-router-dom';
import FormData from 'form-data';

import algoActions from '../../../algo/actions';
import {getLChartData} from '../../../learnuplet/selector';
import Algo from './algo';

const Dragger = Upload.Dragger;

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
};

const onChange = ({file, fileList, event}) => {
    const status = file.status;

    // if (status !== 'uploading') {
    //     console.log(file, fileList);
    // }
    if (status === 'done') {
        message.success(`${file.name} file uploaded successfully.`);
    }
    else if (status === 'error') {
        message.error(`${file.name} file upload failed.`);
    }
};

class Detail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.customRequest = this.customRequest.bind(this);
    }
    componentWillMount() {
        if (!this.props.algo.list.loading && !this.props.algo.list.init) {
            this.props.loadList(this.props.id);
        }
    }

    customRequest({onProgress, onError, onSuccess, file}) {
        const body = new FormData();
        body.append('name', file.name);
        body.append('size', file.size);
        body.append('blob', file);

        this.props.postAlgo({body, id: this.props.id, onSuccess, onError, onProgress});
    }

    render() {
        const {algo, id, data} = this.props;

        return (<div>
            <h1>Algos for problem {id}</h1>
            <Link to="/problem">Back to problem</Link>
            <div style={style.dropbox}>
                <Dragger
                    onChange={onChange}
                    customRequest={this.customRequest}
                    showUploadList={false}
                    name="algo"
                    multiple={false}
                >
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload your algo</p>
                </Dragger>
            </div>
            {algo.list.loading && <div>Loading...</div>}
            {!algo.list.loading && !!algo.list.results.length &&
            <ul>
                {algo.list.results.map(o =>
                    (<li key={o.uuid} style={style.li}>
                        <Algo id={o.uuid} data={data[o.uuid]} date={format(parse(o.timestamp_upload * 1000), 'DD/MM/YYYY HH:mm:ss.SSSZ')}/>
                    </li>))}
            </ul>
            }
        </div>);
    }
}

// type := array|bool|func|shape|number|string|oneOf([...])|instanceOf(...)
// decl := ReactPropTypes.{type}(.isRequired)?
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

const noop = () => {};

Detail.defaultProps = {
    algo: null,
    id: null,
    loadList: noop,
    postAlgo: noop,
    data: null,
};

function mapStateToProps(state, ownProps) {
    return {
        algo: state.models.algo,
        id: ownProps.match.params.id,
        data: getLChartData(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadList: algoActions.list.request,
        postAlgo: algoActions.item.post.request,
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys(['algo', 'id', 'data'])(Detail));
