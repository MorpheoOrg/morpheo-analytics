import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled, {css} from 'react-emotion';

import actionsEditor from '../../../../ui/Editor/actions';
import actionsAlgo from '../../../algo/actions';
import {getProblemsDictionnary} from '../../selector';

import ProblemHeader from './ProblemHeader';
import ProblemContent from './ProblemContent';
import ProblemLeaderboard from '../ProblemLeaderboard';
import ProblemParticipate from '../ProblemParticipate';


const ProblemSection = styled.ul`
    background-color:#FAFAFB;
    list-style-type: none;
    display: flex;
    flex-shrink: 0;

    margin: 0;

    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 40px;
    padding-right: 0;


    & li{
        margin-right: 20px;
    }

`;

const disableStyle = css`
    color: blue;

    &:hover {
        font-weight: 300;
        cursor: inherit;
    }
`;

const selectedStyle = css`
    font-weight: 500;
    border-bottom: 1px solid;
`;

const ProblemSectionItem = styled.li`
    user-select: none;
    font-weight: 300;
    border-bottom: 0 solid;
    &:hover {
        font-weight: 500;
        cursor:pointer;
    }

    /*Compose with the other style*/
    ${({disable}) => disable ? disableStyle : null};
    ${({selected}) => selected ? selectedStyle : null};
`;


class ProblemDetail extends React.Component {
    componentWillMount() {
        this.props.loadAlgoList();
    }

    onSectionClick = index => (event) => {
        this.props.updateTab({
            section: index,
        });
    }

    style = css`
        padding: 50px 0 20px 0;
        line-height: 180%;
        height: 100%;
        overflow: hidden;

        display: flex;
        flex-direction: column;

        & p {
            margin-bottom: 30px;
            margin-top: 30px;
        }
    `;

    sections = ['Description', 'Leaderboard', 'Participate'];
    render() {
        const {description, problemId, name, section} = this.props;
        console.log(problemId);
        return (
            <div
                css={this.style}
            >
                <ProblemHeader
                    name={name}
                    description={description}
                />
                <ProblemSection>
                    {this.sections.map((title, index) => (
                        <ProblemSectionItem
                            key={title}
                            onClick={this.onSectionClick(index)}
                            selected={section === index}
                        >
                            {title}
                        </ProblemSectionItem>
                    ))}
                </ProblemSection>
                {section === 0 && <ProblemContent problemId={problemId} />}
                {/*section === 1 && <ProblemLeaderboard
                    problemId={problemId}
                />*/}
                {/*section === 2 && <ProblemParticipate problemId={problemId} />*/}
            </div>);
    }
}

ProblemDetail.propTypes = {
    description: PropTypes.string,
    name: PropTypes.string.isRequired,
    problemId: PropTypes.string.isRequired,
    section: PropTypes.number,
    // tabId: PropTypes.string.isRequired,

    loadAlgoList: PropTypes.func.isRequired,
    updateTab: PropTypes.func.isRequired,
};

ProblemDetail.defaultProps = {
    description: '',
    section: 0,
};

const mapStateToProps = (state, {id}) => ({
    ...getProblemsDictionnary(state)[id],
    problemId: id,
});

const mapDispatchToProps = (dispatch, {id, updateProps}) => bindActionCreators({
    loadAlgoList: () => actionsAlgo.list.request(id),
    updateTab: updateProps,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProblemDetail);
