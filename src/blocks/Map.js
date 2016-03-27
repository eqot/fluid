export default class Map {
  run (params, inoutBlock) {
    const result = params.map((item) => {
      return inoutBlock.run(item)
    })

    return result
  }
}
