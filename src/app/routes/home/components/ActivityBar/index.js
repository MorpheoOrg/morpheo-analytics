import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onlyUpdateForKeys} from 'recompose';
import {bindActionCreators} from 'redux';
import styled from 'react-emotion';

import actions from '../SideBar/actions';
import {menuContent, modalContent} from './iconDefinition';
import FlatButton from '../../../../components/FlatButton';
import ComponentBar from '../../../../components/ComponentBar';


const MenuButton = styled(FlatButton)`
    margin: 5px;
    height: 42px;
    width: 42px;
`;


class ActivityBar extends React.Component {
    toggleSideBarElement = index => (event) => {
        const {selectedIndex, setIndex, setStatus} = this.props;

        if (selectedIndex === index) {
            setStatus('closed');
        }
        else {
            setIndex(index);
            setStatus('opened');
        }
    };

    // openModalElement = index => (event) => {
    //     // Add function to open element
    //     console.log(`Open Modal element for tab ${index}.`);
    // };

    renderTopChildren = () => menuContent.map(({icon, name}, index) => (
        <MenuButton
            key={name}
            active={this.props.selectedIndex === index}
            icon={icon}
            onClick={this.toggleSideBarElement(index)}
            disabled={index > 0}
        >
            {icon}
        </MenuButton>
    ));

    renderBottomChildren = () => modalContent.map(({icon, name}, index) => (
        <MenuButton
            key={name}
            icon={icon}
            // onClick={this.openModalElement}
            disabled
        >
            {icon}
        </MenuButton>
    ));

    render() {
        return (
            <ComponentBar
                topChildren={this.renderTopChildren()}
                bottomChildren={this.renderBottomChildren()}
            />
        );
    }
}


ActivityBar.propTypes = {
    selectedIndex: PropTypes.number.isRequired,

    setIndex: PropTypes.func.isRequired,
    setStatus: PropTypes.func.isRequired,
};


const mapStateToProps = ({settings}) => ({
    selectedIndex: settings.sideBar.selectedIndex,
});


const mapDispatchToProps = dispatch => bindActionCreators({
    setIndex: actions.setIndex,
    setStatus: actions.setStatus,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([
    'selectedIndex',
])(ActivityBar));
