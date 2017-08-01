import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Button from 'material-ui/Button';
import withUserAgent from 'react-useragent';
import theme from '../../../../../../css/variables';

const left = 250;

const style = {
    wrapper: {
        position: 'relative',
        marginLeft: left,
    },
    p: isFocused => ({
        display: 'inline-block',
        verticalAlign: 'top',
        border: `1px solid ${isFocused ? '#3f8bea' : 'rgba(0, 0,0, 0.1)'}`,
        padding: 10,
        width: '60%',
    }),
    actions: {
        position: 'absolute',
        top: 0,
        left: left * -1,
        display: 'inline-block',
        verticalAlign: 'top',
    },
    button: {
        cursor: 'pointer',
        color: '#fff',
        backgroundColor: theme['primary-color'],
        borderColor: theme['primary-color'],
        border: '1px solid transparent',
        outline: 0,
        lineHeight: 1.5,
        fontSize: 12,
        borderRadius: 4,
        padding: '4px 15px',
    },
};

class Paragraph extends React.Component {
    toggleCode = e => this.props.onToggleCode('code', this.props.node.key);
    remove = e => this.props.remove(this.props.node.key);

    render() {
        const {node, state, attributes, children} = this.props;
        const isFocused = state.selection.hasEdgeIn(node);
        const isFirefox = !!~this.props.ua.md.ua.indexOf('Firefox/');

        return (
            <div style={style.wrapper}>
                <div style={style.actions} contentEditable={false}>
                    {isFirefox && <button
                        type="button"
                        className="toggle"
                        style={style.button}
                        onMouseDown={this.toggleCode}
                        contentEditable={false}
                    />
                    }
                    {!isFirefox &&
                    <Button
                        raised
                        color="primary"
                        onMouseDown={this.toggleCode}
                        contentEditable={false}
                    >Toggle</Button>}

                    <IconButton
                        onMouseDown={this.remove}
                        contentEditable={false}
                        readOnly
                        unselectable="ON"
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
                <p
                    {...attributes}
                    style={style.p(isFocused)}
                    contentEditable
                    suppressContentEditableWarning
                >{children}</p>
            </div>);
    }
}

Paragraph.propTypes = {
    node: PropTypes.shape({
        key: PropTypes.string,
    }).isRequired,
    state: PropTypes.shape({}).isRequired,
    onToggleCode: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    attributes: PropTypes.shape({}).isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    ua: PropTypes.shape({
        md: PropTypes.shape({
            ua: PropTypes.string,
        }),
    }).isRequired,
};

export default withUserAgent(Paragraph);
