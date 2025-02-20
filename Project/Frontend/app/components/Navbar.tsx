
import { View, Text } from "react-native";
import { NavigationContainer } from "react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens
import Home from "../screens/Home";
import SearchScreen from "../screens/SearchScreen";
import HistoryScreen from "../screens/HistoryScreen";
import AccountScreen from "../screens/AccountScreen";

const homename = 'Home';
const Searchname = 'SearchScreen';
const Historyname = 'HistoryScreen';
const Accountname = 'AccountScreen';

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        
      </Tab.Navigator>
    </NavigationContainer>
    // <Tab.Navigator>
    //   <Tab.Screen name="Home" component={Home} />
    //   <Tab.Screen name="SearchScreen" component={SearchScreen} />
    //   <Tab.Screen name="HistoryScreen" component={HistoryScreen} />
    //   <Tab.Screen name="AccountScreen" component={AccountScreen} />
    // </Tab.Navigator>
  );
}
