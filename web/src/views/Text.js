// @flow
import React from 'react'
import { StyleSheet, css } from 'aphrodite'

export type Sizes = 'tiny'|'small'|'medium'|'large'|'huge'|'yuge'

export type TextProps = {
  style? : Array<*>|Object,
  size? : Sizes,
  italic? : boolean,
  bold? : boolean,
  children? : string|Object,
}

const Text = (props : TextProps) => {
  return (
    <p
      className={css(
        styles.text,
        props.style,
        props.size && styles[props.size],
        props.italic && styles.italic,
        props.bold && styles.bold,
      )}>
      {props.children}
    </p>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    color: '#212121',
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
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  }
})

export default Text
