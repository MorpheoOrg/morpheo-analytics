import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'react-emotion';

import actions from './actions';
import {getCredentials} from './selectors';


const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: rgba(0,0,0,0.3);
    display: flex;
`;

const Modal = styled.div`
    margin: auto;
    background-color: #FAFAFB;

    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0,0,0, 0.25);

    padding-left: 80px;
    padding-right: 80px;
    padding-top: 40px;
    padding-bottom: 40px;
    width: 300px;
`;

const Header = styled.div`
`;

const H1 = styled.h1`
    font-weight: 400;
    padding-bottom: 20px;
`;

const Form = styled.form`
    display: block;
    padding: 20px 0px;
`;

const Group = styled.div`
    margin-bottom: 3rem;
`;

const Label = styled.label`
    display: inline-block;
`;

const Input = styled.input`
    display: block;
    width: 100%;
    padding: 10px;
    margin: 10px 0 20px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;

    &:focus {
        outline: 0;
    }

    &[type="submit"]{
        width: 200px;
        margin: auto;
        margin-top: 40px;
    }
`;

const FullInput = styled(Input)`
    width: 100%;
`;

class Login extends React.Component {
    state = {
        channelName: this.props.channelName,
        chaincodeName: this.props.chaincodeName,
        storageUser: this.props.storageUser,
        storagePassword: this.props.storagePassword,
        username: this.props.username,
        org: this.props.org,
        peer: this.props.peer,
    };

    changeFormProps = propName => (event) => {
        this.setState({
            [propName]: event.target.value,
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
                        <H1>Connection</H1>
                    </Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Group>
                            <Label>
                                Storage username:
                            </Label>
                            <FullInput
                                type="text"
                                value={this.state.storageUser}
                                onChange={this.changeFormProps('storageUser')}
                            />
                            <Label>
                                Storage password:
                            </Label>
                            <FullInput
                                type="text"
                                value={this.state.storagePassword}
                                onChange={this.changeFormProps('storagePassword')}
                            />
                        </Group>

                        <Group>
                            <Label>
                                Channel name:
                            </Label>
                            <FullInput
                                type="text"
                                value={this.state.channelName}
                                onChange={this.changeFormProps('channelName')}
                            />
                            <Label>
                                Chaincode name:
                            </Label>
                            <FullInput
                                type="text"
                                value={this.state.chaincodeName}
                                onChange={this.changeFormProps('chaincodeName')}
                            />
                        </Group>

                        <Group>
                            <Label>
                                Username:
                            </Label>
                            <FullInput
                                type="text"
                                value={this.state.username}
                                onChange={this.changeFormProps('username')}
                            />
                            <Label>
                                Organisation name:
                            </Label>
                            <FullInput
                                type="text"
                                value={this.state.org}
                                onChange={this.changeFormProps('org')}
                            />
                            <Label>
                                Peer name:
                            </Label>
                            <FullInput
                                type="text"
                                value={this.state.peer}
                                onChange={this.changeFormProps('peer')}
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
    channelName: PropTypes.string,
    chaincodeName: PropTypes.string,
    storageUser: PropTypes.string,
    storagePassword: PropTypes.string,
    username: PropTypes.string,
    org: PropTypes.string,
    peer: PropTypes.string,
};

Login.defaultProps = {
    channelName: '',
    chaincodeName: '',
    username: '',
    storageUser: '',
    storagePassword: '',
    org: '',
    peer: '',
};

const mapStateToProps = (state, ownProps) => ({
    ...getCredentials(state),
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    login: actions.env.set,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys([

])(Login));
