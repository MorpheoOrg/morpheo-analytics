import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onlyUpdateForKeys} from 'recompose';
import styled from 'react-emotion';

import {getPaneIdList} from './selectors';
import Pane from './components/Pane';


const Container = styled.div`
    width: 100%;
    display: flex;
`;


const Editor = ({paneIdList, renderers}) => (
    <Container>
        {paneIdList.map(paneId => (
            <Pane
                key={paneId}
                paneId={paneId}
                renderers={renderers}
            />
        ))}
    </Container>
);

Editor.propTypes = {
    paneIdList: PropTypes.arrayOf(PropTypes.string).isRequired,
    renderers: PropTypes.objectOf(PropTypes.shape({
        content: PropTypes.func.isRequired,
        title: PropTypes.func.isRequired,
    })).isRequired,
};


const mapStateToProps = (state, ownProps) => ({
    paneIdList: getPaneIdList(state),
});

export default connect(mapStateToProps)(onlyUpdateForKeys([
    'paneIdList',
])(Editor));
