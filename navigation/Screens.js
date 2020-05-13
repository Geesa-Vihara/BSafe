import React from 'react';
import { Block } from "galio-framework";
import { Easing, Animated, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// screens
import Home from '../screens/Home';
import Pro from '../screens/Pro';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Components from '../screens/Components';
import Articles from '../screens/Articles';
import Onboarding from '../screens/Onboarding';
import SettingsScreen from '../screens/Settings';
// drawer
import CustomDrawerContent from "./Menu";
// header for screens
import { Header, Icon} from '../components';
import { nowTheme, tabs } from "../constants";
import Map from '../screens/Map';
import OnstartMap from '../screens/OnstartMap';
import handWash from '../screens/handWash';
import putMask from '../screens/putMask';
import MealTimePicker from '../screens/MealTimePicker'
import Visits from '../screens/Visits';
import Global from '../screens/Global';

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ComponentsStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Components" component={Components} options={{
        navigationOptions:({ navigation, scene }) => ({ 
          header: <Header title="Components" navigation={navigation} scene={scene} />
         }),
         backgroundColor: "#FFFFFF"
      }}/>
    </Stack.Navigator>
  );
}

function SettingsStack(props) {
  return (
    <Stack.Navigator initialRouteName="Settings" mode="card" headerMode="screen">
      <Stackk.Screen name="Settings" component={SettingsScreen} options={{
        header: ({ navigation, scene }) => (<Header title="Settings" navigation={navigation} scene={scene}/>),
        backgroundcolor: '#FFFFFF'
      }}/>
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator initialRouteName="Articles" mode="card" headerMode="screen">
      <Stack.Screen name="Articles" component={Articles} options={{
        header: ({ navigation, scene }) => (<Header title="Articles" navigation={navigation} scene={scene} />),
        backgroundColor: '#FFFFFF'
      }} />
    </Stack.Navigator>
  );
}

function AccountStack(props) {
  return (
    <Stack.Navigator initialRouteName="Account" mode="card" headerMode="screen">
      <Stack.Screen
        name="Account"
        component={Register}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
              transparent
              title="Create Account"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function handWashStack(props) {
  return (
    <Stack.Navigator initialRouteName="HandWash" mode="card" headerMode="none">
      <Stack.Screen
        name="How to correctly wash your hands"
        component={handWash}
        
      />
      
    </Stack.Navigator>
  );
}

function putMaskStack(props) {
  return (
    <Stack.Navigator initialRouteName="PutMask" mode="card" headerMode="none">
      <Stack.Screen
        name="How to correctly put on a mask"
        component={putMask}
        
      />
      
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Dashboard"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Dashboard"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function GlobalStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Global"
        component={Global}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Dashboard"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function MapStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Map"
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function MealTimeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="MealTime"
        component={MealTimePicker}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Meal Timepicker"
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function VisitsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Visits"
        component={Visits}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Your Places"
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function OnstartMapStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Select your home location on the map" component={OnstartMap} options={{
        navigationOptions:({ navigation, scene }) => ({ 
          header: <Header title="Select your home location on the map..." navigation={navigation} scene={scene} />
         }),
         backgroundColor: "#000000",
      }}/>
      
    </Stack.Navigator>
  );
}

function RegisterStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">

     <Stack.Screen name="Register" component={Register} options={{
        navigationOptions:({ navigation, scene }) => ({ 
          header: <Header title="Select your home location on the map..." navigation={navigation} scene={scene} />
         }),
         backgroundColor: "#000000"
      }}/>
      
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Dashboard"
    >
      <Drawer.Screen name="Dashboard" component={HomeStack} />
      <Drawer.Screen name="Global" component={GlobalStack} />
      <Drawer.Screen name="Map" component={MapStack} />
      <Drawer.Screen name="Your Places" component={VisitsStack} />       
      <Drawer.Screen name="HandWash" component={handWashStack} />      
      <Drawer.Screen name="PutMask" component={putMaskStack} />
      <Drawer.Screen name="Meal TimePicker" component={MealTimeStack} />
      {/* <Drawer.Screen name="Components" component={ComponentsStack} />
      <Drawer.Screen name="Articles" component={ArticlesStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Account" component={AccountStack} />
      <Drawer.Screen name="Settings" component={AccountStack} /> */}
       
      
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">      

      {/* Auth Navigation */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={RegisterStack} />

      {/* Nvigation without auth */}
      {/* <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true
        }}
      /> */}

      {/* <Stack.Screen name="OnstartMap" component={OnstartMapStack} /> */}
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

