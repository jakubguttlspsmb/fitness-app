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
  const [infoOpen, setinfoOpen] = useState(false);
  const [olderData, setOlderData] = useState([]);

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

  const saveData = async (calories, proteins, fats, fibers, carbs) => {
    try {
      const currentDate = new Date();
      const key = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`;
      const time = currentDate.getTime();
      await AsyncStorage.setItem(
        key,
        JSON.stringify({ calories, proteins, fats, fibers, carbs, time })
      );
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  function toInfo() {
    setinfoOpen(true);
  }
  function returnToMain() {
    setinfoOpen(false);
  }

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      width: width,
      height: height,
      backgroundColor: "yellow",
    },
    input: {
      marginTop: height * 0.05,
      backgroundColor: "white",
      width: width - 50,
      paddingTop: 8,
      paddingBottom: 8,
      fontWeight: "500",

      paddingLeft: 15,
    },
    input2: {
      backgroundColor: "green",
    },
    textLook: {
      color: "black",
      fontWeight: "500",
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
      fontWeight: "500",
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
    bottomIcons: { justifyContent: "center", marginTop: "100%" },
    fetchedText: { color: "black", fontWeight: "500" },
    scrollContent: { alignItems: "center" },
    head: { marginTop: "10%", fontSize: 25, fontWeight: "500" },
    todayDataContainer: { marginBottom: "5%", marginTop: "5%" },
  });

  if (infoOpen === true) {
    return (
      <>
        <StatusBar hidden></StatusBar>
        <View style={styles.container}>
          <Text style={styles.head}>Info</Text>
          <View style={styles.bottomIcons}>
            <Pressable onPress={returnToMain}>
              <FontAwesome name="search" size={35} color="black" />
            </Pressable>
          </View>
        </View>
      </>
    );
  }

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
        <View>
          <View style={styles.todayDataContainer}>
            <Text style={styles.todayDataText}>
              Today's Nutritional Data: {"\n"}
              Calories: {Math.round(calories)} {"\n"}
              Proteins: {Math.round(proteins)} {"\n"}
              Fats: {Math.round(fats)} {"\n"}
              Carbohydrates: {Math.round(carbs)} {"\n"}
              Fibers: {Math.round(fibers)}
            </Text>
          </View>
          <TouchableHighlight style={styles.button} onPress={""}>
            <Text>Save today data</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={""}>
            <Text>Save today data</Text>
          </TouchableHighlight>
          <ScrollView style={styles.olderDatastyle}>
            {olderData.map((item, index) => (
              <View key={index} style={styles.olderDayDataContainer}>
                <Text style={styles.olderDayDataText}>
                  {item.date}: {"\n"}
                  Calories: {Math.round(item.data.calories)} {"\n"}
                  Proteins: {Math.round(item.data.proteins)} {"\n"}
                  Fats: {Math.round(item.data.fats)} {"\n"}
                  Carbohydrates: {Math.round(item.data.carbs)} {"\n"}
                  Fibers: {Math.round(item.data.fibers)}
                </Text>
              </View>
            ))}
            <View style={styles.bottomIcons}>
              <Pressable onPress={toInfo}>
                <AntDesign name="infocirlce" size={35} color="black" />
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
