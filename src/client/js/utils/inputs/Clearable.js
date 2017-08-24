import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui-icons/Clear';

const Clearable = (ComposedComponent) => {
    class Component extends React.Component {
        constructor(props) {
            super(props);
            this.clear = this.clear.bind(this);
        }

        clear(event) {
            event.preventDefault();
            this.component.clear();
        }

        render() {
            return (
                <div style={{position: 'relative'}}>
                    <ComposedComponent
                        ref={(c) => {
                            this.component = c;
                        }}
                        {...this.props}
                    />
                    {this.props.input.value &&
                    <IconButton
                        onClick={this.clear}
                        style={{
                            position: 'absolute',
                            top: '38px',
                            right: '4px',
                            padding: '0',
                            width: '24px',
                            height: '24px',
                        }}
                    >
                        <Clear />
                    </IconButton>
                    }
                    {this.props.meta.touched && this.props.meta.error &&
                    <span className="error">{this.props.error}</span>}
                </div>
            );
        }
    }

    Component.propTypes = {
        input: PropTypes.shape({
            onChange: PropTypes.func,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.shape({}),
                PropTypes.arrayOf(PropTypes.string),
            ]),
        }),
        meta: PropTypes.shape({
            touched: PropTypes.bool,
            error: PropTypes.string,
        }),
        error: PropTypes.string,
    };

    Component.defaultProps = {
        input: null,
        meta: null,
        error: null,
    };

    return Component;
};


export default Clearable;

