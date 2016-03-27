import Inject from './Inject'
import Func from './Func'
import Map from './Map'
import ConsoleLog from './ConsoleLog'

const BLOCK_MAP = {
  Inject: Inject,
  Func: Func,
  Map: Map,
  ConsoleLog: ConsoleLog
}

function generate (type, params) {
  if (BLOCK_MAP[type]) {
    return new BLOCK_MAP[type](params)
  }
}

export default {
  generate: generate
}
