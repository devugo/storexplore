// import axios from 'axios';

// import * as CONSTANTS from '../../constants/index';
import * as LocalStore from '../../helpers/functions/localStore';

// export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const login = (user) => {
    return async (dispatch, getState) => {
        try{
            dispatch({
                type: LOGIN_USER,
                data: user
            });
        }catch(err){
            throw err;
        }
    }
}

export const keepUserLoggedIn = () => {
    let getUserFromocalStore = LocalStore.get('DEVUGOUSER');
    if(getUserFromocalStore){
        getUserFromocalStore = JSON.parse(getUserFromocalStore);
        return async (dispatch, getState) => {
            try{
                dispatch({
                    type: LOGIN_USER,
                    data: getUserFromocalStore
                });
            }catch(err){
                throw err;
            }
        }
    }
}