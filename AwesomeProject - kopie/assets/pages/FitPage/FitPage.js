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

export default function FoodPage() {
  var deviceWidth = Dimensions.get("window").width;
  var deviceHeight = Dimensions.get("window").height;
  const [calories, setCalories] = useState("");
  const [weight, setWeight] = useState("");
  const [time, settime] = useState("");
  const [MET, setMET] = useState("");
  const [getValue, setValue] = useState("0");
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState("none");

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
        setNotes(jsonValues2);
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
      console.log(notes);
    }
  };

  const storeData = async () => {
    if (!loading) {
      try {
        const jsonValues = await AsyncStorage.setItem(
          "dayValue",
          JSON.stringify(notes)
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
  }, [notes]);

  useEffect(() => {
    if (MET !== "" && weight !== "" && time !== "") {
      calculateCalories();
    }
  }, [MET, weight, time]);

  const handleAddTask = () => {
    const newNote = {
      id: Date.now(),
      getValue,
      data: Date().toLocaleString(),
    };
    setNotes([...notes, newNote]);
    setCalories("");
    closeShowDataInput();
  };

  const submitValues = () => {
    calculateCalories();
    setValue(parseFloat(getValue) + parseFloat(calories));
    setCalories("");
  };

  const showDataInput = () => {
    setOpen(true);
  };

  const closeShowDataInput = () => {
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

  const removeDayValue = (note) => {
    const updateRemoveNote = notes.filter((item) => item.id !== note.id);
    console.log(updateRemoveNote);
    setNotes(updateRemoveNote);
  };
  const styles = StyleSheet.create({
    farBackView: {
      backgroundColor: "orange",
      width: deviceWidth,
      height: deviceHeight,
      marginTop:20,
    },
    container: {
      paddingTop: 5,
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
      width: deviceHeight / 2,
    },
    headerText: {
      fontSize: 40,
      fontWeight: "500",
      textAlign: "center",
    },
    basicButtons: {
      borderRadius: 10,
      padding: 5,
      margin: 10,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: "#ee9b01",
    },
    submitText: {
      textAlign: "center",
      fontSize: 25,
    },
    headerContainer: {
      paddingTop: 30,
      width: "100%",
    },
    ScrollViewStyle: {
      width: "100%",
      marginTop: 5,
    },
    ScrollViewStyle2: {
      width: "100%",
alignContent:"center",
height:50,
    },
    dataValue: {
      margin: 20,
      padding: 5,
    },
    finalCalText: {
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
    calText: {
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

    finalCalcView: {
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
  });

  if (open === true) {
    return (
      <View style={styles.farBackView}>

        <View style={styles.container}>
          <View>
            <Text style={styles.calclatedNumber}>{getValue}cal</Text>
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
            <Text>Burned:{calories}cal</Text>

              <Pressable style={styles.basicButtons} onPress={backWorkout}>
                <Text style={styles.submitText}>Backworkout</Text>
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
              <Pressable style={styles.basicButtons} onPress={backWorkout}>
                <Text style={styles.submitText}>Chestworkout</Text>
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

            <Pressable style={styles.basicButtons} onPress={submitValues}>
              <Text style={styles.submitText}>submit calories</Text>
            </Pressable>
            <Pressable style={styles.basicButtons} onPress={handleAddTask}>
              <Text style={styles.submitText}>submit todays values</Text>
            </Pressable>
            <Pressable style={styles.basicButtons} onPress={closeShowDataInput}>
              <Text style={styles.submitText}>close</Text>
            </Pressable>

          </View>
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={styles.farBackView}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>fitness App</Text>
        </View>
        <View style={styles.container}>
          <Pressable style={styles.basicButtons} onPress={showDataInput}>
            <Text style={styles.submitText}>Add New Day</Text>
          </Pressable>
          <ScrollView style={styles.ScrollViewStyle}>
            {notes.map((note) => (
              <Pressable
                style={styles.dataValue}
                key={`${note.id}`}
                onPress={() => removeDayValue(note)}
              >
                <View style={styles.finalCalcView}>
                  <Text style={styles.finalCalText}>Calories of the day</Text>
                </View>
                <Text style={styles.dataText}>{note.data}</Text>
                <Text style={styles.calText}>
                  {note.getValue + 1900} calories
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
