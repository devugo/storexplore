import { LOGIN_USER, LOGOUT_USER } from '../actions/auth';

import User from '../../models/User';
import * as LocalStore from '../../helpers/functions/localStore';

const initialState = {
    data: [],
    loggedIn: false
};

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_USER:
            let userInfo = action.data;
            LocalStore.add('DEVUGOUSER', JSON.stringify(userInfo));

            const userData = new User(
                userInfo.displayName,
                userInfo.email,
                userInfo.photoURL,
                userInfo.uid,
                userInfo.role,
                userInfo.hasStore
            );

            return {
                ...state,
                data: userData,
                loggedIn: true
            }
        case LOGOUT_USER:
            LocalStore.remove('DEVUGOUSER');

            return initialState;

        default:
            return state;
    }
}

export default authReducer;