import React, { Component } from 'react'
import { StyleSheet } from 'aphrodite'
import View from './View'

class Screen extends Component {

  props : {
    style? : Array<*>|Object,
    children? : Object|Array<*>,
  }

  render() {
    return (
      <View
        style={[styles.screen, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    boxShadow: 'rgba(0, 0, 0, 0.2) 2px 3px 15px',
    borderRadius: 2,
  }
})

export default Screen
