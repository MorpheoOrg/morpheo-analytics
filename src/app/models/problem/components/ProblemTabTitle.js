import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import styled, {css} from 'react-emotion';

import Poll from '../../../components/icons/Poll';


const Wrapper = ({children}) => children;

// TODO: remove the use of mdi
// Need to add !important to override google style
const iconStyles = css`
    width: 14px !important;
`;

const Span = styled.span`
    padding-left: 7px;
`;

const ProblemTabTitle = ({children}) => (
    <Wrapper>
        <Poll className={iconStyles} />
        <Span>{children}</Span>
    </Wrapper>
);

ProblemTabTitle.propTypes = {
    children: PropTypes.string.isRequired,
};

export default onlyUpdateForKeys([
    'children',
])(ProblemTabTitle);
