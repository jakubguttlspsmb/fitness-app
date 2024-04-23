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
    const [getValue, setValue] = useState(0);
    const [notes, setNotes] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
  
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
      setValue(parseFloat(getValue) + parseFloat(calories));
      setCalories("");
    };
  
    const addWeightWorkout = () => {
      setValue(parseFloat(getValue) - 200);
    };
  
    const addRunWorkout = () => {
      setValue(parseFloat(getValue) - 250);
    };
  
    const showDataInput = () => {
      setOpen(true);
    };
  
    const closeShowDataInput = () => {
      setOpen(false);
      setCalories("");
      setValue(0);
    };
  
    const removeDayValue = (note) => {
      const updateRemoveNote = notes.filter((item) => item.id !== note.id);
      console.log(updateRemoveNote);
      setNotes(updateRemoveNote);
    };
    const styles = StyleSheet.create({
      farBackView: {
        backgroundColor: "blue",
        width:deviceWidth,
        height:deviceHeight+40,
      },
      container: {
        paddingTop: 5,
        backgroundColor: "grey",
        alignItems: "center",
        justifyContent: "center",
        width: deviceHeight / 2,
      },
      headerText: {
        fontSize: 25,
        margin: 5,
        color: "white",
        backgroundColor: "blue",
        fontWeight: "bold",
      },
      basicButtons: {
        width: "70%",
        backgroundColor: "blue",
        borderRadius: 10,
        padding: 5,
        margin: 10,
      },
      submitText: {
        textAlign: "center",
        fontSize: 25,
        color: "white",
        fontWeight: "bold",
      },
      headerContainer: {
        paddingTop: 40,
        width: "100%",
      },
      ScrollViewStyle: {
        width: "100%",
        marginTop: 5,
      },
      dataValue: {
        margin: 20,
        borderColor: "blue",
        borderWidth: 5,
        borderRadius: 10,
        padding: 5,
      },
      finalCalText: {
        margin: 10,
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
      },
      dataText: {
        textAlign: "center",
        fontSize: 13,
        fontWeight: "bold",
      },
      calText: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
      },
      calclatedNumber: {
        fontSize: 50,
        color: "black",
        fontWeight: "bold",
      },
      inputText: {
        fontSize: 29,
        backgroundColor: "grey",
        padding: 5,
        borderWidth: 2,
        borderColor: "black",
      },
      workoutButtonsContainer: {
        flexDirection: "row",
      },
      workoutButtons: {
        backgroundColor: "grey",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        padding: 8,
        margin: 8,
        marginHorizontal: 25,
      },
      pressed: {
        backgroundColor: "grey",
      },
      finalCalcView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
        borderRadius: 10,
        margin: 4,
      },
    });
  
    if (open === true) {
      return (
        <View style={styles.farBackView}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Fitness App</Text>
          </View>
          <View style={styles.container}>
            <View>
              <Text style={styles.calclatedNumber}>{getValue}</Text>
            </View>
            <View>
              <TextInput
                style={styles.inputText}
                placeholder="Enter todays calories"
                value={calories}
                onChangeText={setCalories}
                keyboardType="number-pad"
              />
              <Pressable style={styles.basicButtons} onPress={submitValues}>
                <Text style={styles.submitText}>save Calories</Text>
              </Pressable>
              <View style={styles.workoutButtonsContainer}>
                <Pressable
                  style={({ pressed }) =>
                    pressed
                      ? [styles.workoutButtons, styles.pressed]
                      : styles.workoutButtons
                  }
                  onPress={addWeightWorkout}
                >
                  <View>
                    <Text>Run</Text>
                  </View>
                </Pressable>
                <Pressable
                  style={({ pressed }) =>
                    pressed
                      ? [styles.workoutButtons, styles.pressed]
                      : styles.workoutButtons
                  }
                  onPress={addRunWorkout}
                >
                  <View>
                    <Text>Run</Text>
                  </View>
                </Pressable>
              </View>
              <Pressable style={styles.basicButtons} onPress={handleAddTask}>
                <Text styles={styles.submitText}>submit todays values</Text>
              </Pressable>
              <Pressable style={styles.basicButtons} onPress={closeShowDataInput}>
                <Text styles={styles.submitText}>close</Text>
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
                  <Text style={styles.calText}>{note.getValue} calories</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          <StatusBar style="light" />
        </View>
      </>
    );
  }
  