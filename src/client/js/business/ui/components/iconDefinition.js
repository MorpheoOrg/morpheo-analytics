import React from 'react';
import {Poll, CloudUpload, BookOpen,
    Settings, FlaskOutline} from 'mdi-material-ui';
import ExperimentList from './ExperimentList';


export const menuContent = [
    {
        name: 'Challenges',
        icon: <Poll />,
    },
    {
        name: 'Experiments',
        icon: <FlaskOutline />,
        content: <ExperimentList />
    },
    {
        name: 'Notebook',
        icon: <BookOpen />,
    },
];

export const modalContent = [
    {
        name: 'Submission',
        icon: <CloudUpload />,
    },
    {
        name: 'Settings',
        icon: <Settings />,
    },
];

export default {menuContent, modalContent};
