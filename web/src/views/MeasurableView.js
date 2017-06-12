// @flow
import React from 'react'
import Measure from 'react-measure'
import { StyleSheet, css } from 'aphrodite'

export type MeasurableViewProps = {
  children? : string|Object,
  style? : Array<*>|Object,
  ref? : string|Function,
  onResize? : (Rect) => any,
  client? : boolean,
  bounds? : boolean,
}
export type Rect = {
  entry : {
    bottom : number,
    height : number,
    left : number,
    right : number,
    top : number,
    width : number,
    x : number,
    y : number,
  },
}

const MeasurableView = (props : MeasurableViewProps) => {
  return (
    <Measure
      onResize={props.onResize}>
      { ({measureRef, ...prop}) => (
        <div
          className={css(styles.view, props.style)}
          ref={measureRef}>
          {props.children}
        </div>
      )}
    </Measure>
  )
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
  }
})

export default MeasurableView
