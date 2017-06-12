// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import {
  Screen,
  TextInput,
  View,
  Button,
  Header,
} from '../views'

export type LoginScreenProps = {}

class LoginScreen extends Component<any, LoginScreenProps, any> {

  state : {
    usernameIsFocused : boolean,
    passwordIsFocused : boolean,
    username : string,
    password : string,
    bounds : ?Object,
  }

  constructor(props : LoginScreenProps) {
    super(props)
    this.state = {
      usernameIsFocused: false,
      passwordIsFocused: false,
      username: '',
      password: '',
      bounds: null,
    }
  }

  onUsernameChange = (event : Event) =>
    event.target instanceof HTMLInputElement &&
    this.setState({username: event.target.value})

  onPasswordChange = (event : Event) =>
    event.target instanceof HTMLInputElement &&
    this.setState({password: event.target.value})

  render() {
    return (
      <Screen
        style={styles.wrapper}>
        <View
          style={styles.shadow}>

          <View
            style={styles.logoContainer}>
            <img
              className={css(styles.logo)}
              src={require('../images/mocks_Logo Final.png')}/>
          </View>

          <Header
            tier="h3"
            style={styles.header}>
            Login
          </Header>

          <TextInput
            size="large"
            label="Username"
            onChange={this.onUsernameChange}
            value={this.state.username}/>

          <TextInput
            isSecure
            size="large"
            label="Password"
            onChange={this.onPasswordChange}
            value={this.state.password}/>
        </View>

        <Button
          text
          wrapperStyle={styles.registerButton}>
          No account yet?
        </Button>

      </Screen>
    )
  }

}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    minWidth: 320,
    width: '25%',
    overflow: 'visible',
    boxShadow: 'none',
    alignItems: 'center',
    padding: 0,
  },
  shadow: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: '45px 90px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 2px 3px 15px',
    zIndex: 1,
    borderRadius: 2,

  },
  logoContainer: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '40%',
    minWidth: 80,
    height: '40%',
    minHeight: 80,
  },
  header: {
    textAlign: 'center',
    marginBottom: 7,
    marginTop: 60,
  },
  registerButton: {
    backgroundColor: '#d7d7d7',
    position: 'absolute',
    bottom: -50,
    height: 50,
    width: 200,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'rgba(0, 0, 0, 0.2) 1px 2px 5px',
  }
})

export default LoginScreen
