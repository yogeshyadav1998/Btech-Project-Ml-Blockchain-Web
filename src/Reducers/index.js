import { combineReducers } from "redux";
import singleMedReducer from './singlemedReducer';
import authReducer from './authReducer';

const  rootReducer =  combineReducers({
    singleMed: singleMedReducer,
    auth: authReducer
})

export default rootReducer;