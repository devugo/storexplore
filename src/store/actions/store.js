import { firestore } from '../../firebase';

export const CREATE_STORE = 'CREATE_STORE';
export const READ_STORE = 'READ_STORE';
export const UPDATE_STORE = 'UPDATE_STORE';

export const create = (formData) => {
    return async (dispatch, getState) => {
        // console.log(getState())
        let state = getState();
        try{
            const storeRef = firestore.doc(`stores/${state.auth.data.uid}`);
            const snapshot = await storeRef.get();
            if (!snapshot.exists) {
                const { name, address, sector, description } = formData;
                let date = new Date();
                try {
                    await storeRef.set({
                        name,
                        address,
                        sector,
                        description,
                        createdAt: date,
                        updatedAt: date
                    });
                    dispatch({
                        type: CREATE_STORE,
                        data: {
                            ...formData,
                            createdAt: date,
                            updatedAt: date
                        }
                    });
                } catch (error) {
                    console.error("Error creating user document", error);
                    throw error;
                }
            }else {
                throw new Error({
                    message: "Store already exists!"
                });
            }

           
        }catch(err){
            throw err;
        }
    }
}

export const update = (formData) => {
    return async (dispatch, getState) => {
        // console.log(getState())
        let state = getState();
        try{
            const storeRef = firestore.doc(`stores/${state.auth.data.uid}`);
            const snapshot = await storeRef.get();
            if (snapshot.exists) {
                const { name, address, sector, description } = formData;
                let date = new Date();
                try {
                    await storeRef.update({
                        name,
                        address,
                        sector,
                        description,
                        updatedAt: date
                    });
                    dispatch({
                        type: UPDATE_STORE,
                        data: {
                            ...formData,
                            updatedAt: date
                        }
                    });
                } catch (error) {
                    console.error("Error creating user document", error);
                    throw error;
                }
            }

           
        }catch(err){
            throw err;
        }
    }
}

export const read = (formData) => {
    return async (dispatch, getState) => {
        // console.log(getState())
        let state = getState();
        console.log(state)
        try{
            const storeRef = firestore.doc(`stores/${state.auth.data.uid}`);
            const snapshot = await storeRef.get();
            if (snapshot.exists) {
                // console.log(snapshot.data())
                let store = snapshot.data();
                try {
                  
                    dispatch({
                        type: READ_STORE,
                        data: store
                    });
                } catch (error) {
                    console.error("Error creating user document", error);
                    throw error;
                }
            }else{
                dispatch({
                    type: READ_STORE,
                    data: state.store.data
                });
            }

           
        }catch(err){
            throw err;
        }
    }
}