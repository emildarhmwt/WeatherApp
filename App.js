import React, { useState } from 'react'
// Import axios, BASE_URL, dan API_KEY
import axios from 'axios'
import { BASE_URL, API_KEY } from './src/constant'
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native'
import WeatherSearch from './src/components/weatherSearch'
import WeatherInfo from './src/components/weatherInfo'

const App = () => {
  // Definisikan state "weatherData" dan "setWeatherData"
  const [weatherData, setWeatherData] = useState()
  const [status, setStatus] = useState();

  // Definisikan function renderComponent
  const renderComponent = () => {
    switch (status) {
      case 'loading':
        return <ActivityIndicator size="large" />
      case 'success':
        return (
      <WeatherInfo
        name = {weatherData?.name}
        temp = {weatherData?.main?.temp}
        weatherDesc={weatherData?.weather[0]?.description}
        icon = {weatherData?.weather[0]?.icon}
        visibility = {weatherData?.visibility}
        windSpeed = {weatherData?.wind.speed}
      />
        );
      case 'error':
        return (
          <Text>
            Something went wrong. Please try again with a correct city name.
          </Text>
        )
      default:
        return
    }
  }

  const searchWeather = async (location) => {
  // Mengatur status ke "loading"
  setStatus('loading')
  axios
    .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
    .then((response) => {
      const data = response.data
      data.visibility /= 1000
      data.visibility = data.visibility.toFixed(2)
      data.main.temp -= 273.15
      data.main.temp = data.main.temp.toFixed(2)
      setWeatherData(data)
      // Mengatur status ke "success"
      setStatus('success')
    })
    .catch((error) => {
      // Mengatur status ke "error"
      setStatus('error')
    })
}

  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      <View style={styles.margintTop20}>{renderComponent()}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})

export default App