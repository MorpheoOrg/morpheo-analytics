import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onlyUpdateForKeys} from 'recompose';
import {bindActionCreators} from 'redux';

import actions from '../actions/sideBar';
import actionsProblem from '../../models/problem/actions';
import {menuContent, modalContent} from './iconDefinition';
import FlatButton from '../../common/components/FlatButton';
import ActivityBar1 from '../../common/components/ActivityBar';


class ActivityBar extends React.Component {
    toggleSideBarElement = index => (event) => {
        // TODO MOVE TO ANOTHER PLACE
        this.props.loadProblemList();

        const {selectedIndex, setIndex, setStatus} = this.props;

        if (selectedIndex === index) {
            setStatus('closed');
        }
        else {
            setIndex(index);
            setStatus('opened');
        }
    };
    openModalElement = index => (event) => {
        // Add function to open element
        console.log(index);
    };

    render() {
        const {selectedIndex} = this.props;
        return (
            <ActivityBar1
                topChildren={menuContent.map(({icon, name}, index) => (
                    <FlatButton
                        key={name}
                        active={selectedIndex === index}
                        icon={icon}
                        onClick={this.toggleSideBarElement(index)}
                        disabled={index > 0}
                    >
                        {icon}
                    </FlatButton>
                ))}

                bottomChildren={modalContent.map(({icon, name}, index) => (
                    <FlatButton
                        key={name}
                        icon={icon}
                        onClick={this.openModalElement}
                        disabled
                    >
                        {icon}
                    </FlatButton>
                ))}
            />);

    }
}


ActivityBar.propTypes = {
    loadProblemList: PropTypes.func.isRequired,
    setIndex: PropTypes.func.isRequired,
    setStatus: PropTypes.func.isRequired,

    selectedIndex: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
};

const mapStateToProps = ({settings}) => ({
    selectedIndex: settings.sideBar.selectedIndex,
    status: settings.sideBar.status,
    duration: settings.sideBar.duration,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    loadProblemList: actionsProblem.list.request,
    setIndex: actions.setIndex,
    setStatus: actions.setStatus,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([
    'selectedIndex', 'status',
])(ActivityBar));
