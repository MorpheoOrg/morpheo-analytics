import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onlyUpdateForKeys} from 'recompose';
import {bindActionCreators} from 'redux';

import actions from '../actions/sideBar';
import actionsProblem from '../../models/problem/actions';
import FlatButton from '../../common/components/FlatButton';
import {menuContent, modalContent} from './iconDefinition';


const Container = styled.div`
    height: 100%;
    background-color: #d2d2d6;

    display: grid;
    grid-template-areas: 'top' 'middle' 'bottom';
    align-content: space-between;
`;

const TopButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0 20px 0;
    grid-area: top;
`;

const BottomButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0 20px 0;
    grid-area: bottom;
`;

class ActivityBar extends React.Component {
    toggleSideBarElement = index => (event) => {
        // TODO MOVE TO ANOTHER PLACE
        // Get challenge
        this.props.loadProblemList();

        const {selectedIndex, status, duration, setIndex, setStatus} = this.props;

        // animation management
        // closing
        if (selectedIndex === index) {
            setStatus('closing');
            setTimeout(() => {
                setStatus('closed');
            }, duration);
        }
        // opening
        // only launch animation if not already opened
        else {
            // set index
            setIndex(index);
            if (status !== 'opened') {
                setStatus('opening');
                setTimeout(() => setStatus('opened'), duration);
            }
        }
    };
    openModalElement = index => (event) => {
        // Add function to open element
        console.log(index);
    };

    render() {
        const {selectedIndex} = this.props;

        return (
            <Container>
                <TopButtonGroup>
                    {menuContent.map(({icon, name}, index) => (
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
                </TopButtonGroup>
                <BottomButtonGroup>
                    {modalContent.map(({icon, name}, index) => (
                        <FlatButton
                            key={name}
                            icon={icon}
                            onClick={this.openModalElement}
                            disabled
                        >
                            {icon}
                        </FlatButton>
                    ))}
                </BottomButtonGroup>
            </Container>
        );
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
