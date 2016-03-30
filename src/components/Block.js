import React from 'react'

import styles from './Block.scss'

import BlockMap from '../blocks'

export default class Block extends React.Component {
  static propTypes = {
    uid: React.PropTypes.string,
    name: React.PropTypes.string,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    round: React.PropTypes.number,
    out: React.PropTypes.array,
    inout: React.PropTypes.string,
    type: React.PropTypes.string,
    params: React.PropTypes.any,
    inButtonSize: React.PropTypes.number,
    outDotSize: React.PropTypes.number,

    selectBlock: React.PropTypes.func,
    run: React.PropTypes.func
  }

  static defaultProps = {
    width: 100,
    height: 32,
    round: 8,
    inButtonSize: 16,
    outDotSize: 6
  }

  static blocks = {}

  componentWillMount () {
    Block.blocks[this.props.uid] = this

    this.eventHandlers = {
      onMouseDown: this.onMouseDown.bind(this)
    }

    this.eventHandlersForRun = {
      onMouseDown: this.run.bind(this)
    }

    if (this.props.type) {
      this.block = BlockMap.generate(this.props.type, this.props.params)
    }
  }

  render () {
    let rectStyle = null
    if (this.block && this.block.color) {
      rectStyle = {
        fill: this.block.color
      }
    }

    let gradient = null
    if (this.block && this.block.color1 && this.block.color2) {
      gradient = (
        <defs>
          <linearGradient id={`g${this.props.uid}`} gradientTransform='rotate(30)'>
            <stop offset='0.1' stopColor={this.block.color1} />
            <stop offset='0.9' stopColor={this.block.color2} />
          </linearGradient>
        </defs>
      )

      rectStyle = {
        fill: `url(#g${this.props.uid})`
      }
    }

    let inButton = null
    if (this.block.inButton) {
      inButton = (
        <rect className={styles.inbutton} {...this.eventHandlersForRun}
          x={-this.props.inButtonSize + 1} y={(this.props.height - this.props.inButtonSize) / 2}
          width={this.props.inButtonSize} height={this.props.inButtonSize} />
      )
    }

    let inDot = null
    if (this.block.inDot) {
      inDot = (
        <circle className={styles.outdot} {...this.eventHandlersForRun}
          cx={-this.props.outDotSize + 2} cy={this.props.height / 2}
          r={this.props.outDotSize} />
      )
    }

    let outDot = null
    if (this.block.outDot) {
      outDot = (
        <circle className={styles.outdot} {...this.eventHandlersForRun}
          cx={this.props.width + 4} cy={this.props.height / 2}
          r={this.props.outDotSize} />
      )
    }

    return (
      <g className={styles.block} {...this.eventHandlers}
        transform={`translate(${this.props.x},${this.props.y})`}>

        {gradient}

        {inButton}
        {inDot}
        {outDot}

        <rect style={rectStyle}
          rx={this.props.round} ry={this.props.round}
          width={this.props.width} height={this.props.height} />

        <text textAnchor='middle' dominantBaseline='central'
          x={this.props.width / 2} y={this.props.height / 2}>

          {this.getName()}
        </text>
      </g>
    )
  }

  getName () {
    if (this.props.name) {
      return this.props.name
    }

    let name = this.props.type
    if (this.props.params) {
      let params = this.props.params
      if (Array.isArray(params)) {
        params = '[' + params.join(', ') + ']'
      }

      name += ' ' + params
    }
    return name
  }

  onMouseDown (event) {
    this.props.selectBlock(this)
  }

  run (params) {
    if (!this.block) {
      return
    }

    const inoutBlockUid = this.props.inout
    const inoutBlock = Block.blocks[inoutBlockUid]

    const next = this.block.run(params, inoutBlock)
    if (next instanceof Promise) {
      if (this.props.out && this.props.out.length > 0) {
        this.props.out.forEach((outBlockUid) => {
          const outBlock = Block.blocks[outBlockUid]
          if (!outBlock) {
            return
          }

          next.then(outBlock.run.bind(outBlock)).catch((e) => {
            console.log(e)
          })
        })
      }
    } else {
      if (this.props.out && this.props.out.length > 0) {
        this.props.out.forEach((outBlockUid) => {
          const outBlock = Block.blocks[outBlockUid]
          if (!outBlock) {
            return
          }

          outBlock.run(next)
        })
      }
    }

    return next
  }
}
