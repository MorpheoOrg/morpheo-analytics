import React from 'react';
import {css} from 'react-emotion';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import actions from '../../actions';
import {getProblems} from '../../selector';
import ProblemItem from './ProblemItem';


class ProblemList extends React.Component {
    componentWillMount() {
        const {loading, init, loadProblemList} = this.props;
        if (!loading && !init) {
            loadProblemList();
        }
    }

    style = css`
        display: flex;
        width: 100%;
        flex-direction: column-reverse;
    `;

    renderProblems = () => {
        const {problems} = this.props;
        return problems.map(({loading, uuid, name}) => {
            return (!loading ? <ProblemItem
                key={uuid}
                uuid={uuid}
                name={name}
            /> : 'Loading...');
        });
    }
    render() {
        const {init, loading} = this.props;
        return (
            <div
                css={this.style}
            >
                {(!init || loading) && 'Loading...'}
                {!loading && init && this.renderProblems()}
            </div>
        );
    }
}

ProblemList.propTypes = {
    loading: PropTypes.bool,
    init: PropTypes.bool,
    loadProblemList: PropTypes.func,
    problems: PropTypes.arrayOf(PropTypes.shape({})),
};

const noop = () => {};

ProblemList.defaultProps = {
    problems: null,
    loading: true,
    init: false,
    loadProblemList: noop,
};

const mapStateToProps = state => ({
    problems: getProblems(state),
    loading: state.models.problems.list.loading,
    init: state.models.problems.list.init,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    loadProblemList: actions.list.request,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProblemList);
