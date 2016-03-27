export default class Map {
  run (params, inout) {
    // console.log(this.props.inout)
    console.log(inout)

    const result = params.map((item) => {
      return item
    })

    return result
  }
}
