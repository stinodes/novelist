// @flow
import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import View from './View'

export type HeaderProps = {
  tier : 'h1'|'h2'|'h3',
  style : Array<*>|Object,
}

const Header = (props : Object) => {
  let header
  switch (props.tier) {
    case 'h1':
      header =
        (<h1
          className={css(styles.header, props.style)}>
          {props.children}
        </h1>)
      break
    case 'h2':
      header =
        (<h2
          className={css(styles.header, props.style)}>
          {props.children}
        </h2>)
      break
    case 'h3':
      header =
        (<h3
          className={css(styles.header, props.style)}>
          {props.children}
        </h3>)
      break
    default:
      header =
        (<h1
          className={css(styles.header, props.style)}>
          {props.children}
        </h1>)
      break
  }

  return (
    <View
      style={styles.headerContainer}>
      {header}
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontFamily: 'sans-serif',
    fontSize: 34,
    color: '#212121',
    textAlign: 'center',
  }
})

export default Header
