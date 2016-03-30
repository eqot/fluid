export default class ConsoleLog {
  static defaultParams = {
    color1: '#c8c7c7',
    color2: '#aaaaaa',
    inDot: true
  }

  run (value) {
    console.log(value)

    return value
  }
}
