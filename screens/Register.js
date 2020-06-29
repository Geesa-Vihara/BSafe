import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  Image
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';
import { signUp,logout } from "../actions/auth.js";
import * as Location from 'expo-location';
import { Notifications } from 'expo';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Register extends React.Component {
  
  state = {
    name: '',
    email: '',
    password: ''
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  }

  handleSubmit = async() => {
    var res = false
    console.log('state',this.state);
    try{
      res = await signUp(this.state);
      if(res){  
        /* await Location.startLocationUpdatesAsync('updateLoc', {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval:30000,
          foregroundService: { 
            notificationTitle: 'GPS',
            notificationBody: ' enabled',
            notificationColor: '#FF7F27' 
          }
          }); */        
        console.log("res"+res);
    }
    }
    catch (error) {
      console.log('error', error);
      alert(error);
  }
    
    
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
            <Block flex={1} row middle space="between" style={{ marginTop: 120 }}>
              <Image source = {require('../assets/bsafe.png')} style = {{ width: 150, height: 150 }}/>                     
            </Block>
              <Block style={styles.registerContainer}>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center',
                          fontWeight:"bold",
                          //paddingTop: 10,
                          paddingBottom:20,
                        }}
                        color="#FF7F27"
                        size={24}
                      >
                        BSafe
                      </Text>
                <Block flex space="evenly">
                 
                  {/* <Block flex={0.1} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      muted
                      size={16}
                    >
                      Register
                    </Text>
                  </Block> */}
                  <Block flex={1} middle space="between">
                    <Block center flex={0.8}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8} >
                            <Input
                              placeholder="Full Name"
                              style={styles.inputs}
                              onChangeText={text => this.handleChange('name', text)}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="profile-circle"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8}>
                            <Input
                              placeholder="Email"
                              style={styles.inputs}
                              onChangeText={text => this.handleChange('email', text)}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="email-852x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8}>
                            <Input
                              password
                              placeholder="Password"
                              style={styles.inputs}
                              onChangeText={text => this.handleChange('password', text)}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="caps-small2x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          
                        </Block>
                        <Block center>
                          <Button round style={styles.createButton} onPress={this.handleSubmit}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Register
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
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
  registerContainer: {
    marginTop: 55,
    marginBottom: 55,
    width: width * 0.9,
    height:450,
    //height: height < 812 ? height * 0.8 : height * 0.8,
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
    backgroundColor: nowTheme.COLORS.WHITE
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
  }
});

export default Register;
