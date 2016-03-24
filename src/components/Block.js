import React from 'react'

import styles from './Block.scss'

export default class Block extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    round: React.PropTypes.number
  }

  static defaultProps = {
    width: 100,
    height: 32,
    round: 8
  }

  render () {
    return (
      <rect className={styles.block}
        x={this.props.x} y={this.props.y}
        rx={this.props.round} ry={this.props.round}
        width={this.props.width} height={this.props.height} />
    )
  }
}
