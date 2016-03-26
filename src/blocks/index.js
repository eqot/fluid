import Inject from './Inject'
import ConsoleLog from './ConsoleLog'

const BLOCK_MAP = {
  Inject: Inject,
  ConsoleLog: ConsoleLog
}

function generate (type) {
  return new BLOCK_MAP[type]()
}

export default {
  generate: generate
}
