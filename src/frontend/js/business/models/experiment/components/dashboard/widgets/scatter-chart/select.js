import React, {Component} from 'react';
import {Select} from 'antd';
import {onlyUpdateForKeys} from 'recompose';

const Option = Select.Option;

class S extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.onChange(e);
    }

    render() {
        const {results, title, style, defaultValue} = this.props;

        return (<Select
            style={style}
            placeholder={title}
            defaultValue={defaultValue}
            onChange={this.onChange}
        >
            {results.map((o, i) => <Option key={i} value={o}>{o}</Option>)}
        </Select>);
    }
}


export default onlyUpdateForKeys(['results', 'title'])(S);
