import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import actionsAlgo from '../../../algo/actions';
import {getProblemsDictionnary} from '../../selector';
import ProblemContainer from '../ProblemContainer';
import ProblemContent from './ProblemContent';
import ProblemLeaderboard from '../ProblemLeaderboard';
import ProblemParticipate from '../ProblemParticipate';


// The list of sections displayed when a problem tab is active
const problemSections = [
    {
        name: 'Description',
        content: ProblemContent,
    },
    {
        name: 'Leaderboard',
        content: ProblemLeaderboard,
    },
    {
        name: 'Participate',
        content: ProblemParticipate,
    },
];


class ProblemDetail extends React.Component {
    componentWillMount() {
        this.props.loadAlgoList();
    }

    render() {
        const {
            description, name, activeSectionIndex, setActiveSection,
            ...contentProps
        } = this.props;
        return (
            <ProblemContainer
                activeSectionIndex={activeSectionIndex}
                contentProps={contentProps}
                description={description}
                name={name}
                sections={problemSections}
                setActiveSection={setActiveSection}
            />
        );
    }
}

ProblemDetail.propTypes = {
    description: PropTypes.string,
    name: PropTypes.string.isRequired,
    problemId: PropTypes.string.isRequired,
    activeSectionIndex: PropTypes.number,

    loadAlgoList: PropTypes.func.isRequired,
    setActiveSection: PropTypes.func.isRequired,
};

ProblemDetail.defaultProps = {
    description: '',
    activeSectionIndex: 0,
};

const mapStateToProps = (state, {id, updateProps}) => ({
    ...getProblemsDictionnary(state)[id],
    problemId: id,
    problemList: getProblemsDictionnary(state),
    setActiveSection: index => updateProps({activeSectionIndex: index}),
});

const mapDispatchToProps = (dispatch, {id}) => bindActionCreators({
    loadAlgoList: () => actionsAlgo.list.request({problemId: id}),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProblemDetail);
