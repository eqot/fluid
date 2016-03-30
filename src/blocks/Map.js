export default class Map {
  static defaultParams = {
    color1: '#f7d09c',
    color2: '#fabf70',
    outDot: true
  }

  run (params, inoutBlock) {
    const result = params.map((item) => {
      return inoutBlock.run(item)
    })

    return result
  }
}
