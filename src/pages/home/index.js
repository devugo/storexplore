import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';

import Button from '@material-ui/core/Button';
import ButtonBut from 'react-bootstrap/Button';

// CUSTOM COMPONENTS
import { Message } from '../../components/message';

import * as CONSTANTS from '../../constants';

//  Redux Actions
import * as AuthActions from '../../store/actions/auth';

const Home = () => {
    const userAuth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const processLogout = useCallback(async () => {
        try {
            await dispatch(AuthActions.logout());
            Message('success', 'Logout successful', 5);
            // setLoader(false);
        }catch (error){
            // console.log(error.response)
            let callError = CONSTANTS.ERRORDESC;

            Message('error', callError, 5);
        }
    }, []);

    if(!userAuth.loggedIn){
        return <Redirect to="/login" />
    }

    return (
        <div>
             <Button variant="contained" color="primary">
                Hello World
            </Button>
            <ButtonBut>New Array</ButtonBut>
            <Button variant="contained" color="primary" onClick={processLogout}>
                LOGOUT
            </Button>
        </div>
    )
}

export default Home;