import {css} from 'emotion';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onlyUpdateForKeys} from 'recompose';
import {bindActionCreators} from 'redux';

import actions from '../LeftPanel/actions';


class AppBar extends React.Component {
    style = css`{
        display: flex;
        flex-direction: column;
        background-color: #000;
        justify-content: space-between;
    }`;

    flex = css`{
        display: flex;
        flex-direction: column;

        margin: 20px 0 20px 0;
        & button {
            margin: 5px;
            height: 42px;
            width: 42px;
        }
    }`

    render() {
        return (<div className={this.style}>
            <div className={this.flex}>
                <button onClick={this.props.toogleVisibility}>Home</button>
                <button>Experiences</button>
                <button>Challenge</button>
            </div>
            <div className={this.flex}>
                <button>Submit</button>
                <button>Settings</button>
            </div>
        </div>);
    }
}


AppBar.propTypes = {
    toogleVisibility: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
    toogleVisibility: actions.toogleVisibility,
}, dispatch);

export default connect(undefined, mapDispatchToProps)(
    onlyUpdateForKeys([])(AppBar));
