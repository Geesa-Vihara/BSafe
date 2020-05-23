import Firebase, {db, provider} from '../config/firebase';
import { AsyncStorage } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

export const signUp = async function signUp(data) {
    try {
        const response = await Firebase.auth().createUserWithEmailAndPassword(data.email,data.password);
        console.log('user', response.user.uid)
        if(response.user.uid) {
            console.log('if user')
            const user = {
                email: data.email,
                name: data.name,
                longitude: 0,
                latitude: 0
            }
            const crowdcount = {
                userId:response.user.uid,
                count:0,
            }
            var breakfast = moment({hour:this.state.breakfastHour, minute:this.state.breakfastMinutes}).toISOString();
            const mealTimes = {
                breakfast : moment({hour:8, minute:30}).toISOString(),
                lunch : moment({hour:13, minute:30}).toISOString(),
                dinner : moment({hour:20, minute:0}).toISOString(),
            }
            await db.collection('users').doc(response.user.uid).set(user);
            await db.collection('crowdcount').doc(response.user.uid).set(crowdcount);
            await db.collection('mealTimes').doc(response.user.uid).set(mealTimes);
            await AsyncStorage.setItem("uid",String(response.user.uid) );    
            
            return true
        }
    } catch (error) {
        console.log('error', error);
        alert(error)
        return false
    }
}

export const login = async function login(credentials) {
    try {
        const response = await Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);      
        await AsyncStorage.setItem("uid",String(response.user.uid) );    
        return true;  

    } catch (error) {
        console.log('error', error);
        alert(error)
        return false;
    }
}

export const signInGoogle = async function signInGoogle() {
    try {
        //var provider = new Firebase.auth.GoogleAuthProvider();

        const response = await Firebase.auth().signInWithRedirect(provider);

        if(response.user.uid) {
            console.log('if user')
            const user = {
                email: data.email,
                name: data.name,
                longitude: 0,
                latitude: 0
            }

            await db.collection('users').doc(response.user.uid).update(user);
            
            return true
        }

    } catch (error) {
        console.log(error)
        alert(error);
        return false;
    }
}

export const logout = async function logout() {
    try {
        
        await Location.stopLocationUpdatesAsync('updateLoc');
        const response = await Firebase.auth().signOut()
        const uid=await AsyncStorage.getItem('uid');
        const doc=await db.collection('crowdcount').doc(uid).get();
        const data=doc.data();
        if(data.places){
            Object.keys(data.places).map(async(place,index) => {                
                const check= await TaskManager.isTaskRegisteredAsync(place); 
                    if(check){            
                        await Location.stopGeofencingAsync(place);
                    }  
                    
                       
            })  
        }     
        await Location.stopGeofencingAsync("Colombo");         
        await AsyncStorage.removeItem('uid');
        await AsyncStorage.removeItem('expoPushToken');
        return true
    } catch (error) {
        console.log('errortyty',error);
        return false
    }
}

export const getAuthState = async function getAuthState() {
    try {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
              return true
            }
            else{
              return false
            }
        })
    } catch (error) {
        console.log('error',error);
        return false
    }
}