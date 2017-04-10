/**
 * Created by guillaume on 3/3/17.
 */


import React from 'react';
import {Button, Steps} from 'antd';
import {onlyUpdateForKeys} from 'recompose';

const Step = Steps.Step;

const style = {
    steps: {
        background: '#fff',
        padding: 30,
        margin: '40px 0px',
        borderRadius: 6,
    },
    button: {
        marginTop: 10,
    },
};

class S extends React.Component {

    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
    }

    showModal() {
        this.props.setCreateModalAlgo(true);
    }


    render() {
        const {algos} = this.props;

        return algos ? <Steps
            current={!algos.length ? 1 : 2}
            style={style.steps}
        >
            <Step title="Experiment created" />
            <Step
                title={algos && algos.length < 1 ? 'Create an Algo' : 'Algo Created'}
                description={
                    <div>
                        <p>Click below to create your first algo.</p>
                        <Button
                            size="small"
                            type="ghost"
                            style={style.button}
                            onClick={this.showModal}
                        >
                            Create Algo
                        </Button>
                    </div>
                }
            />
            <Step
                title="Send a trial"
                description="Install the Python client to send your first trial."
            />
        </Steps> : null;
    }
}

export default onlyUpdateForKeys(['algos'])(S);
