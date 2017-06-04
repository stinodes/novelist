import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

export default function configureStore(initialState) {
  const middleWares = [
      thunk
    ],

    rootReducer = combineReducers({
      r: (state = {}) => state
    }),

    store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(
          ...middleWares
        )
      )
    )

  return store;
}