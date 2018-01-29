import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';


/**
 * Display an element depending on the type `contentType` to display.
 */
const TabContentRenderer = (
    {contentType, contentId, props, renderers, updateProps}
) => {
    const {content: Content} = renderers[contentType];
    return <Content id={contentId} updateProps={updateProps} {...props} />;
};

TabContentRenderer.propTypes = {
    /** Content identifier. */
    contentId: PropTypes.string.isRequired,
    /** Content type. */
    contentType: PropTypes.string.isRequired,
    /** Dictionnary associating a content type to a React component. */
    renderers: PropTypes.objectOf(PropTypes.shape({
        content: PropTypes.func.isRequired,
        title: PropTypes.func.isRequired,
    })).isRequired,
    /** Props associated to the tab. */
    props: PropTypes.shape({}).isRequired,
    /** Function to let the content save their state. */
    updateProps: PropTypes.func.isRequired,
};


export default onlyUpdateForKeys([
    'contentId', 'contentType', 'props', 'updateProps',
])(TabContentRenderer);
