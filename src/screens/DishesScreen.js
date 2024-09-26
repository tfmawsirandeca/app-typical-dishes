import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { getTodayDate } from '../utils/util';
import usePricePredictions from '../hooks/usePricePredictions';

const DishesScreen = () => {
  const date = getTodayDate();
  const { dishesWithPrices, loading, error } = usePricePredictions(date);

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const renderItem = ({ item }) => (
    <View style={styles.dishContainer}>
      <Image source={{ uri: item.url }} style={styles.dishImage} />
      <View style={styles.dishContent}>
        <Text style={styles.dishName}>{item.name}</Text>
        <Text style={styles.dishDescription}>{item.description}</Text>
        <Text style={styles.dishPrice}>{`€ ${item.price ? parseFloat(item.price).toFixed(2) : '0.00'}`}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Nuestros platos típicos</Text>
      <FlatList
        data={dishesWithPrices}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        contentContainerStyle={styles.flatListContent} // Adjust padding here
        showsVerticalScrollIndicator={false} // Disable extra scroll indicator
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Fill the full screen height
    backgroundColor: '#f5f5f5',
    padding: 16,
    overflow: 'hidden', // Ensure parent doesn't introduce scroll
  },
  flatListContent: {
    paddingBottom: 20,  // Bottom padding for extra space
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dishContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  dishImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  dishContent: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dishDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  dishPrice: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default DishesScreen;
