/**
 * Created by guillaume on 11/4/16.
 */

import React from 'react';
import {PulseLoader} from 'react-spinners';

import theme from '../../../../../../css/variables';

const BubbleLoading = props => <PulseLoader color={theme['primary-color']} size={6} {...props} />;

export default BubbleLoading;
