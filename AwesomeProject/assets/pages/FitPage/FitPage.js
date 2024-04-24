import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function FoodPage() {
  var deviceWidth = Dimensions.get("window").width;
  var deviceHeight = Dimensions.get("window").height;
  const [calories, setCalories] = useState("");
  const [weight, setWeight] = useState("");
  const [time, settime] = useState("");
  const [MET, setMET] = useState("");
  const [getValue, setValue] = useState("0");
  const [values, setValues] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState("none");
  const [visible2, setVisible2] = useState("none");
  const [visible3, setVisible3] = useState("none");
  const [visible4, setVisible4] = useState("none");
  const [visible5, setVisible5] = useState("none");
  const [infoOpen, setinfoOpen] = useState(false);

  const handletimeChange = (time) => {
    settime(time);
  };
  const handleWeightChange = (weight) => {
    setWeight(weight);
  };

  const calculateCalories = () => {
    setCalories(MET * weight * (time / 60));
  };

  const getData = async () => {
    try {
      const jsonValues = await AsyncStorage.getItem("dayValue");
      const jsonValues2 = JSON.parse(jsonValues);
      if (jsonValues2 !== null) {
        setValues(jsonValues2);
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
      console.log(values);
    }
  };

  const storeData = async () => {
    if (!loading) {
      try {
        const jsonValues = await AsyncStorage.setItem(
          "dayValue",
          JSON.stringify(values)
        );
        return jsonValues;
      } catch (e) {
        alert(e);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData();
  }, [values]);

  useEffect(() => {
    if (MET !== "" && weight !== "" && time !== "") {
      calculateCalories();
    }
  }, [MET, weight, time]);

  const saveValues = () => {
    const newNote = {
      id: Date.now(),
      getValue,
      data: Date().toLocaleString(),
    };
    setValues([...values, newNote]);
    setCalories("");
    closeDataInput();
  };

  const submitValues = () => {
    calculateCalories();
    setValue(parseFloat(getValue) + parseFloat(calories));
    setCalories("");
  };

  const showDataInput = () => {
    setOpen(true);
  };

  const closeDataInput = () => {
    setOpen(false);
    setCalories("");
    setValue(0);
  };
  const backWorkout = () => {
    if (visible === "none") {
      setVisible("flex");
    } else {
      setVisible("none");
    }
  };
  const chestWorkout = () => {
    if (visible2 === "none") {
      setVisible2("flex");
    } else {
      setVisible2("none");
    }
  };
  const cardio = () => {
    if (visible3 === "none") {
      setVisible3("flex");
    } else {
      setVisible3("none");
    }
  };
  const legWorkout = () => {
    if (visible4 === "none") {
      setVisible4("flex");
    } else {
      setVisible4("none");
    }
  };
  const armWorkout = () => {
    if (visible5 === "none") {
      setVisible5("flex");
    } else {
      setVisible5("none");
    }
  };
  function toInfo() {
    setinfoOpen(true);
  }
  function returnToMain() {
    setinfoOpen(false);
  }

  const removeDayValue = (note) => {
    const updateRemoveNote = values.filter((item) => item.id !== note.id);
    console.log(updateRemoveNote);
    setValues(updateRemoveNote);
  };
  const styles = StyleSheet.create({
    farBackView: {
      backgroundColor: "orange",
      width: deviceWidth,
      height: deviceHeight,
    },
    container: {
      paddingTop: 5,
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
      width: deviceHeight / 2,
    },
    head: {
      fontSize: 40,
      fontWeight: "500",
      textAlign: "center",
    },
    buttons: {
      borderRadius: 10,
      padding: 5,
      margin: 10,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: "#ee9b01",
    },
    textB: {
      textAlign: "center",
      fontSize: 25,
    },
    headContainer: {
      paddingTop: 30,
      width: "100%",
    },
    ScrollViewStyle: {
      width: "100%",
      marginTop: 5,
    },
    ScrollViewStyle2: {
      width: "100%",
      alignContent: "center",
      height: 50,
    },
    data: {
      margin: 20,
      padding: 5,
    },
    finalText: {
      margin: 10,
      textAlign: "center",
      fontSize: 25,
      fontWeight: "500",
      color: "white",
    },
    dataText: {
      textAlign: "center",
      fontSize: 13,
      fontWeight: "500",
    },
    text: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "500",
    },
    calclatedNumber: {
      fontSize: 50,
      color: "black",
      fontWeight: "500",
    },
    inputText: {
      fontSize: 29,
      padding: 5,
      borderWidth: 2,
      borderColor: "black",
      borderRadius: 3,
    },
    backWorkoutButtonsContainer: {
      flexDirection: "row",
      display: visible,
      width: deviceWidth / 1.55,
    },
    chestWorkoutButtonsContainer: {
      flexDirection: "row",
      display: visible2,
      width: deviceWidth / 1.55,
    },
    cardioButtonsContainer: {
      flexDirection: "row",
      display: visible3,
      width: deviceWidth / 1.55,
    },
    legWorkoutButtonsContainer: {
      flexDirection: "row",
      display: visible4,
      width: deviceWidth / 1.55,
    },
    armWorkoutButtonsContainer: {
      flexDirection: "row",
      display: visible5,
      width: deviceWidth / 1.55,
    },

    workoutButtons: {
      backgroundColor: "grey",
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      padding: 8,
      margin: 8,
      marginHorizontal: "3%",
      fontSize: 1,
    },

    finalView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "black",
      borderRadius: 10,
      margin: 4,
    },
    workouts: {
      justifyContent: "center",
      fontWeight: "500",
    },
    icons: {
      alignItems: "center",
      paddingBottom: 5,
      paddingTop: 5,
    },
  });

  if (open === true) {
    return (
      <View style={styles.farBackView}>
        <View style={styles.container}>
          <View>
            <Text style={styles.calclatedNumber}>
              {Math.round(getValue)}cal
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.inputText}
              placeholder="Enter exercise time"
              value={time}
              onChangeText={handletimeChange}
              keyboardType="number-pad"
            />
            <TextInput
              style={styles.inputText}
              placeholder="Enter your weigth"
              value={weight}
              onChangeText={handleWeightChange}
              keyboardType="number-pad"
            />
            <Text>Burned:{Math.round(calories)}cal</Text>

            <Pressable style={styles.buttons} onPress={backWorkout}>
              <Text style={styles.textB}>Backworkout</Text>
            </Pressable>
            <View style={styles.backWorkoutButtonsContainer}>
              <Pressable
                style={styles.workoutButtons}
                onPress={() => setMET(6.75)}
              >
                <View>
                  <Text>Deadlift</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.workoutButtons}
                onPress={() => setMET(9.75)}
              >
                <View>
                  <Text>Lat pulldown</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.workoutButtons}
                onPress={() => setMET(7)}
              >
                <View>
                  <Text>Rows</Text>
                </View>
              </Pressable>
            </View>
            <Pressable style={styles.buttons} onPress={chestWorkout}>
              <Text style={styles.textB}>Chestworkout</Text>
            </Pressable>
            <View style={styles.chestWorkoutButtonsContainer}>
              <Pressable
                style={styles.workoutButtons}
                onPress={() => setMET(4)}
              >
                <View>
                  <Text>Benchpress</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.workoutButtons}
                onPress={() => setMET(5.5)}
              >
                <View>
                  <Text>Dips</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.workoutButtons}
                onPress={() => setMET(4.5)}
              >
                <View>
                  <Text>incline</Text>
                </View>
              </Pressable>
            </View>
            <Pressable style={styles.buttons} onPress={cardio}>
              <Text style={styles.textB}>Cardio</Text>
            </Pressable>
            <View style={styles.cardioButtonsContainer}>
              <Pressable
                style={styles.workoutButtons}
                onPress={() => setMET(9.5)}
              >
                <View>
                  <Text>Running</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.workoutButtons}
                onPress={() => setMET(3.75)}
              >
                <View>
                  <Text>Walking</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.workoutButtons}
                onPress={() => setMET(6)}
              >
                <View>
                  <Text>Cycling</Text>
                </View>
              </Pressable>
            </View>
            <Pressable style={styles.buttons} onPress={legWorkout}>
              <Text style={styles.textB}>LegWorkout</Text>
            </Pressable>
            <View style={styles.legWorkoutButtonsContainer}>
              <Pressable
                style={styles.workoutButtons}
                onPress={() => setMET(5)}
              >
                <View>
                  <Text>Squat</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.workoutButtons}
                onPress={() => setMET(5)}
              >
                <View>
                  <Text>Leg Press</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.workoutButtons}
                onPress={() => setMET(3.5)}
              >
                <View>
                  <Text>Leg Extensions</Text>
                </View>
              </Pressable>
            </View>

            <Pressable style={styles.buttons} onPress={armWorkout}>
              <Text style={styles.textB}>ArmWorkout</Text>
            </Pressable>
            <View style={styles.armWorkoutButtonsContainer}>
              <Pressable
                style={styles.workoutButtons}
                onPress={() => setMET(3.5)}
              >
                <View>
                  <Text>Bicep Curls</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.workoutButtons}
                onPress={() => setMET(3.5)}
              >
                <View>
                  <Text>Tricep Extensions</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.workoutButtons}
                onPress={() => setMET(4.5)}
              >
                <View>
                  <Text>Push-Ups</Text>
                </View>
              </Pressable>
            </View>
            

            <Pressable style={styles.buttons} onPress={submitValues}>
              <Text style={styles.textB}>submit calories</Text>
            </Pressable>
            <Pressable style={styles.buttons} onPress={saveValues}>
              <Text style={styles.textB}>submit todays values</Text>
            </Pressable>
            <Pressable style={styles.buttons} onPress={closeDataInput}>
              <Text style={styles.textB}>close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }
  if (infoOpen === true) {
    return (
      <>
        <StatusBar hidden></StatusBar>
        <View style={styles.container}>
          <Text style={styles.text}>Info</Text>
          <View style={styles.icons}>
            <Pressable onPress={returnToMain}>
              <FontAwesome name="search" size={35} color="black" />
            </Pressable>
          </View>
          <Text>Food database from EDAMAM</Text>
          <Text>Icons from AntDesign and FontAwesome</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <View style={styles.farBackView}>
        <View style={styles.headContainer}>
          <Text style={styles.head}>Fit </Text>
          <View style={styles.icons}>
            <Pressable onPress={toInfo}>
              <AntDesign name="infocirlce" size={20} color="black" />
            </Pressable>
          </View>
        </View>
        <View style={styles.container}>
          <Pressable style={styles.buttons} onPress={showDataInput}>
            <Text style={styles.textB}>Add New Day</Text>
          </Pressable>
          <ScrollView style={styles.ScrollViewStyle}>
            {values.map((note) => (
              <Pressable
                style={styles.data}
                key={`${note.id}`}
                onLongPress={() => removeDayValue(note)}
              >
                <View style={styles.finalView}>
                  <Text style={styles.finalText}>Calories of the day</Text>
                </View>
                <Text style={styles.dataText}>{note.data}</Text>
                <Text style={styles.text}>
                  {Math.round(note.getValue + 1900)}calories
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <StatusBar style="light" />
      </View>
    </>
  );
}
