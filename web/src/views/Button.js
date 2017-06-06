// @flow
import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Ripple from './RippleWrapper'
import type { RippleProps } from './RippleWrapper'
import Text from './Text'
import type { Sizes, TextProps } from './Text'

export type ButtonProps = {
  onPress : () => void,
  children : string|Object,
  style? : Array<*>|Object,
  size? : Sizes,
  textStyle? : Array<Object>|Object,
  textSize? : Sizes,
  filled? : boolean,
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

  if (!props.filled) {
    textProps.bold = textProps.bold || false
  }
  if (rippleProps.color === 'random')
    rippleProps.color = randomColors[Math.floor( Math.random() * randomColors.length )]

  return (
    <div>
      <Ripple
        during={rippleProps.during}
        color={rippleProps.color}
        onPress={props.onPress}>
        <a
          onMouseUp={props.onPress}
          onTouchEnd={props.onPress}
          className={css(
            styles.buttonAnchor,
            props.style,
            styles[size],
            !props.filled && styles.textButton,
          )}>
          <Text
            bold={true}
            size={textSize}
            style={[styles.buttonText, props.textStyle]}
            {...textProps}>
            {props.children}
          </Text>
        </a>
      </Ripple>
    </div>
  )
}

const styles = StyleSheet.create({
  buttonAnchor: {
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#212121',
    borderStyle: 'solid',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    overflow: 'hidden',
  },
  textButton: {
    border: 'none',
    borderRadius: 10,
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
  }
})

export default Button
