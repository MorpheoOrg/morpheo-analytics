import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {css} from 'react-emotion';


class ProblemHeader extends React.Component {
    style = css`
        flex-shrink: 0;
        padding-left: 40px;
        padding-bottom: 40px;

        & h1{
            font-weight: 400;
            padding-bottom: 20px;
        }

        & h2{
            font-weight: 400;
        }
    `;

    render() {
        const {description, name} = this.props;
        return (<div
            css={this.style}
        >
            <h1>
                {name}
            </h1>
            <h2>
                {description}
            </h2>
        </div>);
    }
}

ProblemHeader.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

ProblemHeader.defaultProps = {

};

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([
    'name', 'descripton',
])(ProblemHeader));
