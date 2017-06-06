import React from 'react'
import { addNavigationHelpers, TabRouter, createNavigator } from 'react-navigation'
import PropTypes from 'prop-types'

const NavView = ({ navigation, router }: { navigation: any, router: any }) => {
  const { state } = navigation;
  const Component = router.getComponentForState(state)
  return (
    <Component
      navigation={addNavigationHelpers({
        ...navigation,
        state: state.routes[state.index],
      })}
    />
  )
}

const Navigator = (navConfig, navOptions) => createNavigator(TabRouter(navConfig, navOptions))(NavView)

export default Navigator
