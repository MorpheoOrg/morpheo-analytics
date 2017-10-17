import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled, {css} from 'react-emotion';
import ReactMarkdown from 'react-markdown';

import description from './description.md';


// const ProblemContent = styled(ReactMarkdown)`
//     overflow: auto;
// `;

class ProblemContent extends React.Component {
    style = css`
    `;

    render() {
        return (<div
            css={this.style}
        >
            <ReactMarkdown source={description} />
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
