/*** src/main.js ** */

import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import MapView from 'react-native-maps';
import GeoCoder from 'react-native-geocoder';
import LocationPin from './components/LocationPin';
import LocationSearch from './components/LocationSearch';
import ClassSelection from './components/ClassSelection';
import ConfirmationModal from './components/ConfirmationModal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: null,
      carLocations: [
        {
          rotation: 78,
          latitude: 37.7825,
          longitude: -122.4318
        },

        {
          rotation: 10,
          latitude: 37.79015,
          longitude: -122.4318
        },
        {
          rotation: 262,
          latitude: 37.78525,
          longitude: -122.4348
        }
      ]
    }

    this.initialRegion = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    };
  }

  _onRegionChange(region) {
    this.setState({position: null});
    const self = this;
    if (this.timeoutId) clearTimeOut(this.timeoutId);
    this.timeoutId = setTimeout(async () => {
      try {
        const res = await GeoCoder.geocodeposition({
          lat: region.latitude,
          lon: region.longitude
        });
        self.state({ position: res[0] });
      } catch (err) {
        console.log(err);
      }
      }, 2000)
    }

    _onBookingRequest() {
      this.setState({
        confirmationModalVisible: true
      });
    }

    componentDidMount() {
      this._onRegionChange.call(this, this.initialRegion);
    }


  





  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.fullScreenMap}
          initialRegion={this.initialRegion}
        >
        {this.state.carLocations.map((carLocation, i) => (
            <MapView.Marker key={i} coordinate={carLocation}>
              <Animated.Image
                style={{
                  transform: [{ rotate: `${carLocation.rotation}deg` }],
                }}
                source={require('./img/car.png')}
              />
            </MapView.Marker>
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
fullScreenMap: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});