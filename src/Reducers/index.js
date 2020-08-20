import { combineReducers } from "redux";
import singleMedReducer from './singlemedReducer';

const  rootReducer =  combineReducers({
    singleMed: singleMedReducer
})

export default rootReducer;