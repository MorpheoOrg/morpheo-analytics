/**
 * Created by guillaume on 3/24/17.
 */
import React from 'react';
import UserForm from '../form/settings';
import {Button} from 'antd';

const style = {
    main: {
        background: '#F7F7F7',
        padding: '10px 20px',
        margin: '10px 0px',
        borderRadius: 5,
        border: '1px solid #EFEFEF',
        clear: 'both',
        height: 50,
        display: 'flex',
        justifyContent: 'space-between',
        boxShadow: 'inset 0px 20px 50px -10px white',
    },
    h3: {
        margin: 5,
    }
};

const Settings = ({shared_with, ...props}) =>
    <div>
        <UserForm {...props}/>
        <h4>Experiments Shared With Me</h4>
        {shared_with && !!shared_with.list.results.length && shared_with.list.results.map(e =>
            <div key={e.name} style={style.main}>
                <h3 style={style.h3}>{e.name}</h3>
                <Button>Remove</Button>
            </div>
        )}
        {!shared_with.list.results.length &&
        <p>No one share experiments with you yet</p>}
    </div>;

export default Settings;
