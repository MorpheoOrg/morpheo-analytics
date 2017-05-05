/**
 * Created by guillaume on 5/3/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Konami from 'react-konami';
import {Modal, Button} from 'antd';

import Morpheo from '!!file-loader!../../img/konami.jpg';
import {create} from '../business/kernel/actions';

console.log(Morpheo);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayModal = this.displayModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inpsb3RlbiJ9.6kZ-0Y96-gAzrOXzqH91F9WAgAAFXpRaayVifYjuEv4';
    }

    state = {visible: false}

    componentWillMount() {
        this.props.connect({jwt: this.jwt});
    }

    displayModal() {
        this.setState({
            visible: true,
        });
    }

    handleOk() {
        this.setState({
            visible: false,
        });
    }

    render() {
        return (<div>
            <Konami easterEgg={this.displayModal.bind(this)}/>
            <Modal title="Hello from the team" visible={this.state.visible} width={800}
                   onCancel={this.handleOk.bind(this)}
                   footer={[
                       <Button key="submit" type="primary" size="large" onClick={this.handleOk.bind(this)}>
                           Ok
                       </Button>,
                   ]}>
                <img src={Morpheo} alt="Konami"/>
            </Modal>
        </div>);
    }
}

const noop = () => {
};

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
