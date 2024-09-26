// DropdownDatePicker.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropdownDatePicker = ({ selectedDate, onDateChange, availableDates }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Seleccionar una fecha:</Text>
      <DropDownPicker
        open={open}
        value={selectedDate}
        items={availableDates}
        setOpen={setOpen}
        setValue={onDateChange}
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
