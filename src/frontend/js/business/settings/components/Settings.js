/**
 * Created by guillaume on 5/11/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Select} from 'antd';

import languages from '../../cell/components/Editor/languages';
import actions from '../actions';

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
};

const themes = [
    '',
    'coy',
    'dark',
    'funky',
    'okaidia',
    'solarizedlight',
    'tomorrow',
    'twilight',
];

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.selectTheme = this.selectTheme.bind(this);
        this.selectLanguage = this.selectLanguage.bind(this);
    }

    selectTheme(theme) {
        this.props.setTheme(theme);
    }

    selectLanguage(language) {
        this.props.setPreferredLanguage(language);
    }

    render() {
        const {user: {preferred_language, theme}} = this.props;

        return (<div>
            <h1>Settings</h1>
            <div style={style.main}>
                <div>
                    <label style={style.label}>Preferred language:</label>
                    <Select
                        style={style.select} defaultValue={preferred_language || languages[0]}
                        onChange={this.selectLanguage}
                    >
                        {languages.map(o =>
                            <Option key={o} value={o}>{o}</Option>,
                        )}
                    </Select>
                </div>
                <div>
                    <label style={style.label}>Theme:</label>
                    <Select
                        style={style.select} defaultValue={theme || themes[0]}
                        onChange={this.selectTheme}
                    >
                        {themes.map(o =>
                            <Option key={o} value={o}>{o || 'morpheo'}</Option>,
                        )}
                    </Select>
                </div>
            </div>
        </div>);
    }
}

Settings.propTypes = {
    user: PropTypes.shape({
        preferred_language: PropTypes.string,
    }),
    setPreferredLanguage: PropTypes.func,
    setTheme: PropTypes.func,
};

const noop = () => {
};

Settings.defaultProps = {
    user: {},
    setPreferredLanguage: noop,
    setTheme: noop,
};

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setPreferredLanguage: actions.setPreferredLanguage,
    setTheme: actions.setTheme,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
