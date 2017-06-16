// @flow
import React from 'react'
import { StyleSheet, css } from 'aphrodite'

export type ViewProps = {
  children? : string|Object,
  style? : Array<*>|Object,
  inlineStyle? : Object,
  extraProps? : false|?Object,
}

const View = (props : ViewProps) => {
  const extraProps = props.extraProps || {}
  return (
    <div
      {...extraProps}
      style={props.inlineStyle}
      className={css(styles.view, props.style)}>
      {props.children}
    </div>
  )
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
  }
})

export default View
