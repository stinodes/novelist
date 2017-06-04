// @flow
import React, { Component } from 'react'

class LaunchScreen extends Component {
  render() {
    return (
      <div>
        Launch
        <br/>
        <a
          onClick={() => this.props.navigation.navigate('Login')}>
          login
        </a>
        <br/>
        <a
          onClick={() => this.props.navigation.navigate('Home')}>
          home
        </a>
      </div>
    )
  }
}

export default LaunchScreen
