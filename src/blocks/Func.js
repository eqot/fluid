/*eslint no-eval: 0*/

export default class Func {
  static defaultParams = {
    color1: '#fcfca8',
    color2: '#f7f75e',
    inDot: true,
    outDot: true
  }

  constructor (params) {
    this.code = eval(`(${params})`)
  }

  run (params) {
    return this.code(params)
  }
}
