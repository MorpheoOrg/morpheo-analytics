import React from 'react';

import ProblemList from '../../models/problem/components/list/ProblemList';
import ExperimentList from '../../models/experiment/components/ExperimentList';


export const menuContent = [
    {
        name: 'Problems',
        icon: "P",
        content: <ProblemList />,
        // detail: <div>HELLO</div>,
    },
    {
        name: 'Experiments',
        icon: "F",
        content: <ExperimentList />,
    },
    {
        name: 'Notebook',
        icon: "B",
    },
];

export const modalContent = [
    {
        name: 'Submission',
        icon: "C",
    },
    {
        name: 'Settings',
        icon: "S",
    },
];

export default {menuContent, modalContent};
