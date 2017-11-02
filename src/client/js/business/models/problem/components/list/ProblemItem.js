import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {css} from 'react-emotion';
import {ChevronRight} from 'mdi-material-ui';

import actionsEditor from '../../../../ui/actions/editor';


class ProblemItem extends React.Component {
    style = css`
        background-color: #EAECF0;
        margin-top: 10px;
        padding: 20px;
        border-radius: 5px;
        position: relative;
        cursor: pointer;


        &:hover {
            background-color: white;
        }

        & svg {
            position: absolute;
            right: 20px;
            top: 0;
            bottom: 0;
            margin: auto;
        }
    `;

    handleClick = (event) => {
        event.preventDefault();

        const {uuid, name} = this.props;

        this.props.addGroup({
            groupId: 0,
            id: uuid,
            value: name,
        });
    }

    render() {
        return (<dl
            css={this.style}
            onClick={this.handleClick}
        >
            <dt>{this.props.name}</dt>
            {this.props.description ?
                <dd>{this.props.description}</dd> : null}
            <ChevronRight />
        </dl>);
    }
}

ProblemItem.propTypes = {
    description: PropTypes.string,
    name: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,

    addGroup: PropTypes.func,
};

const noop = () => {};

ProblemItem.defaultProps = {
    description: '',
    addGroup: noop,
};

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    addGroup: actionsEditor.addGroup,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProblemItem);
