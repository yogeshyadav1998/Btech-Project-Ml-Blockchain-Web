import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import rootReducer from './Reducers/index';
// import { composeWithDevTools } from "redux-devtools-extension";
// eslint-disable-next-line

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk, logger];
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
let store = createStore( persistedReducer, composeEnhancers(applyMiddleware(...middleware)))
const persistor = persistStore(store)
export { store, persistor };