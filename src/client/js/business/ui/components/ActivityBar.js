import {css} from 'emotion';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onlyUpdateForKeys} from 'recompose';
import {bindActionCreators} from 'redux';

import actions from '../actions/sideBar';


class ActivityBar extends React.Component {
    style = css`{
        display: flex;
        flex-direction: column;
        background-color: #d2d2d6;
        justify-content: space-between;

        & .button-group{
            display: flex;
            flex-direction: column;

            margin: 20px 0 20px 0;
            & button {
                margin: 5px;
                height: 42px;
                width: 42px;
            }
        }
    }`;

    render() {
        return (<div className={this.style}>
            <div className={'button-group'}>
                <button onClick={this.props.toogleVisibility}>H</button>
                <button>E</button>
                <button>C</button>
            </div>
            <div className={'button-group'}>
                <button>Su</button>
                <button>Se</button>
            </div>
        </div>);
    }
}


ActivityBar.propTypes = {
    toogleVisibility: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
    toogleVisibility: actions.toogleVisibility,
}, dispatch);

export default connect(undefined, mapDispatchToProps)(
    onlyUpdateForKeys([])(ActivityBar));
