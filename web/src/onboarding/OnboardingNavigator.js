import React from 'react'
import Navigator from '../navigation/Navigator'
import UnauthorizedScreen from './UnauthorizedScreen'
import LoginScreen from './LoginScreen'

const OnboardingNavigator = Navigator(
  {
    Login: { screen: LoginScreen, path: 'login'},
    Unauthorized: { screen: UnauthorizedScreen, path: 'unauthorized' },
  }
)

export default OnboardingNavigator
