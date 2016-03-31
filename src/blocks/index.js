import React from 'react'

import Block from '../components/Block'
import Inject from './Inject'
import Func from './Func'
import Map from './Map'
import Delay from './Delay'
import Http from 'fluid-block-http'
import Json from 'fluid-block-json'
import ConsoleLog from './ConsoleLog'

const BLOCK_MAP = {
  Inject: Inject,
  Func: Func,
  Map: Map,
  Delay: Delay,
  Http: Http,
  Json: Json,
  ConsoleLog: ConsoleLog
}

const BLOCK_LIST = [
  'Inject',

  'ConsoleLog',

  'Func',
  'Map',
  'Delay',
  'Http',
  'Json'
]

const LIST_MARGIN_TOP = 20
const LIST_MARGIN_LEFT = 40
const LIST_MARGIN_RIGHT = LIST_MARGIN_LEFT
const LIST_MARGIN_BOTTOM = 10

export default class BlockList extends React.Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number
  }

  static defaultProps = {
    width: Block.defaultProps.width + LIST_MARGIN_LEFT + LIST_MARGIN_RIGHT
  }

  static generate = (type, params) => {
    if (BLOCK_MAP[type]) {
      let block = new BLOCK_MAP[type](params)

      const defaultParams = BLOCK_MAP[type].defaultParams
      if (defaultParams) {
        block = Object.assign(block, defaultParams)
      }

      return block
    }
  }

  render () {
    const x = LIST_MARGIN_LEFT
    const y = LIST_MARGIN_TOP
    const dy = Block.defaultProps.height + LIST_MARGIN_BOTTOM

    const blocks = BLOCK_LIST.map((type, index) => {
      return (
        <Block x={x} y={y + index * dy} type={type} uid={`list-${type}`} key={`list-${type}`} />
      )
    })

    return (
      <svg width={this.props.width} height={this.props.height}>
        {blocks}
      </svg>
    )
  }
}
