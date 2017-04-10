/**
 * Created by guillaume on 3/3/17.
 */

import React from 'react';
import {Button, Tag, Row, Col, Input, Icon} from 'antd';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import {onlyUpdateForKeys} from 'recompose';


const style = {
    dashboard: {
        float: 'right',
        marginTop: '15px',
        fontSize: '13px',
    },
    main: {
        fontSize: 20,
        letterSpacing: 1,
        margin: '15px 0px',
    },
    button: {
        margin: '15px 0px',
    },
};

class Top extends React.Component {
    constructor(props) {
        super(props);
        this.openDashboard = this.openDashboard.bind(this);
        this.showAlgoModal = this.showAlgoModal.bind(this);
    }

    openDashboard() {
        this.props.history.replace(`/experiments/${this.props.id}/dashboard`);
    }

    showAlgoModal() {
        this.props.setCreateModalAlgo(true);
    }

    render() {
        const {item} = this.props;

        return (<div>
            <Row>
                <Col span={12}>
                    <h1 style={style.main}>
                        <Link to="/experiments">Experiments</Link> > {item.name}
                    </h1>
                </Col>
                <Col span={12}>
                    <Button
                        type="primary"
                        style={style.button}
                        className="custom-primary"
                        onClick={this.showAlgoModal}
                    >
                        Create algo
                    </Button>
                    {/*<Button*/}
                        {/*style={style.dashboard}*/}
                        {/*id={'buttonId'}*/}
                        {/*type="primary"*/}
                        {/*className="custom-primary"*/}
                        {/*onClick={this.openDashboard}*/}
                    {/*>*/}
                        {/*Dashboard*/}
                    {/*</Button>*/}
                </Col>
            </Row>
            <Row >
                <Col span={18}>
                    <Tag color='blue'>{item.owner}</Tag>
                    {item.shared_with.map(k => <Tag color='blue'>{k}</Tag>)}
                    {item.dataset && item.dataset.length &&
                    <Tag color='blue'>{item.dataset}</Tag>
                    }
                </Col>
                <Col span={6}>
                    <Input
                        addonAfter={<Icon type="link" />}
                        defaultValue={item.id}
                        value={item.id}
                        readOnly
                    />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <p className="experiment-description">
                        {item.description}
                    </p>
                </Col>
            </Row>
        </div>);
    }
}

export default onlyUpdateForKeys(['item'])(withRouter(Top));
