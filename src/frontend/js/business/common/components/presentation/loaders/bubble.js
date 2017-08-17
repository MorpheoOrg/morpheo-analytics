/**
 * Created by guillaume on 11/4/16.
 */

import React from 'react';
import theme from '../../../../../../css/variables';
import {PulseLoader} from 'react-spinners';

const BubbleLoading = props => <PulseLoader color={theme['primary-color']} size={6} {...props}/>;

export default BubbleLoading;
