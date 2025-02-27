import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Home from "../screens/Home";
import SearchScreen from "../screens/SearchScreen";
import HistoryScreen from "../screens/HistoryScreen";
import AccountScreen from "../screens/AccountScreen";
import Inforpersonal from "../screens/Inforpersonal"; // ✅ Import หน้าใหม่
import Contact from "../screens/Contact"; //

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Inforpersonal" component={Inforpersonal} />
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
}

export default function Navbar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "help-circle";
          if (route.name === "Home") iconName = focused ? "home" : "home-outline";
          else if (route.name === "Search") iconName = focused ? "search" : "search-outline";
          else if (route.name === "History") iconName = focused ? "time" : "time-outline";
          else if (route.name === "Account") iconName = focused ? "person" : "person-outline";

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          elevation: 5, // Android shadow
          shadowOpacity: 0.1, // iOS shadow
        },
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Account" component={AccountStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}