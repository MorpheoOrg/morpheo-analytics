import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled, {css} from 'react-emotion';

import ProblemContent from './ProblemContent';
import ProblemLeaderboard from './ProblemLeaderboard';
import ProblemHeader from './ProblemHeader';


const ProblemSection = styled.ul`
    background-color:#FAFAFB;
    list-style-type: none;
    display: flex;
    flex-shrink: 0;

    margin: 0;

    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 0;
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
    style = css`
        padding: 50px 0 20px 0;
        line-height: 180%;
        height: 100%;

        display: flex;
        flex-direction: column;

        & p {
            margin-bottom: 30px;
            margin-top: 30px;
        }
    `;

    onSectionClick = (event) => {
    }

    render() {
        const {description, name} = this.props;
        return (<div
            css={this.style}
        >
            <ProblemHeader
                name={name}
                description={description}
            />
            <ProblemSection>
                <ProblemSectionItem
                    onClick={this.onSectionClick}
                >
                    Description
                </ProblemSectionItem>
                <ProblemSectionItem
                    onClick={this.onSectionClick}
                    disable
                >
                    Leaderboard
                </ProblemSectionItem>
                <ProblemSectionItem
                    onClick={this.onSectionClick}
                    selected
                >
                    Participate
                </ProblemSectionItem>
            </ProblemSection>
            {/* <ProblemContent /> */}
            <ProblemLeaderboard />

        </div>);
    }
}

ProblemDetail.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
};

ProblemDetail.defaultProps = {
    description: '',
};

const mapStateToProps = (state, {id}) => ({
    ...state.models.problems.list.results.reduce(
        (p, c) => (p !== undefined) ? p : (c.uuid !== id) ? undefined : {
            ...state.models.storage_problems.item.results[c.workflow],
            ...c,
        },
        undefined,
    ),
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProblemDetail);
