import React from 'react';

import ProblemList from '../../../../models/problem/components/list/ProblemList';

import Poll from '../../../../components/icons/Poll';
import FlaskOutline from '../../../../components/icons/FlaskOutline';
import BookOpen from '../../../../components/icons/BookOpen';
import CloudUpload from '../../../../components/icons/CloudUpload';
import Settings from '../../../../components/icons/Settings';


export const menuContent = [
    {
        name: 'Problems',
        icon: <Poll />,
        content: <ProblemList />,
    },
    {
        name: 'Experiments',
        icon: <FlaskOutline />,
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
