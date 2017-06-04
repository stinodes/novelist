import React from 'react'
import AppFrame from './navigation/AppFrame'
import BrowserAppContainer from './navigation/BrowserAppContainer'
import Navigator from './navigation/Navigator'

import LaunchScreen from './launch/LaunchScreen'
import OnboardingNavigator from './onboarding/OnboardingNavigator'
import NovelistNavigator from './novelist/NovelistNavigator'

const navigationConfig = {
  Launch: { screen: LaunchScreen, path: '' },
  Onboarding: { screen: OnboardingNavigator, path: 'onboarding' },
  Novelist: { screen: NovelistNavigator, path: 'test' },
}

const App = Navigator(navigationConfig, { initialRoute: 'Launch' })

export default BrowserAppContainer(App)