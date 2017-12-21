import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import styled, {css} from 'react-emotion';


const Container = styled.div`
    height: 100%;
    line-height: 180%;

    overflow: hidden;

    display: flex;
    flex-direction: column;

    & p {
        margin-bottom: 30px;
        margin-top: 30px;
    }
`;

const commonPadding = css`
    padding-left: 40px;
    padding-right: 40px;
`;

const Header = styled.div`
    flex-shrink: 0;
    padding-top: 50px;
    padding-bottom: 40px;
    ${commonPadding}
`;

const Title = styled.h1`
    font-weight: 400;
    padding-bottom: 20px;
`;

const SubTitle = styled.h2`
    font-weight: 400;
`;


const SectionUl = styled.ul`
    background-color:#FAFAFB;
    list-style-type: none;
    display: flex;
    flex-shrink: 0;

    margin: 0;

    padding-top: 10px;
    padding-bottom: 10px;
    ${commonPadding}


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

const activeStyle = css`
    font-weight: 500;
    border-bottom: 1px solid;
`;

const SectionLi = styled.li`
    user-select: none;
    font-weight: 300;
    border-bottom: 0 solid;
    &:hover {
        font-weight: 500;
        cursor:pointer;
    }

    /*Compose with the other style*/
    ${({disable}) => disable ? disableStyle : null};
    ${({active}) => active ? activeStyle : null};
`;

const ContentContainer = styled.div`
    height: 100%;
    overflow-y: auto;

    padding-left: 40px;
    padding-right: 40px;
    padding-top: 10px;
    padding-bottom: 10px;
`;

class ProblemContainer extends React.Component {
    handleOnClick = index => (event) => {
        event.preventDefault();
        this.props.setActiveSection(index);
    }

    render() {
        const {
            activeSectionIndex, contentProps, description, name, sections,
        } = this.props;
        // Get the active component
        const Content = sections[activeSectionIndex].content;

        return (
            <Container>
                <Header>
                    <Title>
                        {name}
                    </Title>
                    <SubTitle>
                        {description}
                    </SubTitle>
                </Header>
                {/* Must be render outside the header for avoid influence of
                    the padding-left on the rendering. */}
                <SectionUl>
                    {sections.map(
                        ({name}, index) => (
                            <SectionLi
                                key={name}
                                onClick={this.handleOnClick(index)}
                                active={activeSectionIndex === index}
                            >
                                {name}
                            </SectionLi>
                        )
                    )}
                </SectionUl>
                <ContentContainer>
                    <Content {...contentProps} />
                </ContentContainer>
            </Container>
        );
    }
}

ProblemContainer.propTypes = {
    activeSectionIndex: PropTypes.number.isRequired,
    contentProps: PropTypes.shape({}).isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sections: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        content: PropTypes.func.isRequired
    })).isRequired,

    setActiveSection: PropTypes.func.isRequired,
};

export default onlyUpdateForKeys([
    'activeSectionIndex', 'contentProps', 'description', 'name', 'sections',
])(ProblemContainer);
