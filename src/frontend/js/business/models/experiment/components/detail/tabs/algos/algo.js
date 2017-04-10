import React, {Component} from 'react';
import {Row, Col, Button, Popconfirm, Input, Icon} from 'antd';
import {onlyUpdateForKeys} from 'recompose';

const style = {
    overlayStyle: {
        zIndex: 2,
    },
    col: {
        textAlign: 'right',
    }
};

const onChange = value => console.log('value changed to ', value);

class Algo extends React.Component {

    constructor(props) {
        super(props);
        this.deleteAlgo = this.deleteAlgo.bind(this);
    }

    deleteAlgo() {
        this.props.deleteAlgo(this.props.algo.id);
    }

    render() {
        const {algo} = this.props;

        return <div className="algolist-wrapper">
                    <Row className="algolist-header">
                        <Col span={12}>
                            <h3>{algo.name}</h3>
                        </Col>
                        <Col span={12} style={style.col}>
                            <b>{algo.trial_count} trials</b>
                        </Col>
                    </Row>
                    <div className="algolist-content">
                        <Row>
                            <Col span={12}>
                                <h4>Required Parameters:</h4>
                                <ul>
                                    {algo.parameters.map(p =>
                                        <li key={p.name}>{p.name}</li>
                                    )}
                                </ul>
                            </Col>
                            <Col span={12} style={style.col}>
                                <Input
                                    addonAfter={<Icon type="link" />}
                                    defaultValue={algo.id}
                                    value={algo.id}
                                    onChange={onChange}
                                />
                                <br />
                                <Popconfirm
                                    placement="top" title={'Are you sure ?'}
                                    onConfirm={this.deleteAlgo} okText="Yes"
                                    cancelText="No"
                                    overlayStyle={style.overlayStyle}
                                >
                                    <Button id={'buttonId'}>Delete</Button>
                                </Popconfirm>
                            </Col>
                        </Row>
                    </div>
                </div>
    }
}

export default onlyUpdateForKeys(['algo'])(Algo);
