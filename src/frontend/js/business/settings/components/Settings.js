/**
 * Created by guillaume on 5/11/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Select, Switch} from 'antd';

import languages from '../../cell/components/Editor/languages';
import themes from '../../cell/components/Editor/themes';

import {actions} from '../actions';

const Option = Select.Option;

const style = {
    main: {
        width: 270,
    },
    select: {
        width: '45%',
    },
    label: {
        display: 'inline-block',
        width: '55%',
    },
    shortcut: {
        color: '#730101',
        backgroundColor: '#c7c6c6',
        padding: '0px 5px',
    },
};

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.selectTheme = this.selectTheme.bind(this);
        this.selectLanguage = this.selectLanguage.bind(this);
        this.setLineNumbers = this.setLineNumbers.bind(this);
    }

    selectTheme(theme) {
        this.props.setTheme(theme);
    }

    selectLanguage(language) {
        this.props.setPreferredLanguage(language);
    }

    setLineNumbers(checked) {
        this.props.setLineNumbers(checked);
    }

    render() {
        const {settings: {preferred_language, theme, line_numbers}} = this.props;

        return (<div>
            <h1>Settings</h1>
            <div style={style.main}>
                <div>
                    <label style={style.label}>Preferred language:</label>
                    <Select
                        style={style.select}
                        defaultValue={`${preferred_language || 0}`}
                        onChange={this.selectLanguage}
                    >
                        {languages.map(o =>
                            <Option key={o} value={`${languages.findIndex(a => a === o)}`}>{o}</Option>,
                        )}
                    </Select>
                </div>
                <div>
                    <label style={style.label}>Theme:</label>
                    <Select
                        style={style.select} defaultValue={`${theme || 0}`}
                        onChange={this.selectTheme}
                    >
                        {themes.map(o =>
                            <Option key={o} value={`${themes.findIndex(a => a === o)}`}>{o || 'morpheo'}</Option>,
                        )}
                    </Select>
                </div>
                <div>
                    <label style={style.label}>Line numbers:</label>
                    <Switch defaultChecked={line_numbers} onChange={this.setLineNumbers}/>
                </div>
            </div>
            <p>Use key shortcuts <span style={style.shortcut}>a</span> and <span style={style.shortcut}>b</span> for adding a cell above or below the selected cell.</p>
        </div>);
    }
}

Settings.propTypes = {
    settings: PropTypes.shape({
        preferred_language: PropTypes.number,
        theme: PropTypes.number,
        line_numbers: PropTypes.bool,
    }),
    setPreferredLanguage: PropTypes.func,
    setTheme: PropTypes.func,
    setLineNumbers: PropTypes.func,
};

const noop = () => {
};

Settings.defaultProps = {
    settings: {},
    setPreferredLanguage: noop,
    setTheme: noop,
    setLineNumbers: noop,
};

const mapStateToProps = state => ({
    settings: state.settings,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setPreferredLanguage: actions.setPreferredLanguage,
    setTheme: actions.setTheme,
    setLineNumbers: actions.setLineNumbers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
