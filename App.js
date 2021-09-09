import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FirstScreenNavigator, SecondScreenNavigator } from './routes/CustomNavigation'

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            // { Picking the correct icon according to the corresponding page }
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Games') {
                iconName = 'game-controller';
              } else if (route.name === 'Teams') {
                iconName = 'people';
              }
              //Returning an icon component to show on the bottom nav-bar
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            //Design Params
            tabBarActiveTintColor: '#202020',
            tabBarInactiveTintColor: '#808080',
          })}
        >
          {/* Picking The Two Screens From CustomNavigator */}
          <Tab.Screen name="Teams" options={{ headerShown: false }} component={FirstScreenNavigator} />
          <Tab.Screen name="Games" options={{ headerShown: false }} component={SecondScreenNavigator} />

        </Tab.Navigator>

      </NavigationContainer>

    );
  }
}