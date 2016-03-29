export default class Delay {
  static defaultParams = {
    color: '#de9165'
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
