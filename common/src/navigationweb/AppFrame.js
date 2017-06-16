// @flow
import React, { Component } from 'react'
// $FlowFixMe
import { addNavigationHelpers } from 'react-navigation'
import { StyleSheet, css } from 'aphrodite'
import { Motion, spring } from 'react-motion'
import { View } from '../views'
import { throttle } from '../util'

import type {
  Navigation, Router,
} from '../flow/types'

class AppFrame extends Component {

  props : {
    navigation : Navigation,
    router : Router,
  }
  state = {
    height: window.innerHeight,
    width: window.innerWidth,
  }

  timer = 0
  springParams = {
    stiffness: 200,
    damping: 25,
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
  }
  onResize = () => {
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(this.onResizeEnd, 100)
  }
  onResizeEnd = () => {
    const height = window.innerHeight
    const width = window.innerWidth
    this.setState({
      height,
      width,
    })
  }

  render() {
    return (
      <Motion
        style={{
          height: spring(this.state.height, this.springParams),
          width: spring(this.state.width, this.springParams)
        }}
        children={this._renderChildren}>

      </Motion>
    )
  }
  _renderChildren = ({height, width} : { height : number, width : number }) => {
    console.log('animating height', height)
    const { state } = this.props.navigation;
    const Component = this.props.router.getComponentForState(state)
    return (
      <View
        inlineStyle={{
          height,
          width,
        }}
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
    top: 0, left: 0, right: 0,
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
