import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'react-emotion';

import actions from './actions';
import {getLoginVariables} from './selectors';


const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: rgba(0,0,0,0.3);
`;

const Modal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FAFAFB;
    border-radius: 3px;
`;

const Header = styled.div`
    padding: 20px;
`;

const H1 = styled.h1`
    font-weight: 400;
    padding-bottom: 20px;
`;

const Form = styled.form`
    display: block;
    padding: 20px;
`;

const Group = styled.div`
    margin-bottom: 3rem;
`;

const Label = styled.label`
    display: inline-block;
    margin-bottom: .5rem;
`;

const Input = styled.input`
    margin-bottom: 1rem;
    display: block;
`;

const FullInput = styled(Input)`
    width: 100%;
`;

class Login extends React.Component {
    state = {
        ORCHESTRATOR_USER: this.props.ORCHESTRATOR_USER,
        ORCHESTRATOR_PASSWORD: this.props.ORCHESTRATOR_PASSWORD,
        STORAGE_USER: this.props.STORAGE_USER,
        STORAGE_PASSWORD: this.props.STORAGE_PASSWORD,
    };

    changeOrchestratorUsername = (event) => {
        this.setState({
            ORCHESTRATOR_USER: event.target.value,
        });
    }

    changeOrchestratorPassword = (event) => {
        this.setState({
            ORCHESTRATOR_PASSWORD: event.target.value,
        });
    }

    changeStorageUsername = (event) => {
        this.setState({
            STORAGE_USER: event.target.value,
        });
    }

    changeStoragePassword = (event) => {
        this.setState({
            STORAGE_PASSWORD: event.target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.login(this.state);
    }

    render() {
        return (
            <Background>
                <Modal>
                    <Header>
                        <H1>First connection</H1>

                        Please provide the following information.
                    </Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Group>
                            <Label>
                                Orchestrator username:
                            </Label>
                            <FullInput
                                type="text"
                                value={this.state.ORCHESTRATOR_USER}
                                onChange={this.changeOrchestratorUsername}
                            />
                            <Label>
                                Orchestrator password:
                            </Label>
                            <FullInput
                                type="password"
                                value={this.state.ORCHESTRATOR_PASSWORD}
                                onChange={this.changeOrchestratorPassword}
                            />
                        </Group>

                        <Group>
                            <Label>
                                Storage username:
                            </Label>
                            <FullInput
                                type="text"
                                value={this.state.STORAGE_USER}
                                onChange={this.changeStorageUsername}
                            />
                            <Label>
                                Storage password:
                            </Label>
                            <FullInput
                                type="password"
                                value={this.state.STORAGE_PASSWORD}
                                onChange={this.changeStoragePassword}
                            />
                        </Group>
                        <Input type="submit" value="Continue" />

                    </Form>
                </Modal>
            </Background>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    ORCHESTRATOR_USER: PropTypes.string,
    ORCHESTRATOR_PASSWORD: PropTypes.string,
    STORAGE_USER: PropTypes.string,
    STORAGE_PASSWORD: PropTypes.string,
};

Login.defaultProps = {
    ORCHESTRATOR_USER: '',
    ORCHESTRATOR_PASSWORD: '',
    STORAGE_USER: '',
    STORAGE_PASSWORD: '',
};

const mapStateToProps = (state, ownProps) => ({
    ...getLoginVariables(state),
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    login: actions.env.set,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([

])(Login));
