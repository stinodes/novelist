// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Motion, spring } from 'react-motion'
import View from './View'
import Text from './Text'
import Button from './Button'
import { styles as textStyles } from './Text'
import type { Sizes, Weights } from './Text'

export type TextInputProps = {
  onChange : (Event) => void,
  onFocus? : () => void,
  onBlur? : () => void,
  value : string,
  size? : Sizes,
  weight? : Weights,
  style? : Array<*>|Object,
  textStyle? : Array<*>|Object,
  labelStyle? : Array<*>|Object,
  type? : 'text' | 'numerical' | 'email',
  placeholder? : string,
  label? : string,
  isSecure? : boolean,
}

class TextInput extends Component {

  props : TextInputProps

  state = {
    focused: false
  }
  input : HTMLInputElement
  springConfig = {
    stiffness: 240,
    damping: 30,
  }

  onFocus = () => this.setState({focused: true})
  onBlur = () => this.setState({focused: false})
  onPress = () => this.input.focus()

  render() {
    const {
      label,
      labelStyle,
      style,
      textStyle,
      weight,
      size,
      onChange,
      value,
      isSecure,
      type,
      placeholder,
    } = this.props

    return (
      <Button
        rippleProps={{
          borderless: true,
          color: 'rgba(0, 0, 0, 0.1)',
          during: 750,
        }}
        onPress={this.onPress}
        style={[styles.wrapper, style]}>
        <Motion
          style={{
            y: spring((this.state.focused || value) ? 0 : 100, this.springConfig ),
            scale: spring((this.state.focused || value) ? 0.7 : 1, this.springConfig ),
          }}>
          {
            (interpolatedStyles) => (
              <Text
                style={[
                  styles.label,
                  (this.state.focused || this.props.value) && styles.focusedLabel,
                  (textStyles : Object)[size || 'medium'],
                  styles[`${weight || 'regular'}Weight`],
                  labelStyle,
                ]}
                inlineStyle={{
                  transform: `scale(${interpolatedStyles.scale}) translateY(${interpolatedStyles.y}%)`
                }}>
                {label}
              </Text>
            )
          }
        </Motion>
        <input
          onChange={onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          ref={(comp : HTMLInputElement) => this.input = comp}
          value={value}
          type={isSecure ? 'password' : type || 'text'}
          placeholder={placeholder}
          className={css(
            textStyle,
            (textStyles : Object).text,
            styles.input,
            (textStyles : Object)[size || 'medium'],
            styles[`${weight || 'regular'}Weight`],
          )}/>
      </Button>
    )
  }

}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 0,
    paddingBottom: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    borderBottomStyle: 'solid',
    marginTop: 10,
    borderRadius: 0,
  },
  label: {
    color: '#757575',
    textAlign: 'center',
    margin: 0,
    flex: 1,
  },
  input: {
    display: 'flex',
    flex: 1,
    outline: 'none',
    border: 'none',
    textAlign: 'center',
    marginTop: 0,
  },
})

export default TextInput
