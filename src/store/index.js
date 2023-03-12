import { applyMiddleware, combineReducers, createStore, compose } from 'redux'


import mapReducer from './reducer/mapReducer.js'
import reduxPromise from 'redux-promise'
import reduxThunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = (combineReducers({ mapReducer }))



const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxPromise, reduxThunk)),)





export default store