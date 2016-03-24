import React from 'react'

import styles from './Block.scss'

export default class Block extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    dx: React.PropTypes.number,
    dy: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    round: React.PropTypes.number,
    selectBlock: React.PropTypes.func
  }

  static defaultProps = {
    dx: 0,
    dy: 0,
    width: 100,
    height: 32,
    round: 8
  }

  componentWillMount () {
    this.eventHandlers = {
      onMouseDown: this.onMouseDown.bind(this)
    }
  }

  render () {
    return (
      <g className={styles.block} {...this.eventHandlers}
        transform={`translate(${this.props.x},${this.props.y})`}>

        <rect
          rx={this.props.round} ry={this.props.round}
          width={this.props.width} height={this.props.height} />

        <text textAnchor='middle' dominantBaseline='central'
          x={this.props.width / 2} y={this.props.height / 2}>

          {this.props.name}
        </text>
      </g>
    )
  }

  onMouseDown (event) {
    this.props.selectBlock(this)
  }
}
