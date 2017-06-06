// @flow
import React, { Component } from 'react'
import Ripples from 'react-ripples'

export type RippleProps = {
  children? : Object,
  during? : number,
  color? : 'string',
}

const RippleWrapper = (props : RippleProps) => {
  return (
    <Ripples
      during={props.during}
      color={props.color}>
      {props.children}
    </Ripples>
  )
}

export default RippleWrapper
