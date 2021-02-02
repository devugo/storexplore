import React, { useState, useEffect, useCallback } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { PageLoader } from '../components/page-preloader';
import * as AuthActions from '../store/actions/auth';

function Admin({ component: Component, ...rest }) {
    const [mount, setMount] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const logUserBackIn = useCallback(async () => {
        try {
            await dispatch(AuthActions.keepUserLoggedIn());
            setMount(true);
        }catch (error){
            setMount(true);
        }
    }, [setMount]);

    useEffect(() => {
        if(!auth.loggedIn){ // Try logging user back in
            logUserBackIn();
        }else{
            setMount(true);
        }
    }, []);
    return (
        <Route 
            {...rest} // Remember to add a loader page on mounting of page
            render={props => 
                mount ? (
                    auth.loggedIn && auth.data.role === 1  ?  (
                        <Component {...props} />
                    ) 
                    : (
                        <Redirect to="/login" />
                    )
                ) :
                <PageLoader />
            }
        />
    );
}

export default Admin;