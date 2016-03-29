export default class Map {
  static defaultParams = {
    color: '#fc8'
  }

  run (params, inoutBlock) {
    const result = params.map((item) => {
      return inoutBlock.run(item)
    })

    return result
  }
}
