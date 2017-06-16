import React from 'react'
import { NavigationWeb } from 'novelist-common'
import UnauthorizedScreen from './UnauthorizedScreen'
import LoginScreen from './LoginScreen'

const OnboardingNavigator = NavigationWeb.Navigator(
  {
    Login: { screen: LoginScreen, path: 'login'},
    Unauthorized: { screen: UnauthorizedScreen, path: 'unauthorized' },
  }
)

export default OnboardingNavigator
