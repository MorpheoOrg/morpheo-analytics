import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled, {css} from 'react-emotion';
import FormData from 'form-data';
import algoActions from '../../../algo/actions';


const UploadButton = styled.span`
    color:  #5600FF;
    margin: auto;
    display: flex;
    padding-bottom: 20px;
    position: relative;

    & svg {
        padding-right: 5px;
    }

    & input {
        position: absolute;
        top: 0; left: 0;
        width: 225px;
        opacity: 0;
        padding: 14px 0;
        cursor: pointer;
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
        return (<div
            css={this.style}
            aria-disabled
        >
            <input
                type="file"
                onChange={onChange}
            />
            {children}
        </div>);
    }
}

class ProblemParticipate extends React.Component {
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
            <UploadButton>Fmesa_starting_kit.tar.gz</UploadButton>
            <h3>Submit your model</h3>
            <UploadPanel onChange={this.handleOnChange}>
                C
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
