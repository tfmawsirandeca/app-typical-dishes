// src/components/BackgroundImage.js
import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

const BackgroundImage = ({ source, style }) => (
  <Image source={source} style={[styles.image, style]} />
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 20,
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.8)', // Replaces shadow props
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default BackgroundImage;
