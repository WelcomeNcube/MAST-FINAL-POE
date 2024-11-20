import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Filter'>;

const FilterScreen: React.FC<Props & { menuItems: MenuItem[] }> = ({ navigation, menuItems }) => {
  const [selectedCourse, setSelectedCourse] = useState<string>('All');

  // Filter items based on selected course
  const filteredItems = selectedCourse === 'All'
    ? menuItems
    : menuItems.filter(item => item.course === selectedCourse);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu by Course</Text>

      {/* The buttons for the different courses */}
      <View style={styles.buttonGroup}>
        {['All', 'Starter', 'Main', 'Dessert'].map((course) => (
          <TouchableOpacity
            key={course}
            style={[
              styles.filterButton,
              selectedCourse === course && styles.selectedButton
            ]}
            onPress={() => setSelectedCourse(course)}
          >
            <Text style={styles.buttonText}>{course}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} - {item.description} ({item.course}) - R{item.price}
          </Text>
        )}
      />

      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6fa287',  //green background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-around',
    width: '100%',
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#FF6F61',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 45,
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
    borderRadius: 10,
  },
});

export default FilterScreen;
