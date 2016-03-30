import React from 'react'

import styles from './Grid.scss'

export default class Grid extends React.Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number
  }

  render () {
    let lines = []
    for (let x = 0; x < this.props.width; x += 16) {
      lines.push(
        <line className={styles.grid} x1={x} y1={0} x2={x} y2={this.props.height} key={`grid-x${x}`} />
      )
    }
    for (let y = 0; y < this.props.height; y += 16) {
      lines.push(
        <line className={styles.grid} x1={0} y1={y} x2={this.props.width} y2={y} key={`grid-y${y}`} />
      )
    }

    return (
      <g>
        {lines}
      </g>
    )
  }
}
