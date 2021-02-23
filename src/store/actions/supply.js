import { firestore } from '../../firebase';

export const CREATE_SUPPLY = 'CREATE_SUPPLY';
export const READ_SUPPLY = 'READ_SUPPLY';
export const UPDATE_SUPPLY = 'UPDATE_SUPPLY';

export const create = (formData) => {
    return async (dispatch, getState) => {
        
        let state = getState();
        try{
            
            let uuid = state.auth.data.uid;
            const ref = Math.random().toString(36).slice(2);
            const supplyRef = firestore.doc(`supply/${ref}`);
            
                const { name, description, cost, sellingPrice } = formData;
                let date = new Date();
                try {
                    await supplyRef.set({
                        uuid,
                        name,
                        cost,
                        description,
                        sellingPrice,
                        createdAt: date,
                        updatedAt: date
                    });
                    dispatch({
                        type: CREATE_SUPPLY,
                        data: {
                            ...formData,
                            uuid: uuid,
                            createdAt: date,
                            updatedAt: date
                        }
                    });
                } catch (error) {
                    console.error("Error creating user document", error);
                    throw error;
                }
            // }

           
        }catch(err){
            throw err;
        }
    }
}

// export const update = (formData) => {
//     return async (dispatch, getState) => {
//         // console.log(getState())
//         let state = getState();
//         try{
//             const storeRef = firestore.doc(`stores/${state.auth.data.uid}`);
//             const snapshot = await storeRef.get();
//             if (snapshot.exists) {
//                 const { name, address, sector, description } = formData;
//                 let date = new Date();
//                 try {
//                     await storeRef.update({
//                         name,
//                         address,
//                         sector,
//                         description,
//                         updatedAt: date
//                     });
//                     dispatch({
//                         type: UPDATE_STORE,
//                         data: {
//                             ...formData,
//                             updatedAt: date
//                         }
//                     });
//                 } catch (error) {
//                     console.error("Error creating user document", error);
//                     throw error;
//                 }
//             }

           
//         }catch(err){
//             throw err;
//         }
//     }
// }

export const read = (formData) => {
    return async (dispatch, getState) => {
        // console.log(getState())
        let state = getState();
        let uuid = state.auth.data.uid;
        
        try{
            
            const supplyRef = firestore.collection(`supply`).where('uuid', "==", uuid);
            const snapshots = await supplyRef.get();

            let supply = [];
            snapshots.forEach((doc) => supply.push(doc.data()))

            // console.log(supply)
            try {
                
                dispatch({
                    type: READ_SUPPLY,
                    data: supply
                });
            } catch (error) {
                console.error("Error creating user document", error);
                throw error;
            }

           
        }catch(err){
            throw err;
        }
    }
}