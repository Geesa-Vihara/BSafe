import React from "react";
import { StyleSheet, Dimensions, ScrollView} from "react-native";
import { Block, theme, Text } from "galio-framework";

import { Card, Button } from "../components";
const { width } = Dimensions.get('screen');

class Global extends React.Component {

  state = { 
   global_total_cases:0,
   global_new_cases:0,
   global_deaths:0,
   global_recovered:0,
   global_new_deaths:0,
   total_pcr_testing_count:0,
 };
  
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
        {/* <Card item={articles[0]} horizontal /> */}
        <Block flex row>
            <Card
              item={{
                title: 'Total Cases',
                image: require("../assets/imgs/ac.jpg"),
                description: `${this.state.global_total_cases}`
              }}
              //style={{ marginRight: theme.SIZES.BASE}}
            >
              </Card>
             

          </Block>
          <Block flex row>
          <Card
              item={{
                title: 'New Cases',
                image: require("../assets/imgs/tcc.jpg"),
                description: `${this.state.global_new_cases}`
              }}
              //style={{ marginRight: theme.SIZES.BASE }}
            />
          </Block>
        
          <Block flex row>
            <Card
              item={{
                title: 'Recovered',
                image: require("../assets/imgs/rec.jpg"),
                description: `${this.state.global_recovered}`
              }}
              //style={{ marginRight: theme.SIZES.BASE }}
            />
         
          </Block>

          <Block flex row>
          <Card item={{
                 title: 'Deaths',
                 image: require("../assets/imgs/dead.jpg"),
                 description: `${this.state.global_deaths}`
            }} />
         
         </Block>
         <Block flex row>
          <Card item={{
                 title: 'New Deaths',
                 image: require("../assets/imgs/new.jpg"),
                 description: `${this.state.global_new_deaths}`
            }} />
         
         </Block>
         <Block flex row>
          <Card item={{
                 title: 'Total PCR testing',
                 image: require("../assets/imgs/pcr.jpg"),
                 description: `${this.state.total_pcr_testing_count}`
            }} />
         
         </Block>
       
        </Block>
      </ScrollView>
    );
  };
 
  async newsFetch(){

   
    fetch(
      `https://hpb.health.gov.lk/api/get-current-statistical`
    )
    .then(res => res.json())
    .then(data => {

  
    //console.log("global total cases = "+data.data.global_total_cases);

   

      this.setState({
        global_total_cases: this.thousands_separators(data.data.global_total_cases),
        global_deaths : this.thousands_separators(data.data.global_deaths),
        global_new_cases : this.thousands_separators(data.data.global_new_cases),
        global_recovered : this.thousands_separators(data.data.global_recovered),
        global_new_deaths : this.thousands_separators(data.data.global_new_deaths),
        total_pcr_testing_count: this.thousands_separators(data.data.total_pcr_testing_count),
        isLoading: false,
        
        });
    });
    /* console.log("blaaaa "+this.state.local_total_cases);
    console.log("haaaa "+this.state.local_deaths); */
   }


  async componentDidMount() {     
    //console.log("app test")
  
    this.newsFetch();
  }

   thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }



  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }

 
}

const styles = StyleSheet.create({
  home: {
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'

  }
});

  




export default Global;
