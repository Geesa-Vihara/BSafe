import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Picker,
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  picker: {
    //flex: 1,
    width: 100
  },
});

const MAX_HOURS = 23;
const MAX_MINUTES = 59;

export default class TimePicker extends Component {
  static propTypes = {
    selectedHours: PropTypes.number,
    selectedMinutes: PropTypes.number,
    onChange: PropTypes.func,
    hoursUnit: PropTypes.string,
    minutesUnit: PropTypes.string,
  }

  static defaultProps = {
    selectedHours: 0,
    selectedMinutes: 0,
    onChange: null,
    hoursUnit: '',
    minutesUnit: '',
  }

  constructor(props) {
    super(props);
    const { selectedHours, selectedMinutes } = props;
    this.state = {
      selectedHours,
      selectedMinutes,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedHours: nextProps.selectedHours,
      selectedMinutes: nextProps.selectedMinutes 
    })
}

  handleChangeHours = (itemValue) => {
    const { onChange } = this.props;
    this.setState({
      selectedHours: itemValue,
    }, () => {
      const { selectedHours, selectedMinutes } = this.state;
      onChange(selectedHours, selectedMinutes);
    });
  }

  handleChangeMinutes = (itemValue) => {
    const { onChange } = this.props;
    this.setState({
      selectedMinutes: itemValue,
    }, () => {
      const { selectedHours, selectedMinutes } = this.state;
      onChange(selectedHours, selectedMinutes);
    });
  }

  render() {
    const { selectedHours, selectedMinutes } = this.state;

    const minutes = [];
    const hours = [];
    for (let i = 0; i <= MAX_HOURS ; i++) {
      hours.push(
        <Picker.Item key={i} value={i} label={`${i.toString()}`} />,
      );
    }
    for (let i = 0; i <= MAX_MINUTES ; i++) {
        minutes.push(
            <Picker.Item key={i} value={i} label={`${i.toString()}`} />,
        );
    }

    return (
      <View style={styles.container}>
        <Picker
            style={styles.picker}
            selectedValue={selectedHours}
            onValueChange={(itemValue) => this.handleChangeHours(itemValue)}
        >
            {hours}
        </Picker>
        <Picker
            style={styles.picker}
            selectedValue={selectedMinutes}
            onValueChange={(itemValue) => this.handleChangeMinutes(itemValue)}
        >
            {minutes}
        </Picker>
        {/* <Picker
          style={styles.picker}
          selectedValue={selectedHours}
          onValueChange={(itemValue) => this.handleChangeHours(itemValue)}
        >
          {this.getHoursItems()}
        </Picker> */}
        {/* <Picker
          style={styles.picker}
          selectedValue={selectedMinutes}
          onValueChange={(itemValue) => this.handleChangeMinutes(itemValue)}
        >
          {this.getMinutesImtes()}
        </Picker> */}
      </View>
    );
  }
}
