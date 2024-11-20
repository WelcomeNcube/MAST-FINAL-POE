import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'AddMenu'>;

const AddMenuScreen: React.FC<Props & { addMenuItem: (item: MenuItem) => void }> = ({ navigation, addMenuItem }) => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  const handleAddItem = () => {
    if (!dishName || !description || !course || !price) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const newItem: MenuItem = {
      name: dishName,
      description,
      course,
      price,
    };

    addMenuItem(newItem);
    Alert.alert('Item added successfully!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Menu Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Course (e.g., Starter, Main, Dessert)"
        value={course}
        onChangeText={setCourse}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <Button title="Add Menu Item" onPress={handleAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#6fa287',  // Green background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default AddMenuScreen;
