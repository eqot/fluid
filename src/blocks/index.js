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

export default class BlockList extends React.Component {
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
    const x = 20
    const y = 20
    const dy = Block.defaultProps.height + 8

    const blocks = BLOCK_LIST.map((type, index) => {
      return (
        <Block x={x} y={y + index * dy} type={type} uid={`list-${type}`} key={`list-${type}`} />
      )
    })

    return (
      <svg width={200} height={1024}>
        {blocks}
      </svg>
    )
  }
}
