import React, {PropTypes, Component} from 'react';
import TimeAgo from 'react-timeago';
import {Row, Col, Button, Popconfirm} from 'antd';
import {round} from 'lodash';
import {onlyUpdateForKeys} from 'recompose';


const deleteButtonStyle = {
    float: 'right',
    margin: '5px',
};


// TODO put displayTable in its own file for handling shouldComponentUpdate with onlyUpdateForKeys
const displayTableStyle = {
    margin: '5px',
};

const DisplayTable = ({obj, title}) =>
    <div style={displayTableStyle}>
        <h4>{title}</h4>
        <table>
            <tbody>
                {obj && Object.keys(obj).map((e, i) =>
                    <tr key={i}>
                        <td>{e}</td>
                        <td>{obj[e]}</td>
                    </tr>,
            )}
            </tbody>
        </table>
    </div>;


class Trial extends Component {
    constructor(props) {
        super(props);
        this.setIsExpanded = this.setIsExpanded.bind(this);
        this.deleteTrial = this.deleteTrial.bind(this);
    }

    setIsExpanded() {
        this.props.setIsExpanded({
            id: this.props.trial.id,
            isExpanded: !this.props.trial.isExpanded,
        });
    }

    deleteTrial(id) {
        this.props.deleteTrial(id);
    }

    render() {
        const {trial, item} = this.props;

        return trial.isExpanded ?
            <li className="trial-expanded">
                <div className="trial trial-expanded-header" onClick={this.setIsExpanded}>
                    <h2>{trial.algo_name}</h2>
                    <div className="date">
                        <TimeAgo date={trial.created} />
                    </div>
                    <div className="score">
                        <span>{item.metrics[0]}:</span>
                        {round(trial.results[item.metrics[0]], 3)}
                    </div>
                </div>
                <div className="trial-expanded-content">
                    <q>{this.props.trial.comment}</q>
                    <Row>
                        <Col span={12}>
                            <DisplayTable obj={trial.parameters} title={'Parameters'} />
                        </Col>
                        <Col span={12}>
                            <DisplayTable obj={trial.results} title={'Metrics'} />
                        </Col>
                        <Popconfirm
                            placement="top"
                            title={'Are you sure ?'}
                            onConfirm={this.deleteTrial}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button style={deleteButtonStyle} type="default">
                                Delete
                            </Button>
                        </Popconfirm>
                    </Row>
                </div>
            </li>
            :
            <li className="trial" onClick={this.setIsExpanded}>
                <h3>{trial.algo_name}</h3>
                <div className="date">
                    <TimeAgo date={trial.created} />
                </div>
                <div className="score">
                    <span>{item.metrics[0]}:</span>{round(trial.results[item.metrics[0]], 3)}
                </div>
            </li>;
    }
}


Trial.propTypes = {
    trial: PropTypes.shape({}).isRequired,
    item: PropTypes.shape({}).isRequired,

    deleteTrial: PropTypes.func.isRequired,
    setIsExpanded: PropTypes.func.isRequired,
};

export default onlyUpdateForKeys(['trial', 'item'])(Trial);
