import React, { useState, useEffect, useCallback } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { PageLoader } from '../components/page-preloader';
import * as AuthActions from '../store/actions/auth';

function AdminHasNoStore({ component: Component, ...rest }) {
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
    }, [setMount, dispatch]);

    useEffect(() => {
        if(!auth.loggedIn){ // Try logging user back in
            logUserBackIn();
        }else{
            setMount(true);
        }
    }, [logUserBackIn, auth.loggedIn]);
    return (
        <Route 
            {...rest} // Remember to add a loader page on mounting of page
            render={props => 
                mount ? (
                    auth.loggedIn && auth.data.role === 1 && !auth.data.hasStore  ?  (
                        <Component {...props} />
                    ) 
                    : 
                    auth.loggedIn && auth.data.role === 1 && auth.data.hasStore  ?  (
                        <Redirect to="/admin" />
                    ) 
                    :   
                    (
                        <Redirect to="/login" />
                    )
                ) :
                <PageLoader />
            }
        />
    );
}

export default AdminHasNoStore;