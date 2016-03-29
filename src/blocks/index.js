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

function generate (type, params) {
  if (BLOCK_MAP[type]) {
    let block = new BLOCK_MAP[type](params)

    const defaultParams = BLOCK_MAP[type].defaultParams
    if (defaultParams) {
      block = Object.assign(block, defaultParams)
    }

    return block
  }
}

export default {
  generate: generate
}
