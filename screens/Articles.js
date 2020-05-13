import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';

import { articles, nowTheme } from '../constants/';
import { Card } from '../components/';

class Articles extends React.Component {

  renderCards = () => {
    return (
      <Block style={styles.container}>
      <Text size={16} style={styles.title}>
        Cards
      </Text>
        <Card item={ {
          title: 'Total Confirmed Cases',
          image: require("../assets/imgs/hospital.jpg"),
          description: `${this.state.local_total_cases}`
         
        }} horizontal />
        <Block flex row>
          <Card item={{
                title: 'Active Cases',
                image: require("../assets/imgs/bed.jpg"),       
                // description:
          }}
          style={{ marginRight: theme.SIZES.BASE }} />
          <Card item={
            {
              title: 'New Cases',
              image: require("../assets/imgs/ambulance.jpg"),
              description:50
            }
          } />
        </Block>
        <Card item={{
           title: 'Under investigations',
           image: require("../assets/imgs/cross.jpg"),
           description:50
        }} horizontal />
        <Card item={{
            title: 'Recovered',
            image: require("../assets/imgs/clap.jpg"),
            description:50
        }} full />
      </Block>
    );
  };

  render() {
    return (
      <Block flex>
        <ScrollView showsVerticalScrollIndicator={false}>{this.renderCards()}</ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  }
});

export default Articles;
