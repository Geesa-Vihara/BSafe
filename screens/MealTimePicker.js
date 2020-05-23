import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Vibration,
  Alert 
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';
import { ScrollView, SafeAreaView } from "react-native";

//import TimePicker from 'react-native-simple-time-picker';
import TimePicker from '../components/TimePicker';
import moment from 'moment';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';
import { setMealTimes, getMealTimes } from "../actions/database.js";
/* import { Notifications } from 'expo';
import { Audio } from 'expo-av'; */
import PushNotification from 'react-native-push-notification'

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
/* Audio.setAudioModeAsync({
  staysActiveInBackground: true,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
  shouldDuckAndroid: true,
  playThroughEarpieceAndroid: true,
  allowsRecordingIOS: true,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  playsInSilentModeIOS: true,
}); */
class MealTimePicker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      breakfastHour: 0,
      breakfastMinutes: 0,
      lunchHour: 0,
      lunchMinutes: 0,
      dinnerHour: 0,
      dinnerMinutes: 0,
      notification:{}
      
    }
    this.handleNotification = this.handleNotification.bind(this);
}

  successAlert = () =>
  Alert.alert(
    "Pick Your Meal Times",
    "Your meal times submitted successfully! You will get a reminder to wash your hands at your meal times.",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );

  handleChange = (hours, minutes, h, m) => {
    this.setState({ [hours]: h, [minutes]: m });
    console.log(this.state)
  }

  handleNotification=(notification)=>{
    console.log('LOCAL NOTIFICATION ==>', notification);
    this.props.navigation.navigate('HandWash');    
  };

  async componentDidMount() {
    try {
      const mealTimes = await getMealTimes();

      if(mealTimes.breakfast!=0 && mealTimes.lunch!=0 && mealTimes.dinner!=0){
        const breakfast = moment(mealTimes.breakfast)
        const lunch = moment(mealTimes.lunch)
        const dinner = moment(mealTimes.dinner)

        this.setState({
          breakfastHour : breakfast.hour(),
          breakfastMinutes : breakfast.minute(),
          lunchHour : lunch.hour(),
          lunchMinutes : lunch.minute(),
          dinnerHour : dinner.hour(),
          dinnerMinutes : dinner.minute()
        })
      }
      console.log(this.state); 
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

    //this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }
  
  /* _handleNotification = async(notification) => {
    Vibration.vibrate();  
    console.log(notification);
    this.setState({ notification: notification });
    
    if(notification.origin==="received" && notification.data['data']==="breakfast"){
      try {
    
        let soundObject  = new Audio.Sound();
        await soundObject.loadAsync(require('../assets/sounds/breakfast.mp3'));
        await soundObject.playAsync();        
  
    } catch (error) {
        //console.log("error"+error);
    }

  }else if(notification.origin==="received" && notification.data['data']==="lunch"){
    try {
    
      let soundObject  = new Audio.Sound();
      await soundObject.loadAsync(require('../assets/sounds/lunch.mp3'));
      await soundObject.playAsync();        

  } catch (error) {
      //console.log("error"+error);
  }

  }else if(notification.origin==="received" && notification.data['data']==="dinner"){
    try {
    
      let soundObject  = new Audio.Sound();
      await soundObject.loadAsync(require('../assets/sounds/dinner.mp3'));
      await soundObject.playAsync();        

  } catch (error) {
      //console.log("error"+error);
  }
  }

  if(notification.origin==="selected"){
      const {navigation}= this.props;
      navigation.navigate('HandWash');
  };
} */
  LocalBNotification = (time) => {  
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      bigText:
          "It's breakfast time!",
      message: 'Make sure to wash your hands before you eat your breakfast!',
      date: time,
      repeatType: 'time',
      repeatTime: 86400000,
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'breakfast.mp3'
    });
  }

  LocalLNotification = (time) => {
      
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      bigText:
      "It's lunch time!",
      message: "Make sure to wash your hands before you eat your lunch!",
      date: time,
      repeatType: 'time',
      repeatTime:  86400000,
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'lunch.mp3',
    });
    }

    LocalDNotification = (time) => {
    
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        bigText:
        "It's dinner time!",
        message: "Make sure to wash your hands before you eat your dinner!",
        date: time,
        repeatType: 'time',
        repeatTime: 86400000,
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'dinner.mp3',
      });
      }

  stopAllMealNotifications=async()=>{
    PushNotification.cancelAllLocalNotifications();
  }

  handleSubmit = async() => {
    this.successAlert();
    // const breakfast = this.state.breakfastHour + ':' + this.state.breakfastMinutes;
    // const lunch = this.state.lunchHour + ':' + this.state.lunchMinutes;
    // const dinner = this.state.dinnerHour + ':' + this.state.dinnerMinutes;

    var breakfast = moment({hour:this.state.breakfastHour, minute:this.state.breakfastMinutes}).toISOString();
    var lunch = moment({hour:this.state.lunchHour, minute:this.state.lunchMinutes}).toISOString();
    var dinner = moment({hour:this.state.dinnerHour, minute:this.state.dinnerMinutes}).toISOString();

    setMealTimes(breakfast,lunch,dinner);
    if(new Date()>new Date(breakfast)){
      breakfast=moment(breakfast).add(1, 'days').toISOString();
    }
    if(new Date()>new Date(lunch)){
      lunch=moment(lunch).add(1, 'days').toISOString();
    }
    if(new Date()>new Date(dinner)){
      dinner=moment(dinner).add(1, 'days').toISOString();
    } 
    //const breakfast = moment.utc(b, [moment.ISO_8601, 'HH:mm']);
    //console.log(moment({hour:this.state.breakfastHour, minute:this.state.breakfastMinutes}))
    console.log(breakfast,lunch,dinner);
   /*  const localNotificationb={
      title:"It's breakfast time!",
      body:"Make sure to wash your hands before you eat your breakfast!",
      data: { data: 'breakfast' },
    };
    const schedulingOptionsb={
      time:(new Date(breakfast)).getTime(),
      repeat:'day'
    };
    const localNotificationl={
      title:"It's lunch time!",
      body:"Make sure to wash your hands before you eat your lunch!",
      data: { data: 'lunch' },
    };
    const schedulingOptionsl={
      time:(new Date(lunch)).getTime(),
      repeat:'day',
    };
    const localNotificationd={
      title:"It's dinner time!",
      body:"Make sure to wash your hands before you eat your dinner!",
      data: { data: 'dinner' },
    };
    const schedulingOptionsd={
      time:(new Date(dinner)).getTime(),
      repeat:'day'
    }; */
    await this.stopAllMealNotifications();
    console.log("stopped")
    console.log("cl",(new Date(breakfast)).getTime(),(new Date(lunch)).getTime(),(new Date(dinner)).getTime());
    const btime=(new Date(breakfast));
    const ltime=(new Date(lunch));
    const dtime=(new Date(dinner));
    this.LocalBNotification(btime);
    this.LocalLNotification(ltime);
    this.LocalDNotification(dtime);
    console.log("added")
    /* 
    LocalLNotification((new Date(lunch)).getTime());
    LocalDNotification((new Date(dinner)).getTime()); */
    /* Notifications.scheduleLocalNotificationAsync(localNotificationb, schedulingOptionsb);
    Notifications.scheduleLocalNotificationAsync(localNotificationl, schedulingOptionsl);
    Notifications.scheduleLocalNotificationAsync(localNotificationd, schedulingOptionsd); */
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
              <Block style={styles.timepickerContainer}>
                <Block flex space="evenly">
                  <Block flex={0.2} middle style={styles.socialConnect}>
                    <Block flex={1} middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        }}
                        color="#333"
                        size={20}
                      >
                        Pick Your Meal Times
                      </Text>
                    </Block>
                  </Block>
                  <Block flex={0.1}>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      muted
                      size={14}
                    >
                      Set the time you have your main meals to get reminders to wash your hands.
                    </Text>
                  </Block>
                  <SafeAreaView style={{flex:1}}>
                  <ScrollView>
                  <Block flex={1} middle space="between">
                    <Block center flex={1}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8} style={styles.timepickerInput}>
                            <Text style={{
                              fontFamily: 'montserrat-regular',
                              textAlign: 'center'
                            }}
                            size={12}
                            >
                            Breakfast Time
                            </Text>
                            <TimePicker
                              selectedHours={this.state.breakfastHour}
                              selectedMinutes={this.state.breakfastMinutes}
                              onChange={(selectedHours,selectedMinutes) => this.handleChange('breakfastHour','breakfastMinutes',selectedHours,selectedMinutes)}
                            />
                          </Block>
                          <Block width={width * 0.8} style={styles.timepickerInput}>
                            <Text style={{
                              fontFamily: 'montserrat-regular',
                              textAlign: 'center'
                            }}
                            size={12}
                            >
                            Lunch Time
                            </Text>
                            <TimePicker
                              selectedHours={this.state.lunchHour}
                              selectedMinutes={this.state.lunchMinutes}
                              onChange={(selectedHours,selectedMinutes) => this.handleChange('lunchHour','lunchMinutes',selectedHours,selectedMinutes)}
                            />
                          </Block>
                          <Block width={width * 0.8} style={styles.timepickerInput}>
                            <Text style={{
                              fontFamily: 'montserrat-regular',
                              textAlign: 'center'
                            }}
                            size={12}
                            >
                            Dinner Time
                            </Text>
                            <TimePicker
                              selectedHours={this.state.dinnerHour}
                              selectedMinutes={this.state.dinnerMinutes}
                              onChange={(selectedHours,selectedMinutes) => this.handleChange('dinnerHour','dinnerMinutes',selectedHours,selectedMinutes)}
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
                              Done
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                  </ScrollView>
                </SafeAreaView>
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
  timepickerContainer: {
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
    marginTop: 15,
    marginBottom: 40
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  },
  timepickerInput: { 
    paddingVertical: 3, 
    paddingHorizontal: 80, 
    borderWidth: 0.5, 
    borderColor: 'grey', 
    borderRadius: 40,
    marginBottom: 3,
    justifyContent: 'center', 
  }
});

export default MealTimePicker;
