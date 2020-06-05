const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

exports.onUpdateUserLocation = functions.firestore.document('users/{userId}').onUpdate((snapshot, context) => {
    const uid=context.params.userId
    const afterData = snapshot.after.data()
    UpdateUserLocation(afterData,uid);
    countUpdate();
    return null;
});

function toRadians(degrees) {
	return degrees * Math.PI / 180;
}

function UpdateUserLocation(data,id) {
    console.log('data:::'+JSON.stringify(data))
    var lon=data['longitude']
    var lat=data['latitude']
    var uid=id
    var count=0
    console.log("uid"+uid)
    console.log("lat"+lat)
    console.log("lon"+lon)
    admin.firestore().collection('users').get().then(async(snapshot)=>{
        await snapshot.docs.forEach(doc=>{
            var data=doc.data()
            var latitude=data['latitude']
            var longitude=data['longitude']
            var id=doc.id
            console.log('doc'+JSON.stringify(data))
            console.log('id'+id)
            console.log('latitude'+latitude)
            console.log('longitude'+longitude)
            var distance=6371*Math.acos(Math.cos(toRadians(lat))*Math.cos(toRadians(latitude))*Math.cos(toRadians(longitude)-toRadians(lon))+Math.sin(toRadians(lat))*Math.sin(toRadians(latitude)))           
            console.log("dist "+distance)
            if(distance<=0.005 && id!==uid){
                count++
            }
        })
        console.log("crowd"+count) 
        admin.firestore().collection('crowdcount').doc(uid).update({ count:count})
        return null;
        }
           
    ).catch(err=>console.log("err"+err))
}
function countUpdate(){
    console.log("test count");
}


exports.scheduledFunctionCrontab = functions.pubsub.schedule('59 23 * * *')
  .timeZone('Asia/Colombo')
  .onRun((context) => {
  console.log('Scheduled');
  admin.firestore().collection('UserDistricts').get().then(async(snapshot) => {
      await snapshot.docs.forEach(doc =>{
          doc.update({
                Ampara: 0,
                Anuradhapura:0,
                Badulla:0,
                Batticaloa:0,
                Colombo:0,
                Galle:0,
                Gampaha:0,
                Hambantota:0,
                Jaffna:0,
                Kalutara:0,
                Kandy:0,
                Kegalle:0,
                Kilinochchi:0,
                Kurunegala:0,
                Mannar:0,
                Matale:0,
                Matara:0,
                Monaragala:0,
                Mullaittivu:0,
                Nuwara_Eliya:0,
                Polonnaruwa:0,
                Puttalam:0,
                Rathnapura:0,
                Trincomalee:0,
                Vavuniya:0
          })
      })
      return true;
  }).catch((e) => {console.log(e)})
  return null;
});