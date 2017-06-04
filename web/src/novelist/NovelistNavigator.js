import React from 'react'
import Navigator from '../navigation/Navigator'

const NovelistNavigator = Navigator(
  {
    Test: { screen: () => <div>test</div>, path: '/something'},
    Home: { screen: () => <div>novelist</div> },
  },
)

export default NovelistNavigator
