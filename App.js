import React from 'react';
import { Image, AsyncStorage,Platform } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import * as TaskManager from 'expo-task-manager';

import Screens from './navigation/Screens';
import { Images, articles, nowTheme } from './constants';

import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }
//import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
import {InteractionManager} from 'react-native';
// cache app images


import { scan } from "./actions/bluetoothle";

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
// Work around issue `Setting a timer for long time`
// see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = '_lt_' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === 'string' && id.startsWith('_lt_')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}

const assetImages = [
  Images.Onboarding,
  Images.Logo,
  Images.Pro,
  Images.NowLogo,
  Images.iOSLogo,
  Images.androidLogo,
  Images.ProfilePicture,
  Images.CreativeTimLogo,
  Images.InvisionLogo,
  Images.RegisterBackground,
  Images.ProfileBackground
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {

  state = {
    isLoadingComplete: false,
    fontLoaded: false,
    //expoPushToken: '',
    //notification: {}, 
  };

  allPermissions = async () => {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS,Permissions.LOCATION);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS,Permissions.LOCATION);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Please enable the required permissions!');
        return;
      }
     /*  token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      this.setState({ expoPushToken: token });
      await AsyncStorage.setItem("expoPushToken",token); */
    
  
  /*   if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    } */
  };

 
  
  async componentDidMount() {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }        
    console.log("app")
    scan()
    await Font.loadAsync({ 'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'), 'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf') } ); this.setState({fontLoaded: true, isLoadingComplete: true});
    this.allPermissions();
    await SplashScreen.hideAsync();
  
  }

  render() {
    //to disable warnings
    console.disableYellowBox = true;
    
    if (!this.state.isLoadingComplete) {
      return null;
    } else {
      return (
        <NavigationContainer>
          <GalioProvider theme={nowTheme}>
            <Block flex>
              <Screens />
            </Block>
          </GalioProvider>
        </NavigationContainer>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    if (this.state.fontLoaded) {
      this.setState({ isLoadingComplete: true });
    }
  };
}
