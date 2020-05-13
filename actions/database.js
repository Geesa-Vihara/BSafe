import Firebase, {db} from '../config/firebase';

export const setMealTimes = async function setMealTimes(breakfast,lunch,dinner){
    try{
        const user = await Firebase.auth().currentUser;

        const mealTimes = {
            breakfast : breakfast,
            lunch : lunch,
            dinner : dinner,
        }

        await db.collection('mealTimes').doc(user.uid).set(mealTimes);
    }
    catch(e){
        console.log('error', e);
        alert(e)
    }
}

export const getMealTimes = async function getMealTimes(){
    try {
        const user = await Firebase.auth().currentUser;

        const mealTimes = await (await db.collection('mealTimes').doc(user.uid).get()).data();

        console.log(mealTimes);

        return mealTimes;
    } 
    catch (error) {
        alert(error)
    }
}