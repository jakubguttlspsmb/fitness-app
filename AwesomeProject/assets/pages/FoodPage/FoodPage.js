import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableHighlight,
  Pressable,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function FoodPage() {
  const [data, setData] = useState("");
  const [dataPerServing, setDataPerServing] = useState("");
  const [food, setFood] = useState("");
  const { width, height } = Dimensions.get("window");
  const [flexdirection, setFlexdirection] = useState("row");
  const [visible, setVisible] = useState("none");
  const [calories, setCalories] = useState(0);
  const [fats, setFats] = useState(0);
  const [proteins, setProteins] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fibers, setFibers] = useState(0);
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFoodInputChange = (text) => {
    setFood(text);
  };

  function addingData() {
    if (data && data.nutrients) {
      setCalories(calories + data.nutrients.ENERC_KCAL);
      setFats(fats + data.nutrients.FAT);
      setProteins(proteins + data.nutrients.PROCNT);
      setCarbs(carbs + data.nutrients.CHOCDF);
      setFibers(fibers + data.nutrients.FIBTG);
    }
  }
  function removeData() {
    if (data && data.nutrients) {
      if (calories >= data.nutrients.ENERC_KCAL) {
        setCalories(calories - data.nutrients.ENERC_KCAL);
      }
      if (fats >= data.nutrients.FAT) {
        setFats(fats - data.nutrients.FAT);
      }
      if (proteins >= data.nutrients.PROCNT) {
        setProteins(proteins - data.nutrients.PROCNT);
      }
      if (carbs >= data.nutrients.CHOCDF) {
        setCarbs(carbs - data.nutrients.CHOCDF);
      }
      if (fibers >= data.nutrients.FIBTG) {
        setFibers(fibers - data.nutrients.FIBTG);
      }
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://api.edamam.com/api/food-database/v2/parser?app_id=181e5eb4&app_key=0633a8e3dc27c8ba43caf5b67709cd32&ingr=${food}&nutrition-type=cooking&181e5eb4=0633a8e3dc27c8ba43caf5b67709cd32`
      );
      const jsonData = await response.json();
      setDataPerServing(jsonData);
      setData(jsonData.parsed[0].food);
      setVisible("inline");
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    }
  };

  const saveValues = () => {
    const newNote = {
      id: Date.now(),
      calories,
      proteins,
      fats,
      fibers,
      carbs,
      data: Date().toLocaleString(),
    };
    setValues([...values, newNote]);
    setCalories(0);
    setProteins(0);
    setFats(0);
    setFibers(0);
    setCarbs(0);
  };
  const getData = async () => {
    try {
      const jsonValues = await AsyncStorage.getItem("dayFoodValue");
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
          "dayFoodValue",
          JSON.stringify(values)
        );
        return jsonValues;
      } catch (e) {
        alert(e);
      }
    }
  };
  const removeDayValue = (note) => {
    const updateRemoveNote = values.filter((item) => item.id !== note.id);
    console.log(updateRemoveNote);
    setValues(updateRemoveNote);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData();
  }, [values]);

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      width: width,
      height: height,
      backgroundColor: "yellow",
    },
    ScrollViewStyle: {
      width: "100%",
      marginTop: 5,
    },
    input: {
      marginTop: height * 0.05,
      backgroundColor: "white",
      width: width - 50,
      paddingTop: 8,
      paddingBottom: 8,
      fontWeight: "bold",

      paddingLeft: 15,
    },
    input2: {
      backgroundColor: "green",
    },
    textLook: {
      color: "black",
      fontWeight: "bold",
    },
    button: {
      backgroundColor: "white",
      width: width - 50,
      height: 35,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      marginTop: 5,
    },
    fetchedFood: {
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: flexdirection,
      width: width,
      backgroundColor: "yellow",
      display: visible,
      height: "30%",
      marginTop: "5%",
      fontWeight: "bold",
      borderWidth: 1,
      borderColor: "black",
    },
    Button2: {
      height: "90%",
      width: "30%",
      justifyContent: "center",
      alignItems: "center",
    },
    olderDatastyle: { height: "40%" },
    fetchedText: { color: "black", fontWeight: "bold" },
    scrollContent: { alignItems: "center" },
    head: { marginTop: "10%", fontSize: 25, fontWeight: "bold" },
    todayDataContainer: { marginBottom: "5%", marginTop: "5%" },
    text: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
    },
    finalView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "black",
      borderRadius: 10,
      margin: 4,
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
  });

  return (
    <>
      <StatusBar hidden></StatusBar>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search for food"
          onChangeText={handleFoodInputChange}
        />
        <TouchableHighlight style={styles.button} onPress={fetchData}>
          <FontAwesome name="search" size={35} color="black" />
        </TouchableHighlight>

        <View style={styles.fetchedFood}>
          <View style={styles.fetchedText}>
            <Text style={styles.textLook}>
              Food: {dataPerServing.text && <Text>{dataPerServing.text}</Text>}
            </Text>
            {data && data.nutrients && (
              <View>
                <Text style={styles.textLook}>Nutrients for 100g:</Text>
                <Text style={styles.textLook}>
                  ENERC_KCAL: {data.nutrients.ENERC_KCAL || "Unkown"}
                </Text>
                <Text style={styles.textLook}>
                  Proteins: {data.nutrients.PROCNT || "Unkown"}
                </Text>
                <Text style={styles.textLook}>
                  Fats: {data.nutrients.FAT || "Unkown"}
                </Text>
                <Text style={styles.textLook}>
                  Carbohydrates: {data.nutrients.CHOCDF || "Unkown"}
                </Text>
                <Text style={styles.textLook}>
                  Fibers: {data.nutrients.FIBTG || "Unkown"}
                </Text>
              </View>
            )}
          </View>
          <TouchableHighlight style={styles.Button2} onPress={addingData}>
            <AntDesign name="checkcircle" size={80} color="white" />
          </TouchableHighlight>
          <TouchableHighlight style={styles.Button2} onPress={removeData}>
            <AntDesign name="closecircle" size={80} color="white" />
          </TouchableHighlight>
        </View>

          <View style={styles.todayDataContainer}>
            <Text style={styles.text}>
              Today's Nutritional Data: {"\n"}
              Calories: {Math.round(calories)} {"\n"}
              Proteins: {Math.round(proteins)} {"\n"}
              Fats: {Math.round(fats)} {"\n"}
              Carbohydrates: {Math.round(carbs)} {"\n"}
              Fibers: {Math.round(fibers)}
            </Text>
          </View>
          <TouchableHighlight style={styles.button} onPress={saveValues}>
            <Text style={styles.text}>Save today data</Text>
          </TouchableHighlight>
          <View>
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
                <Text style={styles.text}>{note.calories} calories</Text>
                <Text style={styles.text}>{note.proteins} proteins</Text>
                <Text style={styles.text}>{note.carbs} carbs</Text>
                <Text style={styles.text}>{note.fibers} fibers</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
}
