import { StyleSheet, View, StatusBar } from "react-native";
import {
  DefaultTheme,
  NavigationContainer,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "./screens/Settings";
import HomeScreen from "./screens/HomeScreen";
import GoalToday from "./screens/GoalToday";
import GoalTmw from "./screens/GoalTmw";
import GoalYesterday from "./screens/LifeTimeGoals";
import { EventRegister } from "react-native-event-listeners";
import React, { useState, useEffect } from "react";
import theme from "./theme/theme";
import themeContext from "./theme/themeContext";
import LogInScreen from "./screens/LogInScreen";
import { CounterContext } from "./components/CounterContext";
import { CustomStatusBarContext } from "./components/CustomStatusBarContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Here is where i store and get my data so its saved when i refresh the value is the same at all times.
const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("DarkMode", jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getData = async (callback) => {
  try {
    const value = await AsyncStorage.getItem("DarkMode");
    const newMode = JSON.parse(value);
    callback(null, newMode);
    console.log(newMode);
  } catch (e) {
    callback(e, null);
  }
};

const Stack = createStackNavigator();
const STYLES = ["dark-content", "light-content"];

//This is my app component

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [TodayCounter, setTodayCounter] = useState(0);
  const [TmwCounter, setTmwCounter] = useState(0);
  const [LifeTimeCounter, setLifeTimeCounter] = useState(0);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);

  useEffect(() => {
    getData((error, value) => {
      if (error) {
        console.log(error);
        return;
      }
      if (Boolean(value)) {
        setDarkMode(value);
      }
    });
  }, []);

  useEffect(() => {
    storeData(darkMode);
  }, [darkMode]);

  useEffect(() => {
    const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
      setDarkMode(data);
    });
    return () => {
      EventRegister.removeAllListeners(listener);
    };
  }, [darkMode]);

  // This are variables and components that you see in the app (stack navigator and some context providers for passing my useStates etc).
  // I have my statusbar here and my context providers.
  return (
    <View style={styles.container}>
      <StatusBar barStyle={statusBarStyle} />
      <CustomStatusBarContext.Provider
        value={{ statusBarStyle, setStatusBarStyle }}
      >
        <themeContext.Provider
          value={darkMode === true ? theme.dark : theme.light}
        >
          <CounterContext.Provider
            value={{
              TodayCounter,
              setTodayCounter,
              TmwCounter,
              setTmwCounter,
              LifeTimeCounter,
              setLifeTimeCounter,
            }}
          >
            <NavigationContainer
              theme={darkMode === true ? DarkTheme : DefaultTheme}
            >
              <Stack.Navigator>
                <Stack.Screen
                  name="Goals"
                  component={HomeScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="GoalToday"
                  component={GoalToday}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="GoalTmw"
                  component={GoalTmw}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="GoalYesterday"
                  component={GoalYesterday}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="Settings" component={Settings} />
              </Stack.Navigator>
            </NavigationContainer>
          </CounterContext.Provider>
        </themeContext.Provider>
      </CustomStatusBarContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
