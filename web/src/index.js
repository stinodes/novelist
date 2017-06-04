import React from 'react'
import './index.html'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import App from './App'

const state = window.__initialState__ || undefined
const store = configureStore(state)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)