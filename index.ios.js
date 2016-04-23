import React from 'react-native';
import api from './src/api';

const {
  AppRegistry,
  Component,
  MapView,
  View,
  Text,
  StyleSheet
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 3,
    marginTop: 20,
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
  },
});

class Weather extends Component {
  constructor() {
    super();

    this.state = {
      pin: {
        latitude: 0,
        longitude: 0,
      },
      city: '',
      temprature: '',
      description: '',
    };

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
  }

  onRegionChangeComplete(region) {
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude,
      },
    });
    api(region.latitude, region.longitude)
      .then((data) => {
        this.setState(data);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          annotations={[this.state.pin]}
          style={styles.map}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{this.state.city}</Text>
          <Text style={styles.text}>{this.state.temprature}</Text>
          <Text style={styles.text}>{this.state.description}</Text>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('weather', () => Weather);
