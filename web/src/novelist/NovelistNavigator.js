// @flow
import React from 'react'
import Navigator from '../navigation/Navigator'
import MyShelfScreen from './MyShelfScreen'

const NovelistNavigator = Navigator(
  {
    MyShelf: { screen: MyShelfScreen, path: 'myshelf' },
  },
  { initialRoute: 'MyShelf'}
)

export default NovelistNavigator
