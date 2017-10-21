import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import axios from 'axios';


import { Header, Card, CardSection, Button, Input } from './src/components';

class App extends Component {
  state = { 
    cityInput: '',
    data: '',
    city: '',
    desc: '',
    temp: ''
  }
  onButtonPress() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityInput}&appid=0fb96df37506f1175d52250c72f0e840`
    axios.get(url)
    .then((result) => {
      this.setState({ 
        data: result.data,
        city: result.data.name,
        desc: result.data.weather[0].description,
        temp: result.data.main.temp
       });
    });
    
    console.log(this.state.data)
  }

  
  render() {
    return (
      <View>
      <Header headerText='Weather App' />
      <Card>
      <Text style={{ alignSelf: 'center', paddingTop: 10 }}>
      I want to know the current weather in:
      </Text>
        <CardSection>
            <Input
            placeholder='enter your city'
            value={this.state.cityInput}
            onChangeText={text => this.setState({ cityInput: text })}
            
            />
            
        </CardSection>
        <CardSection>
          <Button
          onPress={this.onButtonPress.bind(this)}
          >
            Tell Me!
          </Button>
        </CardSection>
        <CardSection>
          <View style={{ flexDirection: 'column' }}>
            <Text>City:{this.state.city}</Text>
            <Text>Description:{this.state.desc}</Text>
            <Text>Temperature:{this.state.temp}</Text>
          </View>
        </CardSection>
      </Card>
      </View>
    );
  }
}

export default App;
