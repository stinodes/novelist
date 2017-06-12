// @flow
import React, { PureComponent } from 'react'
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({
  rippleStyle: {
    position: 'absolute',
    borderRadius: '50%',
    opacity: 0,
    width: 35,
    height: 35,
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  },
  wrapStyle: {
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
  },
  borderless: {
    overflow: 'visible',
  }
})

const rippleStyle = {
    position: 'absolute',
    borderRadius: '50%',
    opacity: 0,
    width: 35,
    height: 35,
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    zIndex: 5000,
  },
  wrapStyle = {
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
  }

type HTMLElement = {
  offsetLeft : number,
  offsetTop : number,
  offsetWidth : number,
  offsetHeight : number,
  offsetParent? : ?HTMLElement,
}
type Event = {
  stopPropagation : () => void,
  pageX : number,
  pageY : number,
  currentTarget : HTMLElement,
}

class Ripples extends PureComponent {

  props : {
    during? : number,
    color? : string,
    borderless? : boolean,
    sizeMultiplier? : number,
    onClick? : (Event) => void,
    style? : Object|Array<*>,
    children? : Node,
  }
  state = {
    rippleStyle: {},
  }

  static defaultProps = {
    borderless: false,
    during: 600,
    color: 'rgba(0, 0, 0, .3)',
  }
  static transform = 'translate(-50%, -50%)'

  getPos(element : HTMLElement) {
    let curElement = element,
      pos = {
        left: 0,
        top: 0,
      }


    if (curElement.offsetParent) {
      while (curElement) {
        pos.left += curElement.offsetLeft
        pos.top += curElement.offsetTop
        curElement = curElement.offsetParent
      }
    }

    return pos
  }

  handleClick = (ev : Event) => {
    if (ev.stopPropagation) {
      ev.stopPropagation()
    }

    const { onClick, color, during } = this.props
    const {
      pageX, pageY, currentTarget
    } = ev
    const position = this.getPos(currentTarget)

    const left = pageX - position.left
    const top = pageY - position.top

    this.setState({
      rippleStyle: {
        top, left,
        opacity: 1,
        backgroundColor: color,
      }
    })

    setTimeout(() => {
      const size = Math.max(currentTarget.offsetWidth, currentTarget.offsetHeight),
        sizeMultiplier = this.props.sizeMultiplier || this.props.borderless ? 36 : 18

      this.setState({
        rippleStyle: {
          top, left,
          backgroundColor: color,
          transition: `all ${during || 500}ms`,
          transform: `${Ripples.transform} scale(${size / sizeMultiplier})`,
          opacity: 0,
        }
      })
    }, 50)

    if (typeof onClick === 'function') {
      onClick(ev)
    }
  }

  render() {
    const { children, style, borderless, during, color, ...props } = this.props
    const { state, handleClick } = this

    return (
      <div {...props} className={css(styles.wrapStyle, style, borderless && styles.borderless)} onClick={handleClick}>
        { children }
        <s
          // className={css(styles.rippleStyle)}
          style={{...rippleStyle, ...state.rippleStyle}}/>
      </div>
    )
  }
}

export default Ripples