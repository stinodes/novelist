// @flow
import React, { Component } from 'react'
import API from '../api/API'

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
          onClick={() => this.props.navigation.navigate('Novelist')}>
          home
        </a>
      </div>
    )
  }
}

export default LaunchScreen
