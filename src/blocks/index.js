import Inject from './Inject'
import Func from './Func'
import Map from './Map'
import Delay from './Delay'
import ConsoleLog from './ConsoleLog'

const BLOCK_MAP = {
  Inject: Inject,
  Func: Func,
  Map: Map,
  Delay: Delay,
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
