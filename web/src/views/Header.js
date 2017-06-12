// @flow
import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import View from './View'
import { styles as textStyles } from './Text'
import type { Weights, Sizes } from './Text'

export type HeaderProps = {
  tier? : 'h1'|'h2'|'h3',
  style? : Array<*>|Object,
  headerStyle? : Array<*>|Object,
  weight? : Weights,
  size? : Sizes,
  children? : Node,
}

const Header = (props : HeaderProps) => {
  const _props = {
    className: css(
      textStyles.text,
      styles.header,
      textStyles[`${props.weight || 'medium'}Weight`],
      styles[props.size || 'regular'],
      props.style
    )
  }
  let header
  switch (props.tier) {
    case 'h1':
      header =
        (<h1 {..._props}>
          {props.children}
        </h1>)
      break
    case 'h2':
      header =
        (<h2 {..._props}>
          {props.children}
        </h2>)
      break
    case 'h3':
      header =
        (<h3 {..._props}>
          {props.children}
        </h3>)
      break
    default:
      header =
        (<h1 {..._props}>
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
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  header: {
    fontFamily: 'sans-serif',
    fontSize: 34,
    color: '#212121',
    textAlign: 'center',
  },
  tiny: {
    fontSize: 18,
  },
  small: {
    fontSize: 22,
  },
  medium: {
    fontSize: 26,
  },
  large: {
    fontSize: 30,
  },
  huge: {
    fontSize: 36,
  },
  yuge: {
    fontSize: 40,
  },
})

export default Header
