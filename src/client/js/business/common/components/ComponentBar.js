import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import styled, {css} from 'react-emotion';


const ComponentGroup = styled.div`
    margin: 20px 0 20px 0;
    grid-area: ${({gridArea}) => ({gridArea})};

    display: flex;
    flex-direction: column;
`;

ComponentGroup.propTypes = {
    gridArea: PropTypes.string.isRequired,
};


class ComponentBar extends React.Component {
    style = css`
        height: 100%;
        background-color: #d2d2d6;

        display: grid;
        grid-template-areas: 'top' 'middle' 'bottom';
        align-content: space-between;
    `;

    render() {
        const {topChildren, middleChildren, bottomChildren} = this.props;
        return (
            <div
                css={this.style}
            >
                <ComponentGroup
                    gridArea="top"
                >
                    {topChildren}
                </ComponentGroup>
                <ComponentGroup
                    gridArea="middle"
                >
                    {middleChildren}
                </ComponentGroup>
                <ComponentGroup
                    gridArea="bottom"
                >
                    {bottomChildren}
                </ComponentGroup>
            </div>
        );
    }
}

ComponentBar.propTypes = {
    topChildren: PropTypes.arrayOf(PropTypes.any),
    middleChildren: PropTypes.arrayOf(PropTypes.any),
    bottomChildren: PropTypes.arrayOf(PropTypes.any),
};

ComponentBar.defaultProps = {
    topChildren: [],
    middleChildren: [],
    bottomChildren: [],
};


export default onlyUpdateForKeys([
    'topChildren', 'middleChildren', 'bottomChildren',
])(ComponentBar);
