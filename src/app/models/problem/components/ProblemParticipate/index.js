import React from 'react';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled, {css} from 'react-emotion';
import {shell} from 'electron';

import algoActions from '../../../algo/actions';
import FolderDownload from '../../../../components/icons/FolderDownload';
import CloudUpload from '../../../../components/icons/CloudUpload';


const UploadButton = styled.button`
    color:  #5600FF;
    display: flex;
    padding-bottom: 20px;
    position: relative;
    cursor: pointer;
    border: none;
    background-color: inherit;
    align-items: center;
    &:focus {
        outline: 0;
    }

    & svg {
        padding-right: 5px;
    }

    & input {
        position: absolute;
        top: 0; left: 0;
        width: 225px;
        opacity: 0;
        padding: 14px 0;
    }

    &:hover{
        color: red;
    }
`;

class UploadPanel extends React.Component {
    style = css`
        color:  #5600FF;
        margin: auto;
        display: flex;
        position: relative;
        overflow: hidden;
        border: 1px dashed;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        & input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }

        &:hover{
            color: red;
        }
    `;

    render() {
        const {children, onChange} = this.props;
        return (
            <div
                css={this.style}
                aria-disabled
            >
                <input
                    type="file"
                    onChange={onChange}
                />
                {children}
            </div>
        );
    }
}

class ProblemParticipate extends React.Component {
    downloadStartingKit = (event) => {
        event.preventDefault();

        // Download the file
        // setTimeout(() => {
        //     const response = {
        //         file: 'https://storage.cloud.google.com/mesa_starting_kit/mesa_starting_kit.tar.gz?_ga=1.218895327.773593531.1497863845',
        //     };
        //     window.location.href = response.file;

        // }, 100);

        // As the user need to be connected to google to download the starting
        // kit, we open an external browser
        shell.openExternal('https://storage.cloud.google.com/mesa_starting_kit/mesa_starting_kit.tar.gz?_ga=1.218895327.773593531.1497863845');
    }

    handleOnChange = (event) => {
        const {postAlgo, problemId} = this.props;
        const file = event.target.files[0];

        const body = new self.FormData();
        body.append('name', file.name);
        body.append('size', file.size);
        body.append('blob', file);

        postAlgo({body, problemId});

        event.preventDefault();
    }

    style = css`
        padding-left: 40px;
        padding-right: 40px;
        padding-top: 40px;

        & h3 {
            font-weight: 500;
            padding-bottom: 10px;
        }
    `;

    render() {
        return (<div
            css={this.style}
        >
            <h3>Starting kit</h3>
            <UploadButton onClick={this.downloadStartingKit}>
                <FolderDownload />mesa_starting_kit.tar.gz
            </UploadButton>
            <h3>Submit your model</h3>
            <UploadPanel onChange={this.handleOnChange}>
                <CloudUpload />
                Click or drag file to this area to upload your algo
            </UploadPanel>
        </div>);
    }
}

ProblemParticipate.propTypes = {

};

ProblemParticipate.defaultProps = {

};

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    postAlgo: algoActions.item.post.request,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([

])(ProblemParticipate));
