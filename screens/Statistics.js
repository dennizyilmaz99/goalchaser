// THIS FILE IS IRRELEVENT!!

// DO NOT SEE THIS FILE AS IN THE PROJECT!!

import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import themeContext from "../theme/themeContext";
import { useContext } from "react";

const Statistics = () => {
  const theme = useContext(themeContext);
  const circleProgress = {
    activeStrokeWidth: 15,
    inActiveStrokeWidth: 15,
    inActiveStrokeOpacity: 0.2,
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.overallView}>
        <View
          style={[
            styles.topContainer,
            { backgroundColor: theme.backgroundColor },
          ]}
        >
          <Text style={[styles.header1, { color: theme.color }]}>
            Statistics
          </Text>
        </View>
        <View
          style={[
            styles.statsContainer,
            {
              backgroundColor: theme.tabColor,
              shadowColor: "white",
              shadowRadius: 5,
            },
          ]}
        >
          <View style={{ left: 30, top: 50 }}>
            <CircularProgressBase
              {...circleProgress}
              value={70}
              radius={60}
              activeStrokeColor="#33cc3e"
              inActiveStrokeColor={"#33cc3e"}
            >
              <CircularProgressBase
                {...circleProgress}
                value={60}
                radius={45}
                activeStrokeColor="#e84118"
                inActiveStrokeColor={"#e84118"}
              >
                <CircularProgressBase
                  {...circleProgress}
                  value={50}
                  radius={30}
                  activeStrokeColor="#ffb000"
                  inActiveStrokeColor={"#ffb000"}
                />
              </CircularProgressBase>
            </CircularProgressBase>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              bottom: 40,
              marginRight: 35,
              justifyContent: "space-between",
            }}
          >
            <FontAwesome
              name="circle"
              color="#33cc3e"
              size={10}
              style={{ right: 90, top: 3 }}
            />
            <Text style={{ bottom: 10, color: "#33cc3e" }}>Acomplished</Text>
            <FontAwesome
              name="circle"
              color="#e84118"
              size={10}
              style={{ right: 90, top: 3 }}
            />
            <Text style={{ right: 47, bottom: 10, color: "#e84118" }}>
              Failed
            </Text>
            <FontAwesome
              name="circle"
              color="#ffb000"
              size={10}
              style={{ right: 90, top: 3 }}
            />
            <Text style={{ bottom: 10, right: 31, color: "#ffb000" }}>
              Ongoing
            </Text>
          </View>
          {/* <ProgressChart data={data} width={screenWidth} height={160} strokeWidth={10} radius={30} chartConfig={chartConfig} hideLegend={false} style={{right: 45, top: 15}}/> */}
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  overallView: {
    margin: 20,
    justifyContent: "space-between",
  },

  statsContainer: {
    bottom: 80,
    height: "55%",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "grey",
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },

  header1: {
    fontSize: 25,
    fontWeight: "bold",
    top: 25,
  },
});

export default Statistics;
