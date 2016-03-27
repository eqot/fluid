import React from 'react'

import styles from './Wire.scss'

export default class Wire extends React.Component {
  static propTypes = {
    x1: React.PropTypes.number,
    y1: React.PropTypes.number,
    x2: React.PropTypes.number,
    y2: React.PropTypes.number,
    curveDelta: React.PropTypes.number,
    type: React.PropTypes.string
  }

  static defaultProps = {
    curveDelta: 40
  }

  componentWillMount () {
    this.eventHandlers = {
      onMouseDown: this.onMouseDown.bind(this)
    }
  }

  render () {
    const classes = styles.wire + ' ' + styles[this.props.type]

    const x1 = this.props.x1
    const y1 = this.props.y1
    const x2 = this.props.x2
    const y2 = this.props.y2
    const d = this.props.curveDelta
    const vertices = `M${x1},${y1}, C${x1 + d},${y1} ${x2 - d},${y2} ${x2},${y2}`

    return (
      <path className={classes} d={vertices} />
    )
  }

  onMouseDown (event) {
    // this.props.selectBlock(this)
  }
}
