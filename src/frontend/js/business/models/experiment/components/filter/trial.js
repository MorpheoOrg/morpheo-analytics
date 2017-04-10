import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Select, Button, Icon} from 'antd';
import {onlyUpdateForKeys} from 'recompose';

import actions from '../../actions';

const Option = Select.Option;
const OptGroup = Select.OptGroup;


class TrialFilterer extends Component {
    constructor(props) {
        super(props);

        this.setAlgo = this.setAlgo.bind(this);
        this.setOrder = this.setOrder.bind(this);
        this.setDesc = this.setDesc.bind(this);
        this.setLimit = this.setLimit.bind(this);
    }

    componentWillMount() {
        if (this.props.query && this.props.query.algo && this.props.filters.algo !== this.props.query.algo) {
            this.props.setAlgo(this.props.query.algo);
        }

        if (this.props.query && this.props.query.order && this.props.filters.order !== this.props.query.order) {
            this.props.setOrder(this.props.query.order);
        }

        if (this.props.query && this.props.query.desc && this.props.filters.desc !== this.props.query.desc) {
            this.props.setDesc(this.props.query.desc);
        }

        if (this.props.query && this.props.query.limit && this.props.filters.limit !== this.props.query.limit) {
            this.props.setLimit(this.props.query.limit);
        }
    }

    setAlgo(v) {
        this.props.setAlgo(v);
    }

    setOrder(v) {
        this.props.setOrder(v);
    }

    setDesc(v) {
        this.props.setDesc(v);
    }

    setLimit(v) {
        this.props.setLimit(v);
    }

    render() {
        const {filters: {algo, order, limit, desc}, algos, experiment, setFilters} = this.props;

        return (
            <div className="filterer">
                {algos && <Select
                    value={algo}
                    onChange={this.setAlgo}
                    className={'sort-button'}
                >
                    <OptGroup label="Algo">
                        <Option key={'all'} value={null}>All</Option>
                        {algos.results.map((a, i) =>
                            <Option key={a.id} value={a.id}>{a.name}</Option>,
                        )}
                    </OptGroup>
                </Select>
                }
                {experiment && experiment.metrics &&
                <Select
                    value={order}
                    onChange={this.setOrder}
                    className={'sort-button'}
                >
                    <OptGroup label="Order by">
                        <Option key={'date'}>Date</Option>
                        {experiment.metrics.map(m =>
                            <Option key={m}>{m}</Option>,
                        )}
                    </OptGroup>
                </Select>
                }
                <Select
                    value={desc}
                    onChange={this.setDesc}
                    className={'sort-button'}
                >
                    <Option key={1} value={'true'}>Desc</Option>
                    <Option key={2} value={'false'}>Asc</Option>
                </Select>
                <Select
                    value={limit}
                    onChange={this.setLimit}
                    className={'sort-button'}
                >
                    <OptGroup label="Limit">
                        {[10, 20, 30, 60, 100].map((k, i) =>
                            <Option key={i} value={k.toString()}>{k}</Option>,
                        )}
                    </OptGroup>
                </Select>
                <Button type="primary" className={'sort-button apply'} onClick={setFilters}>
                    Apply <Icon type="filter" />
                </Button>
            </div>
        );
    }
}

function mapStateToProps(s, ownProps) {
    const state = s.models.experiment;

    return {
        filters: state.filters,
        query: ownProps.query,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadItem: actions.item.get.request,

        setAlgo: actions.filters.algo.set,
        setOrder: actions.filters.order.set,
        setDesc: actions.filters.desc.set,
        setLimit: actions.filters.limit.set,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(onlyUpdateForKeys(['filters', 'algos', 'experiment'])(TrialFilterer));
