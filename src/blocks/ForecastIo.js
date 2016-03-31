import Http from 'fluid-block-http'
import Json from 'fluid-block-json'

export default class ForecastIo {
  static defaultParams = {
    color1: '#abf7f7',
    color2: '#4dfbfb',
    inDot: true,
    outDot: true
  }

  constructor () {
    this.http = new Http()
    this.json = new Json()
  }

  run (value) {
    return new Promise((resolve, reject) => {
      const [, lat, lng] = value

      const apiKey = ''
      const url = 'https://api.forecast.io/forecast/' + apiKey +
        lat + ',' + lng + '?exclude=currently,minutely,hourly,flags&units=si'

      this.http.run(url)
        .then(this.json.run)
        .then(this.filter)
        .then(resolve)
    })
  }

  filter (value) {
    const weather = value.daily.data[1]

    return weather.summary
  }
}
