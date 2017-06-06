// @flow
import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import API from '../api/API'

class AuthScreen extends Component {

  componentDidMount() {
    if (!API.isLoggedIn())
      this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Unauthorized'}))
  }

}

export default AuthScreen
