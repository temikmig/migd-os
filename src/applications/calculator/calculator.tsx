import { FC } from 'react';
import { Component } from './component/component';

export const appProps = {
    canExpand: false,
    canCollapse: true,
    canResize: false
}

export const appSizes = {
    width: 250,
    height: 350
}

export const App:FC = () => {
    return(<Component />);
}