import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import GlobalStore from "./context/globalStore";

const Stack = createNativeStackNavigator();

NativeWindStyleSheet.setOutput({
  default: "native",
});
export default function App() {
  
  return (
    <GlobalStore>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </GlobalStore>
  );
}
