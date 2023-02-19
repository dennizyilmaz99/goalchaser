import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Keyboard } from "react-native";
import themeContext from "../theme/themeContext";
import { useContext } from "react";
import theme from "../theme/theme";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CounterContext } from "../components/CounterContext";
import { useNavigation } from "@react-navigation/native";

// Here is where i store and get my data so its saved when i refresh the value is the same at all times.
const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("listItemsTmw", jsonValue);
  } catch (e) {
    console.log(e);
  }
};
const getData = async (callback) => {
  try {
    const value = await AsyncStorage.getItem("listItemsTmw");
    const newList = JSON.parse(value);
    callback(null, newList);
    console.log(newList);
  } catch (e) {
    callback(e, null);
  }
};

const GoalTmw = () => {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [inputError, setInputError] = useState(null);
  const { TmwCounter, setTmwCounter } = useContext(CounterContext);
  const handleSubmit = () => {
    setTodoList([...todoList, { text: newTodo, completed: false }]);
    setNewTodo("");
  };
  // Here is where the counter get its value from. Based on how many goals you have written it updates the Counter in the HomeScreen through my CounterContext.
  // I have this in all my screens where you can write down goals.
  const newTodoCounter = () => {
    if (setTodoList) {
      setTmwCounter(TmwCounter + 1);
      return;
    }
  };
  const removeSubmit = (index) => {
    const newItems = todoList.filter((item, i) => i !== index);
    setTodoList(newItems);
    setTmwCounter(TmwCounter - 1);
    return;
  };
  const checkTextInput = () => {
    if (!newTodo.trim()) {
      setInputError("g");
      return;
    } else {
      handleSubmit();
      newTodoCounter();
      return;
    }
  };
  useEffect(() => {
    getData((error, value) => {
      if (error) {
        console.log(error);
        return;
      }
      if (Boolean(value)) {
        setTodoList(value);
      }
    });
  }, []);
  useEffect(() => {
    storeData(todoList);
  }, [todoList]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.overallView}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={{ height: 30, width: 20 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="chevron-back"
              style={{ fontSize: 30, right: 8, color: theme.color }}
            />
          </TouchableOpacity>
          <Text style={[styles.header1, { color: theme.color }]}>
            Goals for tomorrow
          </Text>
        </View>
        <View style={{ justifyContent: "space-between" }}>
          <View
            style={[
              Boolean(inputError)
                ? {
                    ...styles.writeGoalContainer,
                    ...styles.writeGoalContainerError,
                  }
                : styles.writeGoalContainer,
              { backgroundColor: theme.tabColor, shadowColor: "white" },
            ]}
          >
            <TextInput
              value={newTodo}
              onChangeText={(newValue) => {
                setNewTodo(newValue);
                setInputError("");
              }}
              style={[{ height: 100, width: 360, color: theme.color }]}
              placeholder="I'm going to the gym today."
              placeholderTextColor={theme.placeholderColor}
              multiline={true}
              keyboardType="default"
              onSubmitEditing={Keyboard.dismiss}
              returnKeyType="done"
              blurOnSubmit={true}
            ></TextInput>
          </View>
        </View>
        <View style={{ top: 200 }}>
          <TouchableOpacity
            style={{ height: 30, width: 61, alignSelf: "center", top: -30 }}
            onPress={checkTextInput}
          >
            <Ionicons
              name="add-circle-outline"
              style={[
                { fontSize: 32, alignSelf: "center" },
                { color: theme.color },
              ]}
            />
            <Text
              style={[{ top: 5, fontWeight: "bold" }, { color: theme.color }]}
            >
              Add Goal
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
        >
          {todoList.map((todo, index) => (
            <View
              key={index}
              style={[
                styles.listItem,
                { backgroundColor: theme.tabColor, shadowColor: "white" },
              ]}
            >
              <Text
                style={[
                  styles.listItemText,
                  {
                    textDecorationLine: todo.completed
                      ? "line-through"
                      : "none",
                  },
                  { color: theme.color },
                ]}
              >
                {todo.text}
              </Text>
              <View>
                <TouchableOpacity
                  style={styles.checkFill}
                  onPress={() => removeSubmit(index)}
                >
                  <Ionicons
                    name="trash-outline"
                    style={[{ fontSize: 24, color: theme.color }]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flex: 1,
    backgroundColor: "#fff",
  },

  overallView: {
    margin: 20,
  },

  header1: {
    fontSize: 25,
    fontWeight: "bold",
    top: 25,
  },

  writeGoalContainer: {
    padding: 20,
    position: "absolute",
    top: 40,
    height: 100,
    width: 350,
    backgroundColor: "white",
    borderRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "grey",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderColor: "white",
    borderWidth: 1,
  },

  writeGoalContainerError: {
    borderWidth: 1,
    borderColor: "red",
  },

  listContainer: {
    top: 210,
    padding: 0,
    height: "60%",
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 20,
    backgroundColor: { backgroundColor: theme.color },
    marginVertical: 20,
    margin: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "grey",
    shadowOpacity: 0,
    shadowRadius: 15,
    width: "100%",
  },
  listItemText: {
    flex: 1,
  },
});

export default GoalTmw;
