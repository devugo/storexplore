import { LOGIN_USER } from '../actions/auth';

import User from '../../models/User';
import * as LocalStore from '../../helpers/functions/localStore';

const initialState = {
    data: [],
    loggedIn: false
};

export default (state = initialState, action) => {
    switch(action.type){
        case LOGIN_USER:
            let userInfo = action.data;

            const userData = new User(
                userInfo.displayName,
                userInfo.email,
                userInfo.photoURL,
                userInfo.uid
            );
            LocalStore.add('DEVUGOUSER', JSON.stringify(userData));

            return {
                ...state,
                data: userData,
                loggedIn: true
            }
        default:
            return state;
    }
}