// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { NavigationActions } from 'react-navigation'
import { Header, Button, View } from '../views'

class UnauthorizedScreen extends Component {

  toLogIn : () => void
  toRegister : () => void

  constructor(props : Object) {
    super(props)
    this.toLogIn = this.toLogIn.bind(this)
    this.toRegister = this.toRegister.bind(this)
  }
  toLogIn() {
    setTimeout( () =>
      this.props.navigation.dispatch(
        NavigationActions.navigate({routeName: 'Login'})
      ),
      400
    )
  }
  toRegister() {
    setTimeout( () =>
      this.props.navigation.dispatch(
        NavigationActions.navigate({routeName: 'Register'})
      ),
      400
    )
  }

  render() {
    return (
      <View
        style={styles.screen}>
        <Header
          style={styles.underLined}>
          Unauthorized.
        </Header>

        <View
          style={styles.buttonContainer}>
          <Button
            filled
            size="huge"
            rippleProps={{
              color: 'random'
            }}
            onPress={this.toLogIn}>
            Log In
          </Button>

          <div className={css(styles.divider)}/>

          <Button
            size="large"
            rippleProps={{
              color: 'random'
            }}
            onPress={this.toLogIn}>
            Register
          </Button>
        </View>

        <View/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  underLined: {
    borderBottomWidth: 2,
    borderBottomColor: '#212121',
    borderBottomStyle: 'solid',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  divider: {
    marginTop: 20,
    borderWidth: 0,
    borderTopWidth: 2,
    borderStyle: 'solid',
    borderColor: '#212121',
    width: 50,
  }
})

export default UnauthorizedScreen
