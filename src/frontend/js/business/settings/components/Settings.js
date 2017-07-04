/**
 * Copyright Morpheo Org. 2017
 *
 * contact@morpheo.co
 *
 * This software is part of the Morpheo project, an open-source machine
 * learning platform.
 *
 * This software is governed by the CeCILL license, compatible with the
 * GNU GPL, under French law and abiding by the rules of distribution of
 * free software. You can  use, modify and/ or redistribute the software
 * under the terms of the CeCILL license as circulated by CEA, CNRS and
 * INRIA at the following URL "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Select, Switch} from 'antd';

import languages from '../../notebook/components/Editor/languages';
import themes from '../../notebook/components/Editor/themes';

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

    setLineNumbers(checked) {
        this.props.setLineNumbers(checked);
    }

    selectLanguage(language) {
        this.props.setPreferredLanguage(language);
    }

    selectTheme(theme) {
        this.props.setTheme(theme);
    }

    render() {
        const {settings: {preferred_language, theme, line_numbers}} = this.props;

        return (<div>
            <h1>Settings</h1>
            <div style={style.main}>
                <div>
                    <label htmlFor={'language'} style={style.label}>Preferred language:</label>
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
                    <label htmlFor={'theme'} style={style.label}>Theme:</label>
                    <Select
                        style={style.select}
                        defaultValue={`${theme || 0}`}
                        onChange={this.selectTheme}
                    >
                        {themes.map(o =>
                            <Option key={o} value={`${themes.findIndex(a => a === o)}`}>{o || 'morpheo'}</Option>,
                        )}
                    </Select>
                </div>
                <div>
                    <label htmlFor={'line_numbers'} style={style.label}>Line numbers:</label>
                    <Switch defaultChecked={line_numbers} onChange={this.setLineNumbers} />
                </div>
            </div>
            <p>Use key shortcuts <span style={style.shortcut}>ctrl+a</span> and <span style={style.shortcut}>ctrl+b</span> for adding a cell above or below the selected cell.
                <br />
                Use <span style={style.shortcut}>shift+Enter</span> to execute code.
            </p>
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
