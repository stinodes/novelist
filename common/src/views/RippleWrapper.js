// @flow
import React, { Component } from 'react'
// import Ripples from 'react-ripples'
import Ripples from './Ripples'

export type RippleProps = {
  children? : Object,
  during? : number,
  color? : string,
  borderless? : boolean,
  style? : Array<*>|Object,
}

const RippleWrapper = (props : RippleProps) => {
  return (
    <Ripples
      borderless={props.borderless}
      during={props.during}
      color={props.color}
      style={props.style}>
      {props.children}
    </Ripples>
  )
}

export default RippleWrapper
