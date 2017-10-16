import React from 'react';
import {Poll, CloudUpload, BookOpen,
    Settings, FlaskOutline} from 'mdi-material-ui';

import ProblemList from '../../models/problem/components/ProblemList';
import ExperimentList from '../../models/experiment/components/ExperimentList';


export const menuContent = [
    {
        name: 'Problems',
        icon: <Poll />,
        content: <ProblemList />,
    },
    {
        name: 'Experiments',
        icon: <FlaskOutline />,
        content: <ExperimentList />,
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
