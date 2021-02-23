import { CREATE_SUPPLY, READ_SUPPLY, UPDATE_SUPPLY } from '../actions/supply';
import Supply from '../../models/Supply';

const initialState = {
    data: [],
    count: 0,
    loaded: false
};

const supplyReducer = (state = initialState, action) => {
    switch(action.type){
        case READ_SUPPLY:

            let readSupplyData = action.data;
            // console.log(readSupplyData)

            let supplyData = readSupplyData.map(supply => 
                new Supply(
                    supply.uuid,
                    supply.name,
                    supply.cost,
                    supply.description,
                    supply.sellingPrice,
                    supply.createdAt,
                    supply.updatedAt,
                )
            )

            return {
                ...state,
                data: supplyData,
                count: supplyData.length,
                loaded: true
            };
        case CREATE_SUPPLY:
            // console.log( state.count )

            let dataSupply = action.data;
            let newSupply =   new Supply(
                dataSupply.uuid,
                dataSupply.name,
                dataSupply.cost,
                dataSupply.description,
                dataSupply.sellingPrice,
                dataSupply.createdAt,
                dataSupply.updatedAt,
            )

            return {
                ...state,
                data: state.data.concat(newSupply),
                count: state.count + 1,
                loaded: true
            };
        // case UPDATE_STORE:

        //     let updateDataStore = action.data;
        //     let updatedStore = new Store(
        //         updateDataStore.name,
        //         updateDataStore.address,
        //         updateDataStore.sector,
        //         updateDataStore.description,
        //         updateDataStore.createdAt
        //     )

        //     return {
        //         ...state,
        //         data: updatedStore
            // };
        default:
            return state
    }
}

export default supplyReducer;