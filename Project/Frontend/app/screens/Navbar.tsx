import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

// Screens
import Home from "./Home";
import SearchScreen from "./SearchScreen";
import HistoryScreen from "./HistoryScreen";
import AccountScreen from "./AccountScreen";

const Homename = "Home";
const Searchname = "SearchScreen";
const Historyname = "HistoryScreen";
const Accountname = "AccountScreen";

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={Homename}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = "help-circle";

            if (route.name === Homename) {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === Searchname) {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === Historyname) {
              iconName = focused ? "time" : "time-outline";
            } else if (route.name === Accountname) {
              iconName = focused ? "person" : "person-outline";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name={Homename} component={Home} />
        <Tab.Screen name={Searchname} component={SearchScreen} />
        <Tab.Screen name={Historyname} component={HistoryScreen} />
        <Tab.Screen name={Accountname} component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
