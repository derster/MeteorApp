/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {fetchWeather} from './weatherAPI';

const iconNames = {
  Clear: 'md-sunny',
  Rain: 'md-rainy',
  Thunderstorm: 'md-thunderstorm',
  Snow: 'md-snow',
  Drizzle: 'md-umbrella',
  Clouds: 'md-cloud',
}

export default class MeteorApp extends Component {
  componentWillMount(){
    this.state = {
      temp:0,
      weather: 'Clear',
      city: 'City',
    }
    // this.state = {hideStatusBar:false}
  }
  componentDidMount(){
    this.getLocation()
    // fetchWeather(-21,28).then(res => console.log(res))
    // setInterval(()=>{
    //   this.setState({hideStatusBar:true})
    // }, 1000)
  }

  getLocation(){
    navigator.geolocation.getCurrentPosition(
      (posData) => fetchWeather(posData.coords.latitude, posData.coords.longitude)
          .then(res => this.setState({
              temp: res.temp,
              weather: res.weather,
              city: res.city,
          })),
      (error) => alert(error),
      {timeout:1000}
    )
  }

  render() {
    return (

      <View style={styles.container}>
        <StatusBar hidden={this.state.hideStatusBar}/>
        <View style={styles.header}>
          <Icon name={iconNames[this.state.weather]} size={45} color={'red'}/>
          <Text style={styles.temp}>{Math.floor(this.state.temp)}° </Text>
        </View>

        <View>
          <Text style={styles.city}>{this.state.city}</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>Créer une application météo Tendance</Text>
          <Text style={styles.subtitle}> Créer pour être utiliser </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#ffd017',
    padding: 20,
  },
  header: {
    flexDirection:'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    margin: -20,
    marginBottom: 0,
    //backgroundColor: 'blue',
  },
  temp:{
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 45,
    color:'red'
  },
  body:{
    flex: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  title:{
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 55,
    color:'#fff',
    marginBottom:5,
  },
  subtitle:{
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 16,
    color:'#fff'
  },
  city:{
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 46,
    color: '#169bd6',
  }
});

AppRegistry.registerComponent('MeteorApp', () => MeteorApp);
