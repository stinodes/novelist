// @flow
import React, { Component } from 'react'
// $FlowFixMe
import { NavigationActions } from 'react-navigation'

class AuthScreen extends Component {


  authCheck(API : { isLoggedIn : () => boolean }) {
    if (!API.isLoggedIn())
      this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Unauthorized'}))
  }

}

export default AuthScreen
