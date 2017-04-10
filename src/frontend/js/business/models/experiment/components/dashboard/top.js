/**
 * Created by guillaume on 3/3/17.
 */

import React from 'react';
import {Button, Row, Col} from 'antd';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import {onlyUpdateForKeys} from 'recompose';

import TrialFilterer from '../filter/trial';

class Top extends React.Component {
    constructor(props) {
        super(props);

        this.closeDashboard = this.closeDashboard.bind(this);
        this.setFilters = this.setFilters.bind(this);

        this.style = {
            main: {
                fontSize: 20,
                letterSpacing: 1,
                margin: '15px 0px',
            },
        };
    }

    setFilters(values) {
        this.props.loadTrials(this.props.id);
    }

    closeDashboard() {
        this.props.history.replace(`/experiments/${this.props.id}`);
    }

    render() {
        const {item, algos, filters, query} = this.props;

        return (<div>
            <Row>
                <Col span={20}>
                    <h1 style={this.style.main}>
                        <Link to={'/experiments'}>Experiments</Link>
                        &nbsp;>&nbsp;
                        <a onClick={this.closeDashboard}>
                            {item.name}
                        </a>
                        &nbsp;>&nbsp;Dashboard
                    </h1>
                </Col>
                <Col span={4}>
                    <Button
                        style={{float: 'right', marginTop: '15px', fontSize: '13px'}}
                        id={'buttonId'}
                        type="default"
                        onClick={this.closeDashboard}
                    >
                        Close Dashboard
                    </Button>
                </Col>
                <Col span={24}>
                    {algos && <TrialFilterer
                        experiment={item}
                        algos={algos}
                        setFilters={this.setFilters}
                        filters={filters}
                        query={query}
                    />}
                </Col>
            </Row>
        </div>);
    }
}

export default onlyUpdateForKeys(['item', 'algos', 'filters'])(withRouter(Top));
