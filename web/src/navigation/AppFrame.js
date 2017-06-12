import React, { Component } from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { StyleSheet, css } from 'aphrodite'
import { View } from '../views'

class AppFrame extends Component {
  render() {
    const { state } = this.props.navigation;
    const Component = this.props.router.getComponentForState(state)
    return (
      <View
        style={styles.background}>

          <Component
            navigation={addNavigationHelpers({
              ...this.props.navigation,
              state: state.routes[state.index],
            })}
          />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgb(234, 234, 234)',
    position: 'fixed',
    top: 0, left: 0, bottom: 0, right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appFrame: {
    flex: 1,
    margin: 20,
    padding: 20,
    borderRadius: 3,
    boxShadow: 'rgba(0, 0, 0, 0.2) 2px 5px 12px',
  }
})

export default AppFrame
