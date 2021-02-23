import { CREATE_STORE, READ_STORE, UPDATE_STORE } from '../actions/store';
import Store from '../../models/Store';

const initialState = {
    data: {
        name: '',
        address: '',
        sector: '',
        description: '',
        createdAt: ''
    },
    loaded: false
};

const storeReducer = (state = initialState, action) => {
    switch(action.type){
        case READ_STORE:

            let readStoreData = action.data;
            let storeData = new Store(
                readStoreData.name,
                readStoreData.address,
                readStoreData.sector,
                readStoreData.description,
                readStoreData.createdAt
            )

            return {
                ...state,
                data: storeData,
                loaded: true
            };
        case CREATE_STORE:

            let dataStore = action.data;
            let newStore = new Store(
                dataStore.name,
                dataStore.address,
                dataStore.sector,
                dataStore.description,
                dataStore.createdAt
            )

            return {
                ...state,
                data: newStore,
                loaded: true
            };
        case UPDATE_STORE:

            let updateDataStore = action.data;
            let updatedStore = new Store(
                updateDataStore.name,
                updateDataStore.address,
                updateDataStore.sector,
                updateDataStore.description,
                updateDataStore.createdAt
            )

            return {
                ...state,
                data: updatedStore
            };
        default:
            return state
    }
}

export default storeReducer;