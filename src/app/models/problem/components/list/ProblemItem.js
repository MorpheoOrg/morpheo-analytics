import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {css} from 'react-emotion';

import actionsEditor from '../../../../routes/home/Editor/actions';
import {getActivePane} from '../../../../routes/home/Editor/selectors';

import ChevronRight from '../../../../components/icons/ChevronRight';


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

        this.props.openContent({
            contentId: uuid,
            contentType: 'problem',
            title: name,
        });
    }

    render() {
        return (
            <dl
                css={this.style}
                onClick={this.handleClick}
            >
                <dt>{this.props.name}</dt>
                {this.props.description ?
                    <dd>{this.props.description}</dd> : null}
                <ChevronRight />
            </dl>
        );
    }
}

ProblemItem.propTypes = {
    description: PropTypes.string,
    name: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,

    openContent: PropTypes.func,
};

const noop = () => {};

ProblemItem.defaultProps = {
    description: '',
    openContent: noop,
};

const mapStateToProps = (state, ownProps) => ({
    /** Get information about to add new tab into the last activated pane */
    _activePane: getActivePane(state),
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    _addTab: actionsEditor.tab.add,
}, dispatch);

const mergeProps = ({_activePane}, {_addTab}, ownProps) => ({
    ...ownProps,
    openContent: ({contentId, title}) => _addTab({
        contentId,
        contentType: 'problem',
        paneId: _activePane,
        title,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProblemItem);
