export default class Inject {
  static defaultParams = {
    color: '#8fcce9'
  }

  constructor (params) {
    this.params = params
  }

  run () {
    return this.params
  }
}
