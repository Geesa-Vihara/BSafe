import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  Vibration,
  Alert,
  Image,
  NativeModules
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';
import {db} from '../config/firebase';
const { width, height } = Dimensions.get('screen');

import Firebase from "../config/firebase"
import { login, getAuthState, signInGoogle } from "../actions/auth.js";
import PushNotification from 'react-native-push-notification'
import {startTimer} from '../actions/myTimer';

var Bluetooth = NativeModules.Bluetooth;

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    email: '',
    password: '',
  }
  this.handleNotification = this.handleNotification.bind(this);

}

handleNotification=(notification)=>{
  console.log('LOCAL NOTIFICATION login==>', notification);
  if(notification.title=="Welcome Home!"||notification.title=="Welcome!"||notification.title=="It's breakfast time!"||notification.title=="It's lunch time!"||notification.title=="It's dinner time!"){    
    this.props.navigation.navigate('HandWash');  
  }else if(notification.title=="Going Outside!"||notification.title=="Finished School!"||notification.title=="Finished Uni!"||notification.title=="Finished Work!"){
    this.props.navigation.navigate('PutMask');
  }  
};

  static geoNotification = async() => {  
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      title:
      "Be Aware!",
      message: "You are in a crowded place, make sure to keep your distance!", // (required)
      date: new Date(Date.now() + 1 * 1000), // in 60 secs
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'beaware.mp3'
    });
   
  }

  static homeNotification = async() => {  
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      title:
      "Welcome Home!",
      message: "Remember to wash your hands before you see your loved ones!", // (required)
      date: new Date(Date.now() + 1 * 1000), // in 60 secs
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'handsfemale.mp3'
    });
   
  }

  static homeLeftNotification = async() => {  
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      title:
      "Going Outside!",
      message: "Remember to wear a mask!", // (required)
      date: new Date(Date.now() + 1 * 1000), // in 60 secs
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'maskfemale.mp3'
    });
   
  }

  static districtNotification = async(dist) => { 
    try{
      fetch("https://bsafe-ampersand.herokuapp.com/covid19/srilanka/districts") .then(res => res.json())
      .then(data => {
        var cases=data[dist]
        PushNotification.localNotificationSchedule({
          //... You can use all the options from localNotifications
          title:
          `Welcome to ${dist} District!`,
          message: cases==0?"⚠️ No cases reported here, but stay on alert ":cases!=1?`🚨 ${cases} covid-19 cases reported in ${dist}, be cautious `:`🚨 ${cases} covid-19 case reported in ${dist}, be cautious `, // (required)
          date: new Date(Date.now() + 1 * 1000), // in 60 secs
          vibrate: true,
          vibration: 300,
        }); 
        
      })   
    }catch(error){
      alert(error)
    }    
  }

  static schoolNotification = async() => {  
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      title:
      "Welcome!",
      message: "Remember to wash your hands before you see your friends!", // (required)
      date: new Date(Date.now() + 1 * 1000), // in 60 secs
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'schoolhands.mp3'
    });
   
  }

  static schoolLeftNotification = async() => {  
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      title:
      "Finished School!",
      message: "Remember to wear a mask!", // (required)
      date: new Date(Date.now() + 1 * 1000), // in 60 secs
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'schoolmask.mp3'
    });
   
  }

  static uniNotification = async() => {  
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      title:
      "Welcome!",
      message: "Remember to wash your hands before you see your maties!", // (required)
      date: new Date(Date.now() + 1 * 1000), // in 60 secs
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'unihands.mp3'
    });
   
  }

  static uniLeftNotification = async() => {  
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      title:
      "Finished Uni!",
      message: "Remember to wear a mask!", // (required)
      date: new Date(Date.now() + 1 * 1000), // in 60 secs
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'unimask.mp3'
    });
   
  }

  static workNotification = async() => {  
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      title:
      "Welcome!",
      message: "Remember to wash your hands before your work begins!", // (required)
      date: new Date(Date.now() + 1 * 1000), // in 60 secs
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'workhands.mp3'
    });
   
  }

  static workLeftNotification = async() => {  
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      title:
      "Finished Work!",
      message: "Remember to wear a mask!", // (required)
      date: new Date(Date.now() + 1 * 1000), // in 60 secs
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'workmask.mp3'
    });
   
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  }

  handleGoogleLogin = async() => {
    console.log('google');
    await signInGoogle();
  }

  handleSubmitLogin = async() => {
    console.log('state',this.state);
    //startTimer();
    var status=false;
    status=await login(this.state);
    if(status){ 
      await Location.startLocationUpdatesAsync('updateLoc', {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval:30000,
        foregroundService: { 
          notificationTitle: 'GPS',
          notificationBody: ' enabled',
          notificationColor: '#FF7F27' 
        }
      }); 
      const uid=await AsyncStorage.getItem('uid');
      const doc=await db.collection('crowdcount').doc(uid).get();
      const data=doc.data();          
      var radius = 50;
      if(data.places){
        Object.keys(data.places).map(async(place,index) => { 
          const base=data.places;
          const placeLng={
            latitude:base[place]["latitude"],
            longitude:base[place]["longitude"],
          }
            await Location.startGeofencingAsync(place, [
              {
                ...placeLng,
                radius,

              }
            ]);
            console.log(place,placeLng);
        })
      }
      /* await db.collection('districtWise').get().then(function(querySnapshot) {
        querySnapshot.forEach(async function(doc) {
            const data=doc.data();
            const dist=data.district;
             const placeLng=data.location;
              radius=10000;
              await Location.startGeofencingAsync(dist, [
                {
                  ...placeLng,
                  radius,
                }
              ]);  
             if(dist=="Colombo"||dist=="Ampara"||dist=="Jaffna"||dist=="Matara"||dist=="Galle"||dist=="Badulla"||dist=="Anuradhapura"||dist=="Kalutara"||dist=="Vavuniya"){
              const placeLng=data.location;
              radius=10000;
              await Location.startGeofencingAsync(dist, [
                {
                  ...placeLng,
                  radius,
                }
              ]); 
            }  
                  
            
        });
      })      */


      const tasks=await TaskManager.getRegisteredTasksAsync();
      console.log("tasksOS",JSON.stringify(tasks));
      this.props.navigation.navigate('App');
    }
  }
  componentDidMount = async() => { 
    try {
      Firebase.auth().onAuthStateChanged(async(user) => {

        if (user) {
          //await TaskManager.unregisterAllTasksAsync()
          //startTimer();
          const tasks=await TaskManager.getRegisteredTasksAsync();
          console.log("tasksCDM",JSON.stringify(tasks));
          this.setState({password:""})
          console.log(this.state)
          this.props.navigation.navigate('App');
        }
      })
      var that = this;
      PushNotification.configure({
        // (required) Called when a remote or local notification is opened or received
        onNotification: function(notification) {
          that.handleNotification(notification);
      
        },popInitialNotification: true,
        requestPermissions: true
      })

    } catch (error) {
      console.log(error)
    }
}


  render() {
    const { navigation } = this.props;
    return (
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
            <Block flex={1} row  space="between" style={{ marginTop:80,  }}>
              <Image source = {require('../assets/bsafe.png')} style = {{ width: 150, height: 150 }}/>
            </Block>
              <Block style={styles.loginContainer}>
                <Text
                  style={{
                    fontFamily: 'montserrat-regular',
                    textAlign: 'center',
                    paddingTop: 10,
                    paddingBottom:20,
                    fontWeight:"bold"
                  }}
                  color="#FF7F27"
                  size={24}
                  >
                  BSafe
                </Text> 
                <Block flex space="evenly">
                  
                  {/*<Block flex={0.1} middle style={styles.socialConnect}>
                       <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center',
                          paddingTop: 10,
                          paddingBottom:20
                        }}
                        color="#FF7F27"
                        size={24}
                      >
                        BSafe
                      </Text> 

                    
                  </Block>*/}
                  {/* <Block flex={0.1} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      muted
                      size={16}
                    >
                      Login
                    </Text>
                  </Block> */}
                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8}>
                            <Input
                              placeholder="Email"
                              style={styles.inputs}
                              value={this.state.email}
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
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              password
                              placeholder="Password"
                              style={styles.inputs}
                              onChangeText={text => this.handleChange('password', text)}
                              value={this.state.password}
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
                          <Button round style={styles.createButton} onPress={this.handleSubmitLogin}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Login
                            </Text>
                          </Button>
                          <Button color="transparent" shadowless style={styles.link} onPress={() => navigation.push('Register')}>
                            <Text center color={nowTheme.COLORS.PRIMARY} size={theme.SIZES.FONT * 0.75}>
                            {"Don't have an account? Sign Up"}
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
  loginContainer: {
    marginTop: 55,
    marginBottom: 55,
    width: width * 0.9,
    height: 450,
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
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40,
    color:nowTheme.COLORS.PRIMARY
  },
  link: {
    width: width * 0.5,
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

export default Login;
TaskManager.defineTask('updateLoc', async({ data, error }) => {
  if (error) {
    // check `error.message` for more details.
    alert("errorrrrrr"+error)
    return;
  }
  try{
  const {locations}=data;
  console.log('Received new locations', locations[0]);
  const uid=await AsyncStorage.getItem('uid');
  console.log("uid"+uid);
  await db.collection('users').doc(uid).update({
    "latitude":locations[0].coords.latitude,
    "longitude":locations[0].coords.longitude
  })
  await db.collection('crowdcount').doc(uid).get().then(async(doc)=>{
    var data=doc.data();
    console.log("doc"+JSON.stringify(data));
    
    if(data && data['count']>0){
      await Login.geoNotification();      
    
    }else{
      /* Bluetooth.discoverDevices( async(err) => 
      {
        console.log(err)
      }, async(msg) => {        
        var str=msg;
        str=str.split("*")[1]
        console.log("bluetooth func "+str+" "+msg);
        if(Number(str)>0){
          await Login.geoNotification();
        }        
      }); */
    }
  })

  const lat=locations[0].coords.latitude;
  const lon=locations[0].coords.longitude;

  const location={
    "latitude":lat,
    "longitude":lon
  }
  

 
  const HERE_API_KEY="";
  const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${HERE_API_KEY}&mode=retrieveAddresses&prox=${lat},${lon}`
  fetch(url)
    .then(res => res.json())
    .then(async(resJson) => {
      if (resJson
        && resJson.Response
        && resJson.Response.View
        && resJson.Response.View[0]
        && resJson.Response.View[0].Result
        && resJson.Response.View[0].Result[0]) {
          console.log("GOODDD",resJson.Response.View[0].Result[0].Location.Address.County)
          var district=resJson.Response.View[0].Result[0].Location.Address.County;
          const distDoc=await db.collection('UserDistricts').doc(uid).get();
          const distData=distDoc.data();
          if(distData.Ampara==0 && district=="Ampara"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];      
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district);   

        }else if(distData.Anuradhapura==0 && district=="Anuradhapura"){ 
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district);   
        }else if(distData.Badulla==0 && district=="Badulla"){   
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district);    
        }else if(distData.Batticaloa==0 && district=="Batticaloa"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district);   
        }else if(distData.Colombo==0 && district=="Colombo"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];      
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Galle==0 && district=="Galle"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Gampaha==0 && district=="Gampaha"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Hambantota==0 && district=="Hambantota"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Jaffna==0 && district=="Jaffna"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Kalutara==0 && district=="Kalutara"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Kandy==0 && district=="Kandy"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Kegalle==0 && district=="Kegalle"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Kilinochchi==0 && district=="Kilinochchi"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Kurunegala==0 && district=="Kurunegala"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Mannar==0 && district=="Mannar"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Matale==0 && district=="Matale"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Matara==0 && district=="Matara"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Monaragala==0 && district=="Monaragala"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Mullaittivu==0 && district=="Mullaittivu"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const currDist=district.replace(" ","_");
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Nuwara_Eliya==0 && district=="Nuwara Eliya"){
            const currDist=district.replace(" ","_");    
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }
                
                
            })
            await Login.districtNotification(district); 
        }else if(distData.Polonnaruwa==0 && district=="Polonnaruwa"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Puttalam==0 && district=="Puttalam"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Rathnapura==0 && district=="Rathnapura"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Trincomalee==0 && district=="Trincomalee"){
            const currDist=district
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }else if(distData.Vavuniya==0 && district=="Vavuniya"){
            const currDist=district;
            Object.keys(distData).map(async(dist,index) => { 
            const caseCount=distData[dist];
            const distToUpd=`${dist}`
            if(dist==currDist){
                await db.collection('UserDistricts').doc(uid).update(distToUpd,1);
            }
            else if(caseCount==1){
                    
                await db.collection('UserDistricts').doc(uid).update(distToUpd,0);
                
            }     
            })
            await Login.districtNotification(district); 
        }
        }
    })
    .catch((e) => {
      console.log('Error in getAddressFromCoordinates', e)
      
    })
  
  //const res=await Location.reverseGeocodeAsync(location)
  
 
  

  
}catch(error){
  alert("error"+error);
}
  
});

/* TaskManager.defineTask('Colombo', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Colombo:", region);
    await Login.districtNotification("Colombo");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Ampara', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Ampara:", region);
    await Login.districtNotification("Ampara");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Anuradhapura', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Anuradhapura:", region);
    await Login.districtNotification("Anuradhapura");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Badulla', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Badulla:", region);
    await Login.districtNotification("Badulla");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Batticaloa', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Batticaloa:", region);
    await Login.districtNotification("Batticaloa");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Galle', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Galle:", region);
    await Login.districtNotification("Galle");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Gampaha', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Gampaha:", region);
    await Login.districtNotification("Gampaha");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Hambantota', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Hambantota:", region);
    await Login.districtNotification("Hambantota");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Jaffna', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Jaffna:", region);
    await Login.districtNotification("Jaffna");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Kalutara', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Kalutara:", region);
    await Login.districtNotification("Kalutara");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Kandy', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Kandy:", region);
    await Login.districtNotification("Kandy");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Kegalle', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Kegalle:", region);
    await Login.districtNotification("Kegalle");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Kilinochchi', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Kilinochchi:", region);
    await Login.districtNotification("Kilinochchi");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Kurunegala', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Kurunegala:", region);
    await Login.districtNotification("Kurunegala");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Mannar', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Mannar:", region);
    await Login.districtNotification("Mannar");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Matale', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Matale:", region);
    await Login.districtNotification("Matale");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Matara', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Matara:", region);
    await Login.districtNotification("Matara");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Monaragala', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Monaragala:", region);
    await Login.districtNotification("Monaragala");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Mullaitivu', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Mullaitivu:", region);
    await Login.districtNotification("Mullaitivu");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Nuwara Eliya', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Nuwara Eliya:", region);
    await Login.districtNotification("Nuwara Eliya");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Polonnaruwa', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Polonnaruwa:", region);
    await Login.districtNotification("Polonnaruwa");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Puttalam', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Puttalam:", region);
    await Login.districtNotification("Puttalam");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Ratnapura', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Ratnapura:", region);
    await Login.districtNotification("Ratnapura");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Trincomalee', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Trincomalee:", region);
    await Login.districtNotification("Trincomalee");      
    
  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('Vavuniya', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered Vavuniya:", region);
    await Login.districtNotification("Vavuniya");      
    
  }
}catch(error){
  alert("error"+error);
}
}); */

TaskManager.defineTask('home', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  try{
  console.log(eventType);
  
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered region:", region);
    await Login.homeNotification();  

    
    
  } else if (eventType === Location.GeofencingEventType.Exit) {
    console.log("You've left region:", region);
    await Login.homeLeftNotification();  

  }
}catch(error){
  alert("error"+error);
}
});

TaskManager.defineTask('school', async({ data: { eventType, region }, error }) => {
  if (error) {
    alert(error)
    return;
  }
  try{
  console.log(eventType);
  
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered school:", region);
    await Login.schoolNotification(); 
    
    
  } else if (eventType === Location.GeofencingEventType.Exit) {
    console.log("You've left school:", region);
    await Login.schoolLeftNotification(); 

  }
}catch(error){
  alert("error"+error);
}
});
TaskManager.defineTask('university', async({ data: { eventType, region }, error }) => {
  if (error) {
    alert(error)
    return;
  }
  try{
  console.log(eventType);
  
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered university:", region);
    await Login.uniNotification(); 

    
    
  } else if (eventType === Location.GeofencingEventType.Exit) {
    console.log("You've left uni:", region);
    await Login.uniLeftNotification(); 

  }
}catch(error){
  alert("error"+error);
}
});
TaskManager.defineTask('workplace', async({ data: { eventType, region }, error }) => {
  if (error) {
    alert(error)
    return;
  }
  try{
  console.log(eventType);
  
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered work:", region);
    await Login.workNotification(); 

    
    
  } else if (eventType === Location.GeofencingEventType.Exit) {
    console.log("You've left work:", region);
    await Login.workLeftNotification(); 

  }
}catch(error){
  alert("error"+error);
}
});

