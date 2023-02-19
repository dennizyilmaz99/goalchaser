import { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../theme/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomStatusBarContext } from "../components/CustomStatusBarContext";
import { auth } from "../database/firebase";
import { useNavigation } from "@react-navigation/native";

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

const STYLES = ["dark-content", "light-content"];

// Here is my Settings component
const Settings = () => {
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);
  const navigation = useNavigation();
  const { statusBarStyle, setStatusBarStyle } = useContext(
    CustomStatusBarContext
  );

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  };

  //This handles the signout so it replaces the screen and so i cant go back to the HomeScreen.
  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("LogInScreen", { screen: "LogInScreen" });
    });
  };

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

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={[styles.settingsTabs, { backgroundColor: theme.tabColor }]}>
        <Text
          style={[
            {
              fontSize: 16,
              top: 17,
              color: theme.color,
              left: 10,
            },
          ]}
        >
          Dark Mode
        </Text>
        <Switch
          style={{ alignSelf: "flex-end", bottom: 7, right: 10 }}
          trackColor={{ false: "#767577", true: "#f5f5f5" }}
          thumbColor={darkMode ? "#3e3e3e" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) => {
            setDarkMode(value);
            EventRegister.emit("ChangeTheme", value);
            changeStatusBarStyle();
          }}
          value={darkMode}
        />
      </View>
      {/* <Text style={{ top: 512, alignSelf: "center", color: theme.color }}>
        Logged in as: {auth.currentUser?.email}
      </Text> */}
      {/* <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={{ fontSize: 15, color: "white" }}>Sign Out</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  settingsTabs: {
    padding: 7,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "white",
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#0782F9",
    width: "50%",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    top: 530,
  },
});
