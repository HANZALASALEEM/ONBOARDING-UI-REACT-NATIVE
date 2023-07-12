import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoarding from "./component/screen/OnBoarding";
export default function App() {
	const Stack = createStackNavigator();
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="On Boarding"
					component={OnBoarding}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
