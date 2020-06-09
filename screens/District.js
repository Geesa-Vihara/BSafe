import React from 'react';
import {
  StyleSheet,
  Dimensions,
 Image,
  TouchableWithoutFeedback,
  Keyboard,
  Picker,
  View,
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';
import { Button, Icon, Input,Card } from '../components';
import {  nowTheme } from '../constants';
import { ScrollView } from 'react-native-gesture-handler';

const images = [
  require("../assets/imgs/Ampara.png"),   //1
  require("../assets/imgs/Anuradhapura.png"),//2
  require("../assets/imgs/Badulla.png"),//3
  require("../assets/imgs/Batticaloa.png"), //4
  require("../assets/imgs/Colombo.png"), //5
  require("../assets/imgs/Galle.png"), //6
  require("../assets/imgs/Gampaha.png"), //7 
  require("../assets/imgs/Hambantota.png"),  //8
  require("../assets/imgs/Jaffna.png"), // 9
  require("../assets/imgs/Kalutara.png"), //10
  require("../assets/imgs/Kandy.png"),  //11
  require("../assets/imgs/Kegalle.png"), //12
  require("../assets/imgs/Kilinochchi.png"), //13
  require("../assets/imgs/Kurunegala.png"),  //14
  require("../assets/imgs/Mannar.png"),  //15
  require("../assets/imgs/Matara.png"),  //16
  require("../assets/imgs/Moneragala.png"), //17
  require("../assets/imgs/Mullaitive.png"), //18
  require("../assets/imgs/Nuwara-Eliya.png"),  //19
  require("../assets/imgs/Polonnaruwa.png"), //20
  require("../assets/imgs/Puttalam.png"),  //21
  require("../assets/imgs/Rathnapura.png"), //22
  require("../assets/imgs/Trincomalee.png"), //23
  require("../assets/imgs/Vavuniya.png"),  //24
  require("../assets/imgs/Matale.png"),  //25
  
];

const { width, height } = Dimensions.get('screen');
var n = 0;

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class District extends React.Component {
  state = {
   
    selectedDistrict: 4,
    cumulative_local:0,
    cumulative_foreign:0,
    total1 :0,
    total2 :0,
    total3 :0,
   
  }

  async newsFetch(id){
    fetch(
      `https://hpb.health.gov.lk/api/get-current-statistical`
    )
    .then(res => res.json())
    .then(data => {
  
        console.log("local newww" + data.data.hospital_data[id-1].cumulative_local);
        n = n+ data.data.hospital_data[id-1].cumulative_local;
  
      this.setState({
          total1 : n
        });
    });
   }


  districtHospital(item) {    

    this.setState({
      total1 : 0,
    });
    console.log(item);
     if(item == 4){
            this.newsFetch(1);
            this.newsFetch(2);
            this.newsFetch(3);
            this.newsFetch(14);
            this.newsFetch(15);
            this.newsFetch(18);
            this.newsFetch(24);
            this.newsFetch(32);
            this.newsFetch(25);
            this.newsFetch(26);
            this.newsFetch(29);
     }else if(item == 0){
      //  this.newsFetch();
     }else if(item == 1){
            this.newsFetch(5);
     }else if(item == 2){
            this.newsFetch(13);
     }else if(item == 3){
            this.newsFetch(9);
            this.newsFetch(34);
     }
     else if(item == 5){
           this.newsFetch(4);
     }
     else if(item == 6){
            this.newsFetch(10);
            this.newsFetch(11);
            this.newsFetch(23);
            this.newsFetch(35);
            this.newsFetch(36);
     }
     else if(item == 7){
           this.newsFetch(19);
     }
     else if(item == 8){
          this.newsFetch(7);
     }
     else if(item == 9){
           this.newsFetch(22);
           this.newsFetch(33);
     }
     else if(item == 10){
           this.newsFetch(8);
     }
     else if(item == 11){
          //  this.newsFetch(9);
     }
     else if(item == 12){
          // this.newsFetch(9);
     }
     else if(item == 13){
           this.newsFetch(6);
     }
     else if(item == 14){
          // this.newsFetch();
     }
     else if(item == 15){
           this.newsFetch(28);
     }
     else if(item == 16){
          this.newsFetch(20);
     }
     else if(item == 17){
          // this.newsFetch(9);
     }
     else if(item == 18){
         // this.newsFetch(9);
     }
     else if(item == 19){
          this.newsFetch(16);
          this.newsFetch(21);
     }
     else if(item == 20){
          this.newsFetch(27);
          this.newsFetch(31);
     }
     else if(item == 21){
           this.newsFetch(12);
     }
     else if(item == 22){
          // this.newsFetch(9);
     }
     else if(item == 23){
          this.newsFetch(30);
     }
     else if(item == 24){
          // this.newsFetch(9);
     }
  }
  
  setSelectedValue = (item) => { 
    this.setState({
      selectedDistrict:item,
    
    });
    n=0;
    this.districtHospital(item);
    
  }

  render() {

    const { selectedDistrict } = this.state;
    return (
      <ScrollView>  
            <Block >
              <Block>
                  <Block flex style={{justifyContent:'center'}} >                  
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      color="#333"
                      size={20}
                    >
                       Select a District
                    </Text>                 
                  </Block>
                      <Picker selectedValue = {this.state.selectedDistrict} onValueChange = {this.setSelectedValue} middle>
                                  <Picker.Item label="Colombo" value="4" />                                
                                  <Picker.Item label="Gampaha" value="6" />                                
                                  <Picker.Item label="Kalutara" value="9" />
                                  <Picker.Item label="Polonnaruwa" value="19" />
                                  <Picker.Item label="Ampara" value="0" />
                                  <Picker.Item label="Anuradhapura" value="1" />
                                  <Picker.Item label="Badulla" value="2" />
                                  <Picker.Item label="Batticaloa" value="3" />
                                  <Picker.Item label="Galle" value="5" />
                                  <Picker.Item label="Hambantota" value="7" />
                                  <Picker.Item label="Jaffna" value="8" />
                                  <Picker.Item label="Kandy" value="10" />
                                  <Picker.Item label="Kegalle" value="11" />
                                  <Picker.Item label="Kilinochchi" value="12" />
                                  <Picker.Item label="Kurunegala" value="13" />
                                  <Picker.Item label="Mannar" value="14" />
                                  <Picker.Item label="Matale" value="24" />
                                  <Picker.Item label="Matara" value="15" />
                                  <Picker.Item label="Monaragala" value="16" />
                                  <Picker.Item label="Mullaitivu" value="17" />
                                  <Picker.Item label="Nuwara Eliya" value="18" />
                                  <Picker.Item label="Puttalam" value="20" />
                                  <Picker.Item label="Ratnapura" value="21" />
                                  <Picker.Item label="Trincomalee" value="22" />
                                  <Picker.Item label="Vavuniya" value="23" />                                  
                              </Picker>                                                        
                            <Block center>
                              <Image 
                                  source={images[this.state.selectedDistrict]}
                                  resizeMode="contain"
                                  style={styles.districtImage}
                                />
                            </Block>                      
                            <Block flex center style={{  width: Dimensions.get("screen").width - theme.SIZES.BASE }}>     
                              <Block flex row >
                                  <Card
                                    item={{
                                      title: 'Cumulative local',
                                      image: require("../assets/imgs/ac.jpg"),
                                      description: `${this.state.total1}`
                                    }}
                                  >                                  
                                  </Card>
                              </Block>
                              <Block flex row>                                        
                                <Card item={{
                                    title: 'Cumulative foreign',
                                    image: require("../assets/imgs/active.jpg"),       
                                    // description: `${this.state.local_active_cases}`
                                }} />
                              </Block>
                              <Block flex row>
                                <Card
                                  item={{
                                    title: 'Treatment local',
                                    image: require("../assets/imgs/tcc.jpg"),
                                    // description: `${this.state.local_new_cases}`
                                  }}
                                  style={{ marginRight: theme.SIZES.BASE }}
                                />
                                <Card item={{
                                    title: 'Treatment foreign',
                                    image: require("../assets/imgs/ui.jpg"),
                                    // description: `${this.state.local_total_number_of_individuals_in_hospitals}`
                                }} />
                              </Block>
                              <Block flex row>
                                <Text
                                  style={{                                    
                                    textAlign: 'center'
                                  }}
                                  //color="#333"
                                  size={13}
                                  muted
                                >
                                    Hospital data from :
                                </Text>
                              </Block>       
                            </Block>                           
                          </Block>
                        </Block>
                      </ScrollView>
    );
  
}




 async componentDidMount(){
   this.districtHospital(4);
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
  districtImage:{
    //width: width,
    height: height/4, 
    //marginLeft: 40,
    //justifyContent:"center" 
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

export default District;