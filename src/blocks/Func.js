/*eslint no-eval: 0*/

export default class Func {
  constructor (params) {
    this.code = eval(`(${params})`)
  }

  run (params) {
    return this.code(params)
  }
}
