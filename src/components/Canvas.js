import React from 'react'

import Block from './Block'
import Wire from './Wire'
import styles from './Canvas.scss'

export default class Canvas extends React.Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    blocks: React.PropTypes.array,
    children: React.PropTypes.object,

    moveBlocks: React.PropTypes.func
  }

  static defaultProps = {
    width: 800,
    height: 600
  }

  constructor () {
    super()

    this.selectBlock = this.selectBlock.bind(this)
  }

  componentWillMount () {
    this.isPressed = false

    this.eventHandlers = {
      onMouseDown: this.onMouseDown.bind(this),
      onMouseMove: this.onMouseMove.bind(this),
      onMouseUp: this.onMouseUp.bind(this)
    }
  }

  render () {
    let blockMap = {}
    this.props.blocks.forEach((block) => {
      blockMap[block.uid] = block
    })

    let wires = []
    const blocks = this.props.blocks.map((block, index) => {
      if (block.out && block.out.length > 0) {
        block.out.forEach((outBlockUid) => {
          const outBlock = blockMap[outBlockUid]
          if (!outBlock) {
            return
          }

          const wire = this.renderWire(block, outBlock)
          wires.push(wire)
        })
      }

      return (
        <Block {...block} key={block.uid} ref={block.uid} selectBlock={this.selectBlock} run={this.run} />
      )
    })

    return (
      <svg className={styles.canvas} width={this.props.width} height={this.props.height}
        {...this.eventHandlers}>

        {blocks}
        {wires}
      </svg>
    )
  }

  renderWire (inBlock, outBlock) {
    const vector = {
      x1: inBlock.x + Block.defaultProps.width,
      y1: inBlock.y + Block.defaultProps.height / 2,
      x2: outBlock.x,
      y2: outBlock.y + Block.defaultProps.height / 2
    }

    return (
      <Wire {...vector} key={`wire-${inBlock.uid}-${outBlock.uid}`} />
    )
  }

  onMouseDown (event) {
    this.isPressed = true

    this.lastX = event.clientX
    this.lastY = event.clientY
  }

  onMouseMove (event) {
    if (!this.isPressed) {
      return
    }

    const x = event.clientX
    const y = event.clientY

    const dx = x - this.lastX
    const dy = y - this.lastY
    this.lastX = x
    this.lastY = y

    if (this.state.selectedBlocks) {
      this.props.moveBlocks(this.state.selectedBlocks, dx, dy)
    }
  }

  onMouseUp () {
    this.isPressed = false

    this.setState({
      selectedBlocks: null
    })
  }

  selectBlock (block) {
    this.setState({
      selectedBlocks: [block]
    })
  }
}
