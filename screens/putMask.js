import * as React from "react";
import { StyleSheet, View, ScrollView, Dimensions, Image } from "react-native";
import { Button, Text, theme } from 'galio-framework';
import { nowTheme } from '../constants/';

const images = [
    require("../assets/carousel/m0.png"),
    require("../assets/carousel/m1.png"),
    require("../assets/carousel/m2.png"),
    require("../assets/carousel/m3.png"),
    require("../assets/carousel/m4.png"),
    require("../assets/carousel/m5.png")
  ];
const DEVICE_WIDTH = Dimensions.get("screen").width;

export default class putMask extends React.Component {
  scrollRef = React.createRef();
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      timer:20
    };
    this.scrollRef = React.createRef();
  }
  componentWillUnmount() {
    clearInterval(this.clockCall);
   }

   decrementClock = () => {  
    if(this.state.timer === 0) {
        clearInterval(this.clockCall);
        this.setState({ timer: 20 });
        return
    }
    this.setState((prevstate) => ({ timer: prevstate.timer-1 }));
   };

   startTimer = () => {
    this.clockCall = setInterval(() => {
     this.decrementClock();
    }, 1000);
    
   }

  componentDidMount = () => {   
    setInterval(() => {
      this.setState(
        prev => ({
          selectedIndex:
            prev.selectedIndex === images.length - 1
              ? 0
              : prev.selectedIndex + 1
        }),
        () => {
          this.scrollRef.current.scrollTo({
            animated: true,
            x: DEVICE_WIDTH * this.state.selectedIndex,
            y: 0
          });
        }
      );
    }, 3000);
  };

  setSelectedIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    this.setState({ selectedIndex });
  };

  render() {
    const { selectedIndex } = this.state;
    return (
        <View style={{ height: "100%", width: "100%" }}>
            
             <View style={{ height: "100%", width: "100%" }}>
                 
                <ScrollView
                horizontal
                pagingEnabled
                onMomentumScrollEnd={this.setSelectedIndex}
                ref={this.scrollRef}
                >
                {images.map(image => (
                    <Image
                    resizeMode="contain"
                    style={styles.backgroundImage}
                    source={image}
                    key={image}
                    />
                ))}
                </ScrollView>
                <View style={styles.circleDiv}>
                {images.map((image, i) => (
                    <View
                    style={[
                        styles.whiteCircle,
                        { opacity: i === selectedIndex ? 0.5 : 1 }
                    ]}
                    key={image}
                    active={i === selectedIndex}
                    />
                ))}
                </View>        
            </View>
            </View>
     
      
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get("screen").width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 15, 
    marginLeft:theme.SIZES.BASE
        },
  backgroundImage: {
    height: "100%",
    width: Dimensions.get("screen").width
  },
  circleDiv: {
    position: "absolute",
    bottom: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 10
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: "#fff"
  }
});

