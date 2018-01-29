import React from 'react';
import {mount} from 'enzyme';

import BookOpen from '../BookOpen';
import ChartLine from '../ChartLine';
import ChevronLeft from '../ChevronLeft';
import ChevronRight from '../ChevronRight';
import Close from '../Close';
import CloudUpload from '../CloudUpload';
import FlaskOutline from '../FlaskOutline';
import FolderDownload from '../FolderDownload';
import Poll from '../Poll';
import Settings from '../Settings';
import Trophy from '../Trophy';


describe('Icons components', () => {
    const iconsComponent = [
        BookOpen, ChartLine, ChevronLeft, ChevronRight, Close, CloudUpload,
        FlaskOutline, FolderDownload, Poll, Settings, Trophy,
    ];

    iconsComponent.forEach(
        Component => it(`should render correctly ${Component.name}`, () => {
            const mountedComponent = mount(<Component />);
            expect(mountedComponent).toMatchSnapshot();
        })
    );
});
