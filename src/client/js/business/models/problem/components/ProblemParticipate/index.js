import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled, {css} from 'react-emotion';
import {FolderUpload} from 'mdi-material-ui';


const UploadButton = styled.span`
    color:  #5600FF;
    margin: auto;
    display: flex;
    padding-bottom: 20px;

    & svg {
        padding-right: 5px;
    }
`;

class ProblemParticipate extends React.Component {
    style = css`
        padding-left: 40px;
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
            <UploadButton><FolderUpload />mesa_starting_kit.tar.gz</UploadButton>
            <h3>Submit your model</h3>
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

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([

])(ProblemParticipate));
