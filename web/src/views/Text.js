// @flow
import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { CormorantGaramondLight, CormorantGaramond, CormorantGaramondMedium, CormorantGaramondBold } from '../fonts'

export type Sizes = 'tiny'|'small'|'medium'|'large'|'huge'|'yuge'
export type Weights = 'light'|'regular'|'medium'|'bold'

export type TextProps = {
  style? : Array<*>|Object,
  inlineStyle? : Object,
  inline? : boolean,
  size? : Sizes,
  weight? : Weights,
  children? : string|Object,
}

const Text = (props : TextProps) => {
  return (
    <p
      className={css(
        styles.text,
        props.style,
        props.size && styles[props.size],
        styles[`${props.weight || 'regular'}Weight`],
        props.inline && styles.inline,
      )}
      style={props.inlineStyle}>
      {props.children}
    </p>
  )
}

export const styles = StyleSheet.create({
  text: {
    fontFamily: [CormorantGaramond, 'sans-serif'],
    fontSize: 16,
    color: 'black',
    margin: 0,
    padding: 0,
  },
  tiny: {
    fontSize: 10,
  },
  small: {
    fontSize: 13,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 20,
  },
  huge: {
    fontSize: 26,
  },
  yuge: {
    fontSize: 34,
  },
  lightWeight: {
    fontFamily: [CormorantGaramondLight, 'sans-serif'],
  },
  mediumWeight: {
    fontFamily: [CormorantGaramondMedium, 'sans-serif'],
  },
  boldWeight: {
    fontFamily: [CormorantGaramondBold, 'sans-serif'],
  },
  inline: {
    display: 'inline',
  }
})

export default Text
