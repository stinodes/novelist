import React from 'react'
import Navigator from '../navigation/Navigator'

const OnboardingNavigator = Navigator(
  {
    Login: { screen: () => <div>login</div>, path: 'login'}
  }
)

export default OnboardingNavigator
