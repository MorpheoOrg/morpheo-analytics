import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import styled, {css} from 'react-emotion';


const Container = styled.div`
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

const Header = styled.div`
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


const SectionUl = styled.ul`
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
                    <h1>
                        {name}
                    </h1>
                    <h2>
                        {description}
                    </h2>
                </Header>
                {/* Render the section tab */}
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
                <Content {...contentProps} />
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
    'activeSectionIndex', 'children', 'description', 'name', 'sectionsName',
])(ProblemContainer);
