export default class Delay {
  constructor (params) {
    this.duration = params
  }

  run (value) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, this.duration, value)
    })
  }
}
