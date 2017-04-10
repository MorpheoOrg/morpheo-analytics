import React from 'react';
import {Button, Upload, Icon, message} from 'antd';
import {onlyUpdateForKeys} from 'recompose';
import FormData from 'form-data';
import uuidV4 from 'uuid/v4';

import Algo from './algo';

const Dragger = Upload.Dragger;

const style = {
    button: {
        margin: '15px 0px',
    },
    dorpbox: {
        marginTop: 16,
        height: 180
    },
};

const onChange = ({file, fileList, event}) => {
    const status = file.status;

    // if (status !== 'uploading') {
    //     console.log(file, fileList);
    // }
    if (status === 'done') {
        message.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
        message.error(`${file.name} file upload failed.`);
    }
};


class Algos extends React.Component {

    constructor(props) {
        super(props);
        this.showAlgoModal = this.showAlgoModal.bind(this);
        this.customRequest = this.customRequest.bind(this);
    }

    showAlgoModal() {
        this.props.setCreateModalAlgo(true);
    }

    customRequest({onProgress, onError, onSuccess, file}) {
        const body = new FormData();
        body.append('fzip', file);
        body.append('uuid', uuidV4());

        this.props.postAlgo({body, onSuccess, onError, onProgress});
    }

    render() {
        const {algos, deleteAlgo} = this.props;

        return (<div>
            <Button
                type="primary"
                style={style.button}
                className="custom-primary"
                onClick={this.showAlgoModal}
            >
                Create algo
            </Button>
            <div style={style.dropbox}>
                <Dragger onChange={onChange}
                         customRequest={this.customRequest}
                         showUploadList={false}
                         name="algo"
                         multiple={false}
                >
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox"/>
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload your algo</p>
                </Dragger>
            </div>
            {algos && algos.results.map(algo =>
                <Algo key={algo.id} algo={algo} deleteAlgo={deleteAlgo}/>
            )}
        </div>);
    }
}

export default onlyUpdateForKeys(['algos'])(Algos);
