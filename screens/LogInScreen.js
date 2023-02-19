import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React, { useContext } from "react";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { auth } from "../database/firebase";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import themeContext from "../theme/themeContext";

const LogInScreen = () => {
  const theme = useContext(themeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registrered in as: ", user.email);
      })
      .catch((error) => alert(error.message));
  };
  const handleLogIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in as: ", user.email);
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Goals", { screen: "Home" });
      }
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.allContainer}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text
          style={{
            bottom: 80,
            alignSelf: "center",
            fontSize: 25,
            fontWeight: "300",
            right: 30,
            color: theme.color,
          }}
        >
          Welcome to
        </Text>
        <Text
          style={{
            bottom: 80,
            fontSize: 25,
            fontWeight: "bold",
            alignSelf: "center",
            left: 30,
            color: theme.color,
          }}
        >
          GoalChaser
        </Text>

        <View style={styles.inputAreaContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={theme.placeholderColor}
            style={[
              styles.inputArea,
              {
                borderColor: "white",
                backgroundColor: theme.background,
                color: theme.color,
              },
            ]}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={theme.placeholderColor}
            style={[
              styles.inputArea,
              { backgroundColor: theme.background, color: theme.color },
            ]}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogIn} style={styles.button}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignUp}
            style={[
              styles.button,
              styles.buttonOutline,
              { backgroundColor: theme.background },
            ]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  allContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inputAreaContainer: {
    width: "80%",
  },

  inputArea: {
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    bottom: 30,
  },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    bottom: 15,
  },

  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonOutline: {
    marginTop: 20,
    borderColor: "#0782F9",
    borderWidth: 2,
  },

  buttonText: {
    color: "white",
    fontSize: 14,
  },

  buttonOutlineText: {
    color: "#0782F9",
    fontSize: 14,
  },
});
