import React from 'react';

import AddCell from '../containers/AddCell';
import ConnectButton from '../containers/ConnectButton';
import NotebookCellList from '../containers/NotebookCellList';


const App = () => (
    <div className="container">
        <ConnectButton />
        <NotebookCellList />
        <AddCell />
    </div>);


export default App;
