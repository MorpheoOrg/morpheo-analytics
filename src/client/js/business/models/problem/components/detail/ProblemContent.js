import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled, {css} from 'react-emotion';
import ReactMarkdown from 'react-markdown';
import {shell} from 'electron';

import description from './description.md';


// const ProblemContent = styled(ReactMarkdown)`
//     overflow: auto;
// `;

class RouterLink extends React.Component {
    handleOnClick = () => {
        shell.openExternal(this.props.href);
    }

    style = css`
        color: -webkit-link;
        text-decoration: underline;
        cursor: pointer;
    `

    render() {
        console.log(this.props);
        return (<a
            css={this.style}
            onClick={this.handleOnClick}
        >
            {this.props.children}
        </a>);
    }
};


class ProblemContent extends React.Component {
    style = css`
        overflow-y: auto;
        padding-left: 40px;
        padding-right: 40px;
        padding-top: 10px;
    `;

    render() {
        return (<div
            css={this.style}
        >
            <ReactMarkdown
                source={description}
                renderers={{Link: RouterLink}}
            />
        </div>);
    }
}

ProblemContent.propTypes = {

};

ProblemContent.defaultProps = {

};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([

])(ProblemContent));
