/* import React from "react";
import { StyleSheet, Dimensions,View, AsyncStorage,Vibration } from "react-native";
import MapView,{Marker} from "react-native-maps";
import * as Location from 'expo-location';
import { Button,Block,theme,Text } from "galio-framework";
import { nowTheme } from '../constants/';
const { height, width } = Dimensions.get('screen');
import * as TaskManager from 'expo-task-manager';
import { Notifications } from 'expo';
import { Audio } from 'expo-av';

Audio.setAudioModeAsync({
  staysActiveInBackground:true,
  allowsRecordingIOS: false,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: true,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
});
export default class OnstartMap extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      coords :{
        latitude: 0,
        longitude: 0,
    },
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,
      notification: {},
    }
  } 

async componentDidMount() {
  console.log("onstartcdm"+await TaskManager.getRegisteredTasksAsync())
  await TaskManager.unregisterAllTasksAsync()
  this.getLocationAsync();  
  this._notificationSubscription = Notifications.addListener(this._handleNotification); 
}

_handleNotification = async(notification) => {
  Vibration.vibrate();  
  console.log(notification);
  this.setState({ notification: notification });
  if(notification.origin==="selected" && notification.data['data']==="hands"){
    const {navigation}= this.props;
    navigation.navigate('HandWash');
  }else if(notification.origin==="selected" && notification.data['data']==="mask"){
    const {navigation}= this.props;
    navigation.navigate('PutMask');
  }
};

static getExpoPushToken=async()=>{
  var token=await AsyncStorage.getItem("expoPushToken");  
  return token;
}

nextpage=async()=>{
  
    console.log("onstartnp"+await TaskManager.getRegisteredTasksAsync())
    const longitude=this.state.coords.longitude;
    const latitude=this.state.coords.latitude;
    await AsyncStorage.setItem("longitude",String(longitude) );
    await AsyncStorage.setItem("latitude",String(latitude));
    const latLng={
        latitude:latitude,
        longitude:longitude
    }
    const radius = 50;
    await Location.startGeofencingAsync('checkHomeTask', [
        {
          ...latLng,
          radius
        }
      ]);

    const {navigation}= this.props;
    navigation.navigate('App');
}

async getLocationAsync (){
  let { status } = await Location.requestPermissionsAsync();
  if (status !== 'granted') {
    this.setState({
      locationResult: 'Permission to access location was denied',
    });
  } else {
    this.setState({ hasLocationPermissions: true });
  }

  let location = await Location.getCurrentPositionAsync({});
  this.setState({ locationResult: JSON.stringify(location) });
  this.setState(prevState => ({
    coords: {                   
        ...prevState.coords,    
        longitude: location.coords.longitude      
    }
}))
  this.setState(prevState => ({
    coords: {                   
        ...prevState.coords,    
        latitude: location.coords.latitude      
    }
  }))
  // Center the map on the location we just fetched.
   this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
 }

 handlePress=async(e)=>{
  let coordinate=await e.nativeEvent.coordinate;
  let longitude=await coordinate.longitude;
  let latitude=await coordinate.latitude;
  this.setState(prevState => ({
    coords: {                   
        ...prevState.coords,    
        longitude: longitude 
    }
}))
  this.setState(prevState => ({
    coords: {                   
        ...prevState.coords,    
        latitude: latitude     
    }
  }))
 }

  render() {
    return (
        <Block flex>
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
                onPress={this.handlePress}
            >
                    <Marker
                    coordinate={this.state.coords}
                    title="My Home"
                />
         
            </MapView>
                <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.PRIMARY}
                  onPress={this.nextpage}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    Next
                  </Text>
                </Button>
                
            </Block>
            
       
      
      
   
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
  button: {
    width: width,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
}); */
/* TaskManager.defineTask('checkHomeTask', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  console.log(eventType);
  
  const token=await OnstartMap.getExpoPushToken()
  console.log("token"+JSON.stringify(token))
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered region:", region);
    const message = {
      to: token,
      sound: 'default',
      title: 'Wecome Home!',
      body: 'Remember to wash your hands before you see your loved ones!',
      data: { data: 'hands' },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    try {
    
      let soundObject  = new Audio.Sound();
      await soundObject.loadAsync(require('../assets/sounds/handsfemale.mp3'));
      await soundObject.playAsync();     

  } catch (error) {
      //console.log("error"+error);
  }
    
    
  } else if (eventType === Location.GeofencingEventType.Exit) {
    console.log("You've left region:", region);
    const message = {
      to: token,
      sound: 'default',
      title: 'Going Outside?',
      body: 'Remember to wear a mask!',
      data: { data: 'mask' },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    try {
    
      let soundObject  = new Audio.Sound();
      await soundObject.loadAsync(require('../assets/sounds/maskfemale.mp3'));
      await soundObject.playAsync();        

  } catch (error) {
      //console.log("error"+error);
  }
  }
}); */