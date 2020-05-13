import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Vibration,
  Alert ,
  Picker,
  View,
  AsyncStorage
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';
import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';
import MapView,{Marker} from "react-native-maps";
import {db} from '../config/firebase';
import { logout } from "../actions/auth.js";

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Visits extends React.Component {
  
  state = {
    place:"home",
    coords :{
        latitude: 0,
        longitude: 0,
        
    }
  }

  successAlert = () =>
  Alert.alert(
    "Your Places",
    `${this.state.place.charAt(0).toUpperCase()+this.state.place.slice(1)} location added to your places!`,
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );
  notSuccessAlert = () =>
  Alert.alert(
    "Your Places",
    `Please click on the map for your ${this.state.place.charAt(0).toUpperCase()+this.state.place.slice(1)} location!`,
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );


  handleSubmit = async() => {
    if(this.state.coords.longitude===null||this.state.coords.latitude===null){
        this.notSuccessAlert();
    }else{        
        this.successAlert();
        const uid=await AsyncStorage.getItem('uid');
        const item=this.state.place;
        const places=`places.${item}`
        let longitude=this.state.coords.longitude;
        let latitude=this.state.coords.latitude;
        console.log(longitude,latitude);
        if(item==="home"){        
            await db.collection('crowdcount').doc(uid).update(places,{longitude:longitude,latitude:latitude});
        }else if(item==="school"){
            await db.collection('crowdcount').doc(uid).update(places,{longitude:longitude,latitude:latitude});
        }else if(item==="university"){
            await db.collection('crowdcount').doc(uid).update(places,{longitude:longitude,latitude:latitude});
        }
        else if(item==="workplace"){
            await db.collection('crowdcount').doc(uid).update(places,{longitude:longitude,latitude:latitude});
        }else if(item==="other"){
            await db.collection('crowdcount').doc(uid).update(places,{longitude:longitude,latitude:latitude});
        }
        var res = false;
        res = await logout();

        if(res){
        this.props.navigation.navigate('Login');
        } 
    }
   
  }
  setSelectedValue = (item) => { 
    this.setState({place:item});
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
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.visitsContainer}>
                <Block flex space="evenly">
                    <Block flex={0.1} middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        }}
                        color="#333"
                        size={24}
                      >
                        Add your frequent visits
                      </Text>
                    </Block>
                  <Block flex={0.1}>                  
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      muted
                      size={16}
                    >
                      Set where you are most likely to spend your time!
                    </Text>
                  </Block>
                      <Picker selectedValue = {this.state.place} onValueChange = {this.setSelectedValue}>
                                  <Picker.Item label="Home" value="home" />                                
                                  <Picker.Item label="School" value="school" />                                
                                  <Picker.Item label="University" value="university" />
                                  <Picker.Item label="Workplace" value="workplace" />
                              </Picker>                                                        
                                                 
                          <MapView
                            style={{
                            flex: 1
                            }}
                            initialRegion={{
                            latitude: 7.8731,
                            longitude: 80.7718,
                            latitudeDelta: 4,
                            longitudeDelta: 4
                            }}
                            onPress={this.handlePress}
                            >
                            <Marker
                            coordinate={this.state.coords}
                            title="My location"/>
                           </MapView> 
                           <Block center>
                            <Button round style={styles.createButton} onPress={this.handleSubmit}>
                                <Text
                                style={{ fontFamily: 'montserrat-bold' }}
                                size={14}
                                color={nowTheme.COLORS.WHITE}
                                >
                                Done
                                </Text>
                            </Button> 
                           </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  visitsContainer: {
    marginTop: 55,
    marginBottom: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    color:nowTheme.COLORS.PRIMARY,
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  },
  visitsInput: { 
    paddingVertical: 8, 
    paddingHorizontal: 80, 
    borderWidth: 1, 
    borderColor: 'grey', 
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center', 
  }
});

export default Visits;
