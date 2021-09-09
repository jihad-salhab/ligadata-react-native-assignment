import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TeamsScreen from "../pages/teams_page";
import PlayersScreen from "../pages/players_page";
import GamesScreen from "../pages/games_page";

// This File Defines the navigation strategy as shown
const Stack = createStackNavigator();

//First Screen On the first tab of the UI
//Which Shows Teams and Can Also Navigate to another screen that shows 
//Players of the selected team
const FirstScreenNavigator = () => {
  return (
    <Stack.Navigator >
       <Stack.Screen
        name="Teams Page"
        component={TeamsScreen}
      />
       <Stack.Screen
        name="Players Page"
        component={PlayersScreen}
      />
    </Stack.Navigator>
  );
}

//Exporting first screen
export {FirstScreenNavigator};

//Second screen on the bottom navigation bar
//This screen shows all Games in a list
const SecondScreenNavigator = () => {
    return (
      <Stack.Navigator >
          <Stack.Screen
            name="Games Page"
            component={GamesScreen}
        />
      </Stack.Navigator>
    );
  }
  
//Exporting Second screen
export {SecondScreenNavigator};