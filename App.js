import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import axios from 'axios';
import { Header, Card, CardSection, Button, Input, Spinner } from './src/components';

class App extends Component {
  
  state = {
    loading: false,
    cityInput: '',
    data: '',
    city: '',
    desc: '',
    temp: '',
    country:''
  }
  componentWillMount() {
  this.setState({ loading: false })
  console.log(this.state.loading)
  }
  onButtonPress() {
    console.log(this.state.loading)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityInput}&appid=0fb96df37506f1175d52250c72f0e840`
    this.setState({ 
      loading: true
     });
     console.log(this.state.loading)
    axios.get(url)
    .then((result) => {
      this.setState({ 
        loading: false,
        data: result.data,
        icon: result.data.weather[0].icon,
        city: result.data.name,
        main: result.data.weather[0].main,
        desc: result.data.weather[0].description,
        temp: Math.round(((result.data.main.temp) - 273)*100)/100,
        country: result.data.sys.country
       });
    })
    .catch((error) => {
      this.setState({ loading: false})
      alert('Please enter a valid city name!');
    });
    
    console.log(this.state.data)
  }
  
  renderDetail() {
    if (this.state.data) {
      console.log(this.state.icon)
      return (
        <Card>
          <CardSection>
          <View style={{ 
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            position: 'relative'
            }}>
            <Text style={styles.cityStyle}>{this.state.city}</Text>
            <Text style={{ fontSize: 15 }}>{this.state.country}</Text>
          </View>
        </CardSection>

        <CardSection>
          <View style={{ width: 50, height: 50 }}>
            <Image style={{ width: 50, height: 50 }} source={{ uri: `https://openweathermap.org/img/w/${this.state.icon}.png` }} />
            </View>
          <View style={{ marginLeft: 20, flexDirection: 'column', flex: 1}}>
            <Text>{this.state.main}</Text>
            <Text>{this.state.desc}</Text>
            <Text>{this.state.temp}° Celsius</Text>
          </View>
        </CardSection>
  </Card>
      )
    }
  }
  renderButton() {
    if (this.state.loading) {
        return <Spinner size="large" />;
    }
    return (
        <Button onPress={this.onButtonPress.bind(this)}>
            Log in
        </Button>
    );
} 
  render() {
    return (
      <View style={backgroundStyle}>
        <Header headerText='Weather App' />
          <Card>
            
            <CardSection>
              <View style={{ marginLeft: 10, height: 80, flexDirection:'column'}}>
              <Text style={{ alignSelf: 'center', padding: 10, fontSize: 18 }}>
              I want to know the current weather in:
              </Text>
              <Input
              
                placeholder='Enter your city name'
                value={this.state.cityInput}
                onChangeText={text => this.setState({ cityInput: text })}
                />
                </View>
                </CardSection> 

        <CardSection>
        
        {this.renderButton()}
        
          
        </CardSection>
        </Card>
        
        {this.renderDetail()}
        
      </View>
      
    );
  }
  
}

const styles = {
  backgroundStyle: {
    backgroundColor: '#a5dbff',
    flex: 1
  },
  cityStyle: {
    fontSize: 50,
    textAlign: 'center'
  }
}

const { backgroundStyle } = styles;
export default App;
