/**
 * Created by guillaume on 5/3/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {create} from '../business/kernel/actions';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inpsb3RlbiJ9.6kZ-0Y96-gAzrOXzqH91F9WAgAAFXpRaayVifYjuEv4';
    }

    componentWillMount() {
        this.props.connect({jwt: this.jwt});
    }

    render() {
        return null;
    }
}

const noop = () => {};

App.propTypes = {
    connect: PropTypes.func,
};

App.defaultProps = {
    connect: noop,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    connect: create.request,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
