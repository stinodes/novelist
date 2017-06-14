// @flow
import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import View from './View'
import Ripple from './RippleWrapper'
import type { RippleProps } from './RippleWrapper'
import Text from './Text'
import type { Sizes, TextProps } from './Text'

export type ButtonProps = {
  onPress : (Event) => void,
  children : string|Object,
  anchorStyle? : Array<*>|Object,
  style? : Array<*>|Object,
  size? : Sizes,
  wrapperStyle? : Array<*>|Object,
  textStyle? : Array<*>|Object,
  textSize? : Sizes,
  filled? : boolean,
  text? : boolean,
  textProps? : TextProps,
  rippleProps? : RippleProps,
}

const randomColors = [
  'rgba(32, 143, 242, 0.5)',
  'rgba(32, 242, 143, 0,5)',
  'rgba(143, 32, 242, 0.5)',
  'rgba(242, 32, 143, 0.5)',
  'rgba(242, 143, 32, 0.5)',
  'rgba(143, 242, 32, 0.5)',
]

const Button = (props : ButtonProps) => {
  const size = props.size || 'medium',
    textSize = props.textSize || size,
    textProps : TextProps = props.textProps || {},
    rippleProps : RippleProps = props.rippleProps || {}

  let children

  if (!props.filled)
    textProps.weight = textProps.weight || 'bold'

  if (rippleProps.color === 'random')
    rippleProps.color = randomColors[Math.floor( Math.random() * randomColors.length )]

  if (props.text)
    children = (
      <Text
        bold={true}
        size={textSize}
        style={[styles.buttonText, props.textStyle]}
        {...textProps}>
        {props.children}
      </Text>
    )
  else
    children = (<div>{props.children}</div>)

  return (
    <Ripple
      style={[styles.wrapper, props.style]}
      during={rippleProps.during}
      color={rippleProps.color}
      borderless={props.filled ? false : props.text || rippleProps.borderless}>
      <a
        onMouseUp={props.onPress}
        onTouchEnd={(e) => {
          e.preventDefault()
          props.onPress(e)
        }}
        className={css(
          styles.buttonAnchor,
          styles[size],
          props.anchorStyle,
          props.filled && styles.filledButtonAnchor,
          props.text && styles.textButtonAnchor,
        )}>
        {children}
      </a>
    </Ripple>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  buttonAnchor: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    overflow: 'hidden',
    borderWidth: 2,
  },
  textButtonAnchor: {
    border: 'none',
    borderWidth: 0,
    borderRadius: 10,
  },
  filledButtonAnchor: {
    alignSelf: 'stretch',
    flex: 1,
  },
  tiny: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 2,
    borderWidth: 1,
  },
  small: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 2,
    borderWidth: 1,
  },
  medium: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 2,
    borderWidth: 2,
  },
  large: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 3,
    borderWidth: 2,
  },
  huge: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 28,
    paddingRight: 28,
    borderRadius: 3,
    borderWidth: 2,
  },
  yuge: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 34,
    paddingRight: 34,
    borderRadius: 3,
    borderWidth: 2,
  },
  buttonText: {
    color: '#212121',
    textAlign: 'center',
  }
})

export default Button
