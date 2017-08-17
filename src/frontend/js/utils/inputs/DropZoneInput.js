/**
 * Created by guillaume on 7/25/16.
 */

/* globals window Event */

import React, {Component, PropTypes} from 'react';
import DropzoneComponent from 'react-dropzone-component';
import ReactDOMServer from 'react-dom/server';
import {isEmpty} from 'lodash';

class DropZoneInput extends Component {
    constructor(props) {
        super(props);
        this.files = [];
        this.config = {
            postUrl: 'no-url',
            ...props.config,
        };

        this.djsConfig = {
            autoProcessQueue: false,
            addRemoveLinks: true,
            previewTemplate: ReactDOMServer.renderToStaticMarkup(
                <div className="dz-preview dz-file-preview">
                    <div className="dz-success-mark"><span>✔</span></div>
                    <div className="dz-error-mark"><span>✘</span></div>
                    <div className="dz-error-message"><span data-dz-errormessage="true" /></div>
                </div>,
            ),
            ...props.djsConfig,
        };

        this.eventHandlers = {
            init: (dropzone) => {
                this.dropzone = dropzone;
            },
            addedfile: (file) => {

                this.files = this.files || [];
                this.files.push(file);

                if (this.props.onConfirm) {
                    this.props.onConfirm(this.files);
                }

                this.props.input.onChange(this.files);
                window.dispatchEvent(new Event('resize'));
            },
            removedfile: (file) => {
                const index = this.files.findIndex(o => o === file);

                this.files.splice(index, 1); // mutable
                this.files = isEmpty(this.files) ? undefined : this.files;
                this.props.input.onChange(this.files);
                window.dispatchEvent(new Event('resize'));
            },
            maxfilesexceeded: (file) => {
                this.dropzone.removeFile(file);
            },
        };
    }

    render() {

        return (<DropzoneComponent
            {...this.props.input}
            config={this.config}
            eventHandlers={this.eventHandlers}
            djsConfig={this.djsConfig}
        />);
    }
}

DropZoneInput.propTypes = {
    config: PropTypes.shape({}),
    djsConfig: PropTypes.shape({}),
    onDrop: PropTypes.func,
    input: PropTypes.shape({
        onChange: PropTypes.func,
    }),
};

export default DropZoneInput;
