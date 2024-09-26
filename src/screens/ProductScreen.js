import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image, ScrollView } from 'react-native';
import DropdownDatePicker from '../components/DropdownDatePicker'; // Import the dropdown date picker component
import useIngredients from '../hooks/useIngredients';
import { getTodayDate, getAvailableDates } from '../utils/util';

const ProductScreen = () => {
  const todayDate = getTodayDate();
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const { data, loading, error } = useIngredients(selectedDate);

  // Get available dates for the dropdown
  const availableDates = getAvailableDates();
  console.log('DATE AVAILABLES ', availableDates);

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  if (!data || !data.results || data.results.length === 0) return <Text>No data available</Text>;
  // Filter out items with ingredient name 'SAL'
  const filteredData = data.results.filter(item => item.ingredient !== 'SAL');

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.url }} style={styles.itemImage} resizeMode="contain"/>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemName}>{item.ingredient}</Text>
          <Text style={styles.itemDescription}>{item.quantity + item.measurement || 'No description available'}</Text>
          <Text style={styles.itemPrice}>{`€ ${item.price_forecasted.toFixed(2)}`}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <DropdownDatePicker
        selectedDate={selectedDate}
        onDateChange={(date) => setSelectedDate(date)}
        availableDates={availableDates} // Pass the available dates to the dropdown
      />
      <Text style={styles.selectedDate}>Fecha seleccionada: {selectedDate}</Text>
      <ScrollView style={styles.scrollView}>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.ingredient}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
        />
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');
const itemWidth = Math.floor((width - 40) / 3); // Ensure numeric width calculation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  selectedDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  scrollView: {
    flex: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: itemWidth,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: 'center',
  },
  itemImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  itemTextContainer: {
    marginTop: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: 'green',
    marginTop: 4,
  },
});

export default ProductScreen;
