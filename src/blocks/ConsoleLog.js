export default class ConsoleLog {
  static defaultParams = {
    color: '#aaa'
  }

  run (value) {
    console.log(value)

    return value
  }
}
