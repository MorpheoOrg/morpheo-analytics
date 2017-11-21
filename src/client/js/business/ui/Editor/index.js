import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onlyUpdateForKeys} from 'recompose';
import styled from 'react-emotion';

import {getPaneIdList} from './selector';
import Pane from './components/Pane';


const Container = styled.div`
    width: 100%;
    display: flex;
`;


// class Editor extends React.Component {
//     // store dragged table which is droppable in state
//     // state = {
//     //     draggedTab: null,
//     // };

//     // handleTabDragStart = (draggedTab) => {
//     //     // Activate the droppable mode
//     //     this.setState({draggedTab});
//     // };

//     // handleTabDragEnd = () => {
//     //     // Deactivate the droppable mode
//     //     this.setState({draggedTab: null});
//     // };

//     // // Next functions are provided just for test the component
//     // removeEditor = key => (event) => {
//     //     event.preventDefault();
//     // };

//     render() {
//         const {paneIdList} = this.props;
//         console.log(paneIdList);
//         return (
//             <Container>
//                 {paneIdList.map(paneId => (
//                     <li
//                         key={paneId}
//                         paneId={paneId}
//                     >
//                         {paneId}
//                     </li>
//                 ))}
//             </Container>
//         );
//     }
// }

const Editor = ({paneIdList}) => {
    console.log('Render pane');
    return (
        <Container>
            {paneIdList.map(paneId => (
                <Pane
                    key={paneId}
                    paneId={paneId}
                />
            ))}
        </Container>
    );
};

Editor.propTypes = {
    paneIdList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    paneIdList: getPaneIdList(state),
});

export default connect(mapStateToProps)(onlyUpdateForKeys([
    'paneIdList',
])(Editor));
