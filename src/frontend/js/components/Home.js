import React from 'react';

import AddCell from '../containers/AddCell';
import NotebookCellList from '../containers/NotebookCellList';


const Home = () => (
    <div className="container">
        <NotebookCellList />
        <AddCell />
    </div>);


export default Home;
