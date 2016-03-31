export default class Map {
  static defaultParams = {
    color1: '#f7d09c',
    color2: '#fabf70',
    inDot: true,
    outDot: true
  }

  run (params, inoutBlock) {
    return new Promise((resolve, reject) => {
      Promise.all(params.map((item) => {
        return inoutBlock.run(item)
      }))
      .then(resolve)
    })
  }
}
