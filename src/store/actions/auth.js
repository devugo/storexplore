// import axios from 'axios';

// import * as CONSTANTS from '../../constants/index';
// import * as LocalStore from '../../helpers/functions/localStore';

// export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const login = (user) => {
    return async (dispatch, getState) => {
        try{
            // const response = await axios({
            //     method: 'POST',
            //     url: `${CONSTANTS.HOST}/api/login`,
            //     headers: {
            //         'content-type': 'application/json',
            //     },
            //     data: formData
            // });
            // let resData = await response.data;
            // console.log(resData)
          
            
            dispatch({
                type: LOGIN_USER,
                data: user
            });
        }catch(err){
            throw err;
        }
    }
}