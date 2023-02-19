import { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CounterContext } from "../components/CounterContext";
import { useNavigation } from "@react-navigation/native";

// Here is where i store and get my data so its saved when i refresh the value is the same at all times.
const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("listItemsToday", jsonValue);
  } catch (e) {
    console.log(e);
  }
};
const getData = async (callback) => {
  try {
    const value = await AsyncStorage.getItem("listItemsToday");
    const newList = JSON.parse(value);
    callback(null, newList);
    console.log(newList);
  } catch (e) {
    callback(e, null);
  }
};

const GoalToday = () => {
  const theme = useContext(themeContext);
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [inputError, setInputError] = useState(null);
  const { TodayCounter, setTodayCounter } = useContext(CounterContext);
  const navigation = useNavigation();
  const newTodoCounter = () => {
    if (setTodoList) {
      setTodayCounter(TodayCounter + 1);
      return;
    }
  };
  const removeSubmit = (index) => {
    const newItems = todoList.filter((item, i) => i !== index);
    setTodoList(newItems);
    setTodayCounter(TodayCounter - 1);
    return;
  };

  // Here is where i check the textinput if its anything in it. If not then it shows a red border and if it is something in it then it continues to submit as it should.
  const checkTextInput = () => {
    if (!newTodo.trim()) {
      setInputError("g");
      return;
    } else {
      handleSubmit();
      newTodoCounter();
    }
  };
  // Here is where my "ADD GOAL" goes through to handle the submit.
  const handleSubmit = () => {
    setTodoList([...todoList, { text: newTodo, completed: false }]);
    setNewTodo("");
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
            Goals for today
          </Text>
          <Text style={{ alignSelf: "flex-end" }}></Text>
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
              style={[{ height: 100, width: 310, color: theme.color }]}
              placeholder="I'm going to yoga today."
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
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "grey",
    shadowOpacity: 0,
    shadowRadius: 5,
  },
  listItemText: {
    width: "85%",
  },

  modalInfoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    width: "100%",
  },
});

export default GoalToday;
