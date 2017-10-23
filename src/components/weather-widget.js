import React from 'react'
import SyncanoClient from 'syncano-client'

export default class WeatherWidget extends React.Component {
  state = {
    count: 0
  }

  componentDidMount() {
    const {city} = this.props
    const s = new SyncanoClient('late-water-1294')

    s.get('openweathermap/get-temperature', {city}).then(res => {
      this.setState({temp: res.temp})
    })
  }

  render() {
    const {style, props: {city}, state: {temp}} = this
    const bg = this._getTempColor(temp)

    return (
      <div style={style.wrapper(bg)}>
        <div style={style.background} />
        {temp && <div style={style.temp}>{temp}&deg;C</div>}
        <h2 style={style.city}>{city}</h2>
      </div>
    )
  }

  _getTempColor(temp) {
    return `hsla(${30 + 240 * (30 - temp) / 60}, 60%, 60%, .3)`
  }

  style = {
    wrapper: background => ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      fontFamily: 'Helvetica, Arial',
      position: 'relative',
      maxWidth: 320,
      width: '100%',
      height: 300,
      textAlign: 'center',
      color: '#fff',
      borderRadius: 5,
      boxShadow: '0 1px 3px rgba(0,0,0, .1)',
      background
    }),
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      borderRadius: 5,
      background: 'url(https://i.imgur.com/hnPmkza.png)',
      filter: 'grayscale()'
    },
    temp: {
      fontSize: 52,
      fontWeight: 'bold',
      marginTop: -50,
      position: 'relative'
    },
    city: {
      color: '#fff',
      fontSize: 22,
      margin: 0,
      marginTop: 16,
      position: 'relative'
    }
  }
}
