import React from 'react';
import { View, Text, ImageBackground, Pressable, StyleSheet } from 'react-native';

const LandingScreen = ({ navigation }) => {
  const titleText = 'Bienvenido al placer de comer bien';  // Your title
  const radius = 370;  // Radius of the arc

  // Split the title into individual letters and map over each one to apply transformations
  const arcText = titleText.split('').map((letter, index) => {
    const angle = ((index - titleText.length / 2) * 7);  // Spread letters in an arc
    const x = radius * Math.sin((angle * Math.PI) / 180);  // X position
    const y = radius * Math.cos((angle * Math.PI) / 180);  // Y position (negated to flip)
    
    return (
      <Text
        key={index}
        style={[
          styles.letter,
          {
            position: 'absolute',
            left: 170 + x, // Adjust this value based on your container width
            top: 100 - y,  // Adjust this value based on your container height
            transform: [{ rotate: `${angle}deg` }],  // Rotate each letter
            color: rainbowColors[index % rainbowColors.length]  // Rainbow effect
          }
        ]}
      >
        {letter}
      </Text>
    );
  });

  return (
    <ImageBackground
      source={{ uri: 'https://www.nexofin.com/archivos/2018/08/platos-tipicos-de-europa-pasta-italiana.jpg' }}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        {arcText}
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={() => navigation.navigate('DishesScreen')}
      >
        <Text style={styles.buttonText}>MENU</Text>
      </Pressable>
    </ImageBackground>
  );
};

// Rainbow colors for letters
const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titleContainer: {
    position: 'relative',
    width: 350, // Adjust based on your desired arc size
    height: 200, // Adjust based on arc height
    marginBottom: 40,
    alignItems: 'center',
  },
  letter: {
    fontSize: 90,
    fontWeight: 'bold',
    fontFamily: 'serif', // Sophisticated font
    textShadowColor: 'rgba(0, 0, 0, 0.75)',  // Shadow color
    textShadowOffset: { width: 3, height: 3 },  // Shadow offset (x, y)
    textShadowRadius: 5,  // Shadow blur radius
  },
  button: {
    padding: 15,
    backgroundColor: '#FF6347',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: '#FF4500',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LandingScreen;
