// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import {
  Screen,
  TextInput,
  View,
  Button,
  Header,
  Text,
  util,
} from 'novelist-common'
import { Motion, spring } from 'react-motion'
import Measure from 'react-measure'
// $FlowFixMe
import { NavigationActions } from 'react-navigation'

import type { Navigation } from '../flow/types'

import API from '../api/API'
import User from '../api/User'

class LoginScreen extends Component {

  props : {
    navigation : Navigation
  }

  state : {
    usernameIsFocused : boolean,
    passwordIsFocused : boolean,
    username : string,
    passwordLogin : string,
    passwordRegister : string,
    confirmPasswordRegister : string,
    mode : 'register'|'login',
    formHeight : number,
    loading : boolean,
  } = {
    usernameIsFocused: false,
    passwordIsFocused: false,
    username: '',
    passwordLogin: '',
    passwordRegister: '',
    confirmPasswordRegister: '',
    mode: 'login',
    formHeight: 0,
    loading : false,
  }

  onResize = (bounds : Object) => {
    console.log('bounds=', bounds)
  }

  onUsernameChange = (event : Event) =>
    event.target instanceof HTMLInputElement &&
    this.setState({username: event.target.value})

  onPasswordLoginChange = (event : Event) =>
    event.target instanceof HTMLInputElement &&
    this.setState({passwordLogin: event.target.value})

  onPasswordRegisterChange = (event : Event) =>
    event.target instanceof HTMLInputElement &&
    this.setState({passwordRegister: event.target.value})

  onConfirmPasswordRegisterChange = (event : Event) =>
    event.target instanceof HTMLInputElement &&
    this.setState({confirmPasswordRegister: event.target.value})

  // onChangeMode = () => console.log('test')
  onChangeMode = () => this.setState({mode: this.state.mode === 'login' ? 'register' : 'login'})

  login = () => {
    const { username, passwordLogin } = this.state
    if (username && passwordLogin) {
      this.setState({loading: true})
      API.logIn(username, passwordLogin)
        .catch(console.error)
        .then((user) => this.stopLoading(user))
        .then(
          (user) => {
            console.log('user=', user)
            user && this.props.navigation.dispatch(
              NavigationActions.navigate({
                routeName: 'Novelist',
                params: {user,}
              })
            )
          }
        )
        .catch(console.error)
    }
  }
  register = () => {
    const { username, passwordRegister, confirmPasswordRegister } = this.state
    if (username && passwordRegister && confirmPasswordRegister && passwordRegister === confirmPasswordRegister) {
      this.setState({loading: true})
      API.register(
        User.createNewUser({
          username: username,
          rawPassword: passwordRegister,
        })
      )
        .catch((e) => {
          console.error(e)
          return false
        })
        .then((user) => this.stopLoading(user))
        .then(
          (user) => {
            console.log('user=', user)
            user && this.props.navigation.dispatch(
              NavigationActions.navigate({
                routeName: 'Novelist',
                params: {user,}
              })
            )
          }
        )
    }
  }

  stopLoading = <T>(valToReturn : T) : Promise<T> =>
    util.TimeoutPromise(4000)
      .then(() => this.setState({loading: false}))
      .then(() => {
        console.log('returning=', valToReturn)
        return valToReturn
      })

  render() {
    const { loading, mode } = this.state
    return (
      <Screen
        style={styles.wrapper}>


        <Measure
          bounds
          onResize={this.onResize}>
          { ({measureRef, contentRect}) => (

          <Motion
            style={{
              height: spring(!loading ? contentRect.bounds.height || 0 : 0),
              opacityLogin: spring(
                (contentRect.bounds.height && mode === 'login' && !loading ? 1 : 0),
                {stiffness: 50, damping: 10}
              ),
              opacityRegister: spring(
                (contentRect.bounds.height && mode === 'register' && !loading ? 1 : 0),
                {stiffness: 50, damping: 10}),
              translateX: spring(mode === 'register' ? 150 : 0, {stiffness: 200, damping: 25}),
            }}
            children={
              ({height, opacityLogin, opacityRegister, translateX}) => (
                <View
                  style={styles.shadow}>

                  {this._renderLogin({
                    height: this.state.loading ? height : null,
                    measureRef: mode === 'login' && measureRef,
                    opacity: opacityLogin,
                    translateX,
                  })}
                  {this._renderRegister({
                    height: this.state.loading ? height : null,
                    measureRef: mode === 'register' && measureRef,
                    opacity: opacityRegister,
                    translateX: translateX - 150,
                  })}

                  <View
                    style={styles.logoContainer}>
                    <img
                      className={css([styles.logo, loading && styles.loadingLogo])}
                      src={require('../images/mocks_Logo Final.png')}/>
                  </View>

                  <View
                    inlineStyle={{
                      height,
                    }}/>
                </View>
              )
            }/>
          )}
        </Measure>

        {
          this._renderChangeModeButton()
        }

      </Screen>
    )
  }

  _renderLogin(params : {
    measureRef : false|() => any,
    height : ?number,
    opacity : number,
    translateX : number,
  }) {
    const extraProps = params.measureRef && {ref: params.measureRef}
    return (
      <View
        extraProps={extraProps}
        inlineStyle={{
          opacity: params.opacity,
          transform: `translateX(${params.translateX}%)`,
        }}
        style={styles.form}>

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
          onChange={this.onPasswordLoginChange}
          value={this.state.passwordLogin}/>

        <Button
          filled
          size="large"
          onPress={this.login}>
          Log In
        </Button>
      </View>
    )
  }
  _renderRegister = (params : {
    measureRef : false|() => any,
    height : ?number,
    opacity : number,
    translateX : number,
  }) => {
    const extraProps = params.measureRef && {ref: params.measureRef}
    return (
          <View
            extraProps={extraProps}
            inlineStyle={{
              opacity: params.opacity,
              transform: `translateX(${params.translateX}%)`,
            }}
            style={styles.form}>

            <Header
              tier="h3"
              style={styles.header}>
              Register
            </Header>

            <TextInput
              size="large"
              label="Your Username"
              onChange={this.onUsernameChange}
              value={this.state.username}/>

            <TextInput
              isSecure
              size="large"
              label="Your Password"
              onChange={this.onPasswordRegisterChange}
              value={this.state.passwordRegister}/>

            <TextInput
              isSecure
              size="large"
              label="Confirm Password"
              onChange={this.onConfirmPasswordRegisterChange}
              value={this.state.confirmPasswordRegister}/>

            <Button
              filled
              size="large"
              onPress={this.register}>
              Sign Up
            </Button>
          </View>
    )
  }

  _renderChangeModeButton() {
    return (
      <Button
        text
        filled
        onPress={this.onChangeMode}
        style={styles.registerButton}>
        No account yet?
      </Button>
    )
  }

}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    minWidth: 320,
    width: 320,
    overflow: 'visible',
    boxShadow: 'none',
    alignItems: 'center',
    padding: 0,
  },
  shadow: {
    position: 'relative',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '45px 60px',
    paddingTop: 0,
    boxShadow: 'rgba(0, 0, 0, 0.2) 2px 3px 15px',
    zIndex: 1,
    borderRadius: 2,
    overflow: 'hidden',
  },
  logoContainer: {
    flex: 0,
    paddingTop: 45,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 20,
  },
  logo: {
    width: '40%',
    maxWidth: 160,
    minWidth: 80,
  },
  loadingLogo: {
    animationName: [{
      'from': { transform: 'rotate(0deg)' },
      'to': { transform: 'rotate(1440deg)' },
    }],
    animationDuration: '4s',
    animationEasing: 'ease-out',
    animationIterationCount: 'infinite',
  },
  form: {
    position: 'absolute',
    bottom: 45,
    left: 60,
    right: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 50,
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
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
