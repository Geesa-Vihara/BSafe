import BackgroundTimer from "react-native-background-timer";
import Geolocation from '@react-native-community/geolocation';
import { AsyncStorage,NativeModules } from 'react-native';
import {db} from '../config/firebase';
import PushNotification from 'react-native-push-notification'

var _interval;
var seconds=0;
var Bluetooth = NativeModules.Bluetooth;

const geoNotification = async function geoNotification(){  
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

  const districtNotification = async function districtNotification(dist){ 
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

export const startTimer = async function startTimer() {
    stopTimer();
    _interval=BackgroundTimer.setInterval(() => {
      
        console.log("mybackgroundTimer "+seconds);
        seconds++;
          try{
            Geolocation.getCurrentPosition(async(position) => {
                const coords = position.coords;
                const lat=coords.latitude;
                const lon=coords.longitude;                
                console.log( lat,lon );
                const uid=await AsyncStorage.getItem('uid');
                console.log("uid"+uid);
                await db.collection('users').doc(uid).update({
                    "latitude":lat,
                    "longitude":lon
                })
                await db.collection('crowdcount').doc(uid).get().then(async(doc)=>{
                    var data=doc.data();
                    console.log("doc"+JSON.stringify(data));
                    
                    if(data && data['count']>0){
                    await geoNotification();      
                    
                    }else{
                    Bluetooth.discoverDevices( async(err) => 
                    {
                        console.log(err)
                    }, async(msg) => {        
                        var str=msg;
                        str=str.split("*")[1]
                        console.log("bluetooth func "+str+" "+msg);
                        if(Number(str)>0){
                        await geoNotification();
                        }        
                    }); 
                    }
                })
                                
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
                            await districtNotification(district);   
                
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
                            await districtNotification(district);   
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
                            await districtNotification(district);    
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
                            await districtNotification(district);   
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
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
                            await districtNotification(district); 
                        }
                        }
                    })
                    .catch((e) => {
                    console.log('Error in getAddressFromCoordinates', e)
                    
                    })
                
                //const res=await Location.reverseGeocodeAsync(location)
                
                
                
                
                    },
                    error => console.log(error.message),
                    { timeout: 40000 }
                    );
                
                
                }catch(error){
                alert("error"+error);
                } 
          
    
      }, 30000);
    
}

export const stopTimer = async function stopTimer() {
    BackgroundTimer.clearInterval(_interval);
}