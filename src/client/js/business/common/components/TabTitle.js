import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';

/**
 * Display an element depending on the type `contentType` to display.
 */
const TabTitle = ({renderers, contentType, title, props}) => {
    const {[contentType]: Content} = renderers;
    return (
        <Content {...props}>
            {title}
        </Content>
    );
};

TabTitle.propTypes = {
    /** Title to render. */
    title: PropTypes.string.isRequired,
    /** Content type. */
    contentType: PropTypes.string.isRequired,
    /** Dictionnary associating a content type to a React component. */
    renderers: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default onlyUpdateForKeys([])(TabTitle);
