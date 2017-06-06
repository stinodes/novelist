import React from 'react'
import Navigator from '../navigation/Navigator'
import UnauthorizedScreen from './UnauthorizedScreen'

const OnboardingNavigator = Navigator(
  {
    Login: { screen: () => <div>login</div>, path: 'login'},
    Unauthorized: { screen: UnauthorizedScreen, path: 'unauthorized' },
  }
)

export default OnboardingNavigator
