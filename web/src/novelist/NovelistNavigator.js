// @flow
import React from 'react'
import { NavigationWeb } from 'novelist-common'
import MyShelfScreen from './MyShelfScreen'

const NovelistNavigator = NavigationWeb.Navigator(
  {
    MyShelf: { screen: MyShelfScreen, path: 'myshelf' },
  },
  { initialRoute: 'MyShelf'}
)

export default NovelistNavigator
