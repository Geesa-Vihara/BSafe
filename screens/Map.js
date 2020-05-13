import React from "react";
import { StyleSheet, Dimensions,View,Text, AsyncStorage, DatePickerAndroid } from "react-native";
import MapView,{Marker} from "react-native-maps";
import {db} from '../config/firebase';

export default class Map extends React.Component {
state={
  markers:{},
  mapRegion: null,
  hasLocationPermissions: false,
  locationResult: null
}

async componentDidMount(){
  const uid=await AsyncStorage.getItem('uid');
  const doc=await db.collection('crowdcount').doc(uid).get();
  const data=doc.data();
  if(data.places){        
    this.setState({markers:data.places})
  }
  
  
}

  render() {
    return (
      <MapView
        style={{
          flex: 1
        }}
        initialRegion={{
          latitude: 7.8731,
          longitude: 80.7718,
          latitudeDelta: 3,
          longitudeDelta: 3
        }}
      >
            
             {this.state.markers && Object.keys(this.state.markers).map((marker,index) => {
                  const base=this.state.markers;
                  const coords = {
                    latitude: base[marker]["latitude"],
                    longitude: base[marker]["longitude"],
                  };
                  return(
                    <MapView.Marker
                      key={index}
                      coordinate={coords}
                      title={"My "+marker.charAt(0).toUpperCase()+marker.slice(1)}
                    />
                  )
                  
                  }
                )
              }

            
      </MapView>
      
   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
