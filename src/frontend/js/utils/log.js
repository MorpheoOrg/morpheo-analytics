/**
 * Created by guillaume on 2/21/17.
 */
import React from 'react';

const log = BaseComponent => (props) => {
    console.log(`Rendering ${BaseComponent.name}`);
    return <BaseComponent {...props} />;
};

export default log;
