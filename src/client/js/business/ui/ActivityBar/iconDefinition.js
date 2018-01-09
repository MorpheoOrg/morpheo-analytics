import React from 'react';

import ProblemList from '../../models/problem/components/list/ProblemList';

import Poll from '../../common/components/icons/Poll';
import FlaskOutline from '../../common/components/icons/FlaskOutline';
import BookOpen from '../../common/components/icons/BookOpen';
import CloudUpload from '../../common/components/icons/CloudUpload';
import Settings from '../../common/components/icons/Settings';


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
