import React from 'react';
import universal from 'react-universal-component';


const Universal = universal(import('./preload'), {});

export default () => <Universal />;
