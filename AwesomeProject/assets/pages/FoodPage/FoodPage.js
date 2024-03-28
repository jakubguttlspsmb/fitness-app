import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function FoodPage() {
  const [data, setData] = useState("");
  const [dataPerServing, setDataPerServing] = useState("");
  const [food, setFood] = useState("");
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get("window").height
  );
  const [flexdirection, setFlexdirection] = useState("row");
  const [visible, setVisible] = useState("none");
  const [calories, setCalories] = useState(0);
  const [fats, setFats] = useState(0);
  const [proteins, setProteins] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fibers, setFibers] = useState(0);

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

  const saveDataDaily = async (key, calories, proteins, fats) => {
    try {
      const time = new Date().getTime();
      await AsyncStorage.setItem(
        key,
        JSON.stringify({ calories, proteins, fats, fibers, carbs, time })
      );
    } catch (error) {
      "error pri ukladani", error;
    }
  };

  const deleteDataDaily = () => {
    setCalories(0);
    setProteins(0);
    setFats(0);
    setCarbs(0);
    setFibers(0);
  };

  const deleteOldData = () => {};

  setInterval(saveDataDaily, 24 * 60 * 60 * 1000);
  setInterval(deleteDataDaily, 24 * 60 * 60 * 1000);
  setInterval(deleteOldData, 24 * 60 * 60 * 1000);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "yellow",
      alignItems: "center",
      width: deviceWidth,
      height: deviceHeight,
    },
    input: {
      marginTop: deviceHeight * 0.05,
      backgroundColor: "white",
      width: deviceWidth,
      paddingTop: 8,
      paddingBottom: 8,
      borderRadius: 10,
      fontWeight: "bold",
      alignItems:"center",
      justifyContent:"center"
    },
    textLook: {
      color: "white",
      fontWeight: "bold",
    },
    button: {
      backgroundColor: "white",
      width: deviceWidth,
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
      width: deviceWidth,
      backgroundColor: "black",
      display: visible,
      height: "30%",
      marginTop: 20,
      fontWeight: "bold",
    },
    Button2: {
      backgroundColor: "white",
      height: "90%",
      width: "30%",
      justifyContent: "center",
      alignItems: "center",
    },
    bottomIcons: {
      flexDirection: flexdirection,
      justifyContent: "space-between",
      alignItems: "center",
    },
    fetchedText: { color: "white", fontWeight: "bold" },
  });

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search for food"
          onChangeText={handleFoodInputChange}
        />
        <TouchableHighlight style={styles.button} onPress={fetchData}>
          <FontAwesome name="search" size={24} color="black" />
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
            <AntDesign name="checkcircle" size={24} color="black" />
          </TouchableHighlight>
          <TouchableHighlight style={styles.Button2} onPress={removeData}>
            <AntDesign name="closecircle" size={24} color="black" />
          </TouchableHighlight>
        </View>
        <View>
          <Text>
            Todays nutritions: Cal:{Math.round(calories)} Pro:
            {Math.round(proteins)} Fat:{Math.round(fats)} Car:
            {Math.round(carbs)} Fib:{Math.round(fibers)}
          </Text>
        </View>
        <View style={styles.bottomIcons}>
          <AntDesign name="infocirlce" size={24} color="black" />
          <AntDesign name="user" size={24} color="black" />
        </View>
      </View>
    </>
  );
}
