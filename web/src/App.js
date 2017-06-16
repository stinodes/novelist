import React from 'react'
import {
  createNavigator,
  TabRouter,
} from 'react-navigation'
import { NavigationWeb } from 'novelist-common'
const { AppFrame, BrowserAppContainer } = NavigationWeb

import LaunchScreen from './launch/LaunchScreen'
import OnboardingNavigator from './onboarding/OnboardingNavigator'
import NovelistNavigator from './novelist/NovelistNavigator'

const navigationConfig = {
  Launch: { screen: LaunchScreen, path: '', title: 'Novelist | Loading...' },
  Onboarding: { screen: OnboardingNavigator, path: '', title: 'Novelist | Login' },
  Novelist: { screen: NovelistNavigator, path: '', title: 'Novelist' },
}

// const App = Navigator(navigationConfig, { initialRoute: 'Launch' })
const App = createNavigator(TabRouter(navigationConfig, {
  initialRoute: 'Launch',
}))(AppFrame)

export default BrowserAppContainer(App)