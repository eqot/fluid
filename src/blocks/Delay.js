export default class Delay {
  static defaultParams = {
    color1: '#d1895e',
    color2: '#d26c30',
    outDot: true
  }

  constructor (params) {
    this.duration = params
  }

  run (value) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, this.duration, value)
    })
  }
}
