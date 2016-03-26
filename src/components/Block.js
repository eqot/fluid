import React from 'react'

import styles from './Block.scss'

import BlockMap from '../blocks'

export default class Block extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    round: React.PropTypes.number,
    type: React.PropTypes.string,
    params: React.PropTypes.any,

    selectBlock: React.PropTypes.func,
    run: React.PropTypes.func
  }

  static defaultProps = {
    width: 100,
    height: 32,
    round: 8
  }

  componentWillMount () {
    this.eventHandlers = {
      onMouseDown: this.onMouseDown.bind(this)
    }

    if (this.props.type) {
      this.block = BlockMap.generate(this.props.type, this.props.params)
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

          {this.props.name || this.props.type}
        </text>
      </g>
    )
  }

  onMouseDown (event) {
    this.props.selectBlock(this)

    if (this.block) {
      this.props.run(this)
    }
  }

  run (params) {
    if (this.block) {
      return this.block.run(params || this.props.params)
    }
  }
}
