// DropdownDatePicker.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';

const DropdownDatePicker = ({ selectedDate, onDateChange }) => {
  const [open, setOpen] = useState(false);
  const [dateOptions, setDateOptions] = useState([]);

  useEffect(() => {
    // Generate a list of dates for the dropdown
    const startDate = moment().subtract(1, 'month');
    const endDate = moment().add(1, 'month');
    let options = [];
    
    while (startDate <= endDate) {
      options.push({
        label: startDate.format('YYYY-MM-DD'),
        value: startDate.format('YYYY-MM-DD'),
      });
      startDate.add(1, 'day');
    }
    
    setDateOptions(options);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Date:</Text>
      <DropDownPicker
        open={open}
        value={selectedDate}
        items={dateOptions}
        setOpen={setOpen}
        setValue={onDateChange}
        setItems={setDateOptions}
        placeholder="Select a date"
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        dropDownStyle={styles.dropdown}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    zIndex: 10, // Ensure the dropdown is on top
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdownContainer: {
    height: 40,
    width: '100%', // Ensure full width
  },
  dropdown: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default DropdownDatePicker;
