export default class Inject {
  static defaultParams = {
    color1: '#6c99c9',
    color2: '#4785c8',
    inButton: true,
    outDot: true
  }

  constructor (params) {
    this.params = params
  }

  run () {
    return this.params
  }
}
