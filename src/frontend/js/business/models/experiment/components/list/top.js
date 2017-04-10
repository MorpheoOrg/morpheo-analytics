/**
 * Created by guillaume on 3/3/17.
 */


import React from 'react';
import {Row, Col, Button} from 'antd';
import {pure} from 'recompose';

const style = {
    col: {
        paddingTop: 15,
    },
    button: {
        float: 'right',
    },
};

const Top = ({showModal}) =>
    <Row>
        <Col span={12}><h1 className="main">Experiments</h1></Col>
        <Col span={12} style={style.col}>
            <Button
                style={style.button}
                type="primary"
                size="large"
                className="custom-primary"
                onClick={showModal}
            >
                Create Experiment
            </Button>
        </Col>
    </Row>;

export default pure(Top);
