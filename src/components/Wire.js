import React from 'react'

import styles from './Wire.scss'

export default class Wire extends React.Component {
  static propTypes = {
    x1: React.PropTypes.number,
    y1: React.PropTypes.number,
    x2: React.PropTypes.number,
    y2: React.PropTypes.number
  }

  static defaultProps = {
  }

  componentWillMount () {
    this.eventHandlers = {
      onMouseDown: this.onMouseDown.bind(this)
    }
  }

  render () {
    const classes = styles.wire + ' ' + styles[this.props.type]

    return (
      <line className={classes} {...this.props} />
    )
  }

  onMouseDown (event) {
    // this.props.selectBlock(this)
  }
}
