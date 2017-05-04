/* eslint react/no-danger: 0 */

import {PropTypes} from 'prop-types';
import React from 'react';
import {Button} from 'antd';
import {onlyUpdateForKeys} from 'recompose';

import SlateEditor from './slate';

const style = {
    main: {
        margin: '0 auto',
        padding: '10px 30px 0 30px',
    },
    cell: {
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '30px 30px 10px',
        borderRadius: 10,
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
        overflow: 'visible',
    },
};

class Cell extends React.Component {

    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.delete = this.delete.bind(this);
    }

    delete() {
        this.props.deleteCell(this.props.cell.id);
    }

    send() {
        this.props.send({code: this.props.cell.value, id: this.props.cell.id});
    }

    render() {
        const {cell, set} = this.props;

        return (
            <div style={style.main}>
                <div style={style.cell}>
                    <div className="cell">
                        Cell n°{cell.id} :
                        <SlateEditor set={set} cell={cell} />
                        <div>
                            <Button onClick={this.delete} icon="delete" />
                            <Button onClick={this.send}>Send</Button>
                        </div>
                    </div>
                    {cell.content && <div className="result" dangerouslySetInnerHTML={{__html: cell.content}} />}
                </div>
            </div>);
    }
}

Cell.propTypes = {
    cell: PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string,
    }),
    deleteCell: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired,
};

Cell.defaultProps = {
    cell: undefined,
};

export default onlyUpdateForKeys(['cell'])(Cell);
