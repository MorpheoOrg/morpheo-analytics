import React from 'react';
import PropTypes from 'prop-types';
import {onlyUpdateForKeys} from 'recompose';

/**
 * Display an element depending on the type `contentType` to display.
 */
const TabTitle = ({renderers, contentType, title, props}) => {
    const {title: Title} = renderers[contentType];
    return (
        <Title {...props}>
            {title}
        </Title>
    );
};

TabTitle.propTypes = {
    /** Content type. */
    contentType: PropTypes.string.isRequired,
    /** Dictionnary associating a content type to a React component. */
    props: PropTypes.shape({}).isRequired,
    /** Function to let the content save their state. */
    renderers: PropTypes.objectOf(PropTypes.shape({
        content: PropTypes.func.isRequired,
        title: PropTypes.func.isRequired,
    })).isRequired,
    /** Title to render. */
    title: PropTypes.string.isRequired,
};

export default onlyUpdateForKeys([
    'contentId', 'contentType', 'title',
])(TabTitle);
