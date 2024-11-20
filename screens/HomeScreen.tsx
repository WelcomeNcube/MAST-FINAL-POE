import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props & { menuItems: MenuItem[], setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>> }> = ({ navigation, menuItems, setMenuItems }) => {
  const [averagePrice, setAveragePrice] = useState<number | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0);

  // The function to calculate the average price
  const calculateAveragePrice = () => {
    if (menuItems.length === 0) {
      return null;
    }
    const total = menuItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    return total / menuItems.length;
  };

  // The function to calculate the total number of items
  const calculateTotalItems = () => menuItems.length;

  useEffect(() => {
    const avgPrice = calculateAveragePrice();
    setAveragePrice(avgPrice);
    setTotalItems(calculateTotalItems());
  }, [menuItems]);

  //This is the function to remove a menu item
  const removeMenuItem = (index: number) => {
    const updatedMenu = menuItems.filter((_, i) => i !== index);
    setMenuItems(updatedMenu);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef's Menu</Text>

      {menuItems.length === 0 ? (
        <Text>No items available. Please add some!</Text>
      ) : (
        <>
          {/* Menu List */}
          <FlatList
            data={menuItems}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.item}>
                  {item.name} - {item.description} ({item.course}) - R{item.price}
                </Text>
                <TouchableOpacity onPress={() => removeMenuItem(index)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>
              Total Items: {totalItems}
            </Text>
            <Text style={styles.summaryText}>
              {averagePrice !== null ? `Average Price: R${averagePrice.toFixed(2)}` : 'No items to calculate average price'}
            </Text>
          </View>
        </>
      )}
 
      <View style={styles.buttonContainer}>
        <Button title="Add New Menu" onPress={() => navigation.navigate('AddMenu')} />
        <View style={styles.spacer} />
        <Button title="Filter Menu" onPress={() => navigation.navigate('Filter')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6fa287',  // Green background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    borderRadius: 10,
  },
  item: {
    fontSize: 16,
    flex: 1,
  },
  removeButton: {
    backgroundColor: '#FF6347',
    padding: 8,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
  },
  spacer: {
    width: 10,
  },
});

export default HomeScreen;
