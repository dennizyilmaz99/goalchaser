import { useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Settings from "./Settings";
import GoalToday from "./GoalToday";
import GoalTmw from "./GoalTmw";
import GoalYesterday from "./LifeTimeGoals";
import Ionicons from "react-native-vector-icons/Ionicons";
import themeContext from "../theme/themeContext";
import { useContext } from "react";
import { CounterContext } from "../components/CounterContext";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//This is my AsyncStorage for storing the Counter data
const storeData = async (todayValue, tmwValue, lifeTimeValue) => {
  try {
    const jsonValueToday = JSON.stringify(todayValue);
    const jsonValueTmw = JSON.stringify(tmwValue);
    const jsonValueLife = JSON.stringify(lifeTimeValue);
    await AsyncStorage.setItem("CounterToday", jsonValueToday);
    await AsyncStorage.setItem("CounterTmw", jsonValueTmw);
    await AsyncStorage.setItem("CounterLife", jsonValueLife);
  } catch (e) {
    console.log(e);
  }
};
const getData = async (callback) => {
  try {
    const getToday = await AsyncStorage.getItem("CounterToday");
    const getTmw = await AsyncStorage.getItem("CounterTmw");
    const getLife = await AsyncStorage.getItem("CounterLife");
    const CounterToday = JSON.parse(getToday);
    const CounterTmw = JSON.parse(getTmw);
    const CounterLife = JSON.parse(getLife);
    callback(null, CounterToday, CounterTmw, CounterLife);
    console.log(CounterToday, CounterTmw, CounterLife);
  } catch (e) {
    callback(e, null);
  }
};

//This is my Main Component
const HomeScreen = () => {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const { TodayCounter, setTodayCounter } = useContext(CounterContext);
  const { TmwCounter, setTmwCounter } = useContext(CounterContext);
  const { LifeTimeCounter, setLifeTimeCounter } = useContext(CounterContext);
  useEffect(() => {
    getData((error, todayValue, tmwValue, lifeTimeValue) => {
      if (error) {
        console.log(error);
        return;
      }
      if (Boolean(todayValue)) {
        setTodayCounter(todayValue);
      }
      if (Boolean(tmwValue)) {
        setTmwCounter(tmwValue);
      }
      if (Boolean(lifeTimeValue)) {
        setLifeTimeCounter(lifeTimeValue);
      }
    });
  }, []);

  useEffect(() => {
    storeData(TodayCounter, TmwCounter, LifeTimeCounter);
  }, [TodayCounter, TmwCounter, LifeTimeCounter]);

  //This is my return View (what you see on the screen)
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.overallView}>
        <View style={styles.topContainer}>
          <Text style={[styles.header1, { color: theme.color }]}>
            GoalChaser
          </Text>
          <TouchableOpacity
            style={{ width: 25, height: 25, alignSelf: "flex-end" }}
            onPress={() => navigation.navigate(Settings)}
          >
            <Ionicons
              name="settings-outline"
              style={[{ fontSize: 25, color: theme.color }]}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.tabs,
            {
              backgroundColor: theme.tabColor,
              shadowColor: "white",
              shadowRadius: 8,
            },
          ]}
          onPress={() => navigation.navigate(GoalToday)}
        >
          <View>
            <Text style={[styles.tabHeader, { color: theme.color }]}>
              Goals today
            </Text>
            <Text
              style={[
                {
                  alignSelf: "flex-end",
                  top: 50,
                  fontSize: 25,
                  fontWeight: "bold",
                  color: theme.color,
                  right: 10,
                },
              ]}
            >
              {TodayCounter}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabs,
            {
              backgroundColor: theme.tabColor,
              shadowColor: "white",
              shadowRadius: 8,
            },
          ]}
          onPress={() => navigation.navigate(GoalTmw)}
        >
          <View>
            <Text style={[styles.tabHeader, { color: theme.color }]}>
              Goals tomorrow
            </Text>
            <Text
              style={[
                {
                  alignSelf: "flex-end",
                  top: 50,
                  fontSize: 25,
                  fontWeight: "bold",
                  color: theme.color,
                  right: 10,
                },
              ]}
            >
              {TmwCounter}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabs,
            {
              backgroundColor: theme.tabColor,
              shadowColor: "white",
              shadowRadius: 8,
            },
          ]}
          onPress={() => navigation.navigate(GoalYesterday)}
        >
          <View>
            <Text style={[styles.tabHeader, { color: theme.color }]}>
              Lifetime goals
            </Text>
            <Text
              style={[
                {
                  alignSelf: "flex-end",
                  top: 50,
                  fontSize: 25,
                  fontWeight: "bold",
                  color: theme.color,
                  right: 10,
                },
              ]}
            >
              {LifeTimeCounter}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

//This is my StyleSheet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  overallView: {
    margin: 20,
    justifyContent: "space-between",
  },

  tabHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },

  header1: {
    fontSize: 25,
    fontWeight: "bold",
    top: 25,
  },

  tabs: {
    padding: 20,
    height: "25%",
    width: "100%",
    top: 10,
    backgroundColor: "white",
    borderWidth: 0,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "grey",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});

export default HomeScreen;
