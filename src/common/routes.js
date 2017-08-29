/**
 * Copyright Morpheo Org. 2017
 *
 * contact@morpheo.co
 *
 * This software is part of the Morpheo project, an open-source machine
 * learning platform.
 *
 * This software is governed by the CeCILL license, compatible with the
 * GNU GPL, under French law and abiding by the rules of distribution of
 * free software. You can  use, modify and/ or redistribute the software
 * under the terms of the CeCILL license as circulated by CEA, CNRS and
 * INRIA at the following URL "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import UserRoute from '../client/js/business/user/routes';
import CommonRoutes from '../client/js/business/common/routes';
import NotebookRoutes from '../client/js/business/notebook/routes';
import KernelRoutes from '../client/js/business/kernel/routes';
import SettingsRoutes from '../client/js/business/settings/routes';

const mapStateToProps = ({location}, ownProps) => ({location, ...ownProps});

const Base = ({children}) =>
    (<div>
        <CommonRoutes/>
        {children}
    </div>);

Base.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({})),
        PropTypes.shape({}),
    ]).isRequired,
};

export default connect(mapStateToProps)(({location}) => {
    switch (location.type) {
    case 'HOME':
        return (<Base>
            <SettingsRoutes/>
            <NotebookRoutes/>
            <KernelRoutes/>
            <UserRoute/>
        </Base>);
    case 'HELP':
        return (<Base>
            <h1>help</h1>
        </Base>);
    default:
        return <h1>Not Found</h1>;
    }
});
