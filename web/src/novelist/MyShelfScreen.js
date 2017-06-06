// @flow
import React from 'react'
import {
  AuthScreen,
} from '../views'

class MyShelfScreen extends AuthScreen {

  componentDidMount() {
    super.componentDidMount()
  }

  render() {
    return (
      <div>
        My Shelf
      </div>
    )
  }
}

export default MyShelfScreen
