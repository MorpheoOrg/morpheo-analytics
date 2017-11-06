import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled, {css} from 'react-emotion';


const ComponentGroup = styled.div`
    margin: 20px 0 20px 0;
    grid-area: ${({gridArea}) => ({gridArea})};

    display: flex;
    flex-direction: column;// ({gridArea}) => ({ gridArea });
`;

ComponentGroup.propTypes = {
    gridArea: PropTypes.string.isRequired,
};


class ActivityBar extends React.Component {
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

ActivityBar.propTypes = {
    topChildren: PropTypes.arrayOf(PropTypes.any),
    middleChildren: PropTypes.arrayOf(PropTypes.any),
    bottomChildren: PropTypes.arrayOf(PropTypes.any),
};

ActivityBar.defaultProps = {
    topChildren: [],
    middleChildren: [],
    bottomChildren: [],
};

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([
    'topChildren', 'middleChildren', 'bottomChildren'
])(ActivityBar));
