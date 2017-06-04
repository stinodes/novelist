import React, { Component } from 'react'

class AppFrame extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default AppFrame
