/*eslint no-eval: 0*/

export default class Func {
  static defaultParams = {
    color: '#f0f072'
  }

  constructor (params) {
    this.code = eval(`(${params})`)
  }

  run (params) {
    return this.code(params)
  }
}
