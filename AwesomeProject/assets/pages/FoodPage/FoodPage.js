import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
import { useState } from "react";

export default function FoodPage() {
  const [data, setData] = useState("");
  const [dataPerServing, setDataPerServing] = useState("");
  const [food, setFood] = useState("");
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get("window").width);
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get("window").height);
  const [flexdirection, setFlexdirection] = useState("row");
  const [calories, setCalories] = useState(0);

  const handleFoodInputChange = (text) => {
    setFood(text);
  };

  function addingData() {
    if (data && data.nutrients && data.nutrients.ENERC_KCAL) {
      setCalories(calories + data.nutrients.ENERC_KCAL);
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
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "green",
      alignItems: "center",
      width: deviceWidth,
      height: deviceHeight,
    },
    input: {
      borderWidth: 1,
      padding: 8,
      marginTop: 20,
      backgroundColor: "white",
      width: deviceWidth,
    },
    textLook: {
      color: "black",
    },
    button: {
      backgroundColor: "white",
      color: "black",
    },
    fetchedFood: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: flexdirection,
      width: deviceWidth,
      backgroundColor: "white",
    },
    Button2: {
      width: "33%",
      height: "20%",
      backgroundColor: "grey",
    },
    fetchedText: {
      width: "33%",
      height: "20%",
    },
  });

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search for food"
          onChangeText={handleFoodInputChange}
        />
        <Button
          style={styles.button}
          onPress={fetchData}
          title="Search"
        />
        <View style={styles.fetchedFood}>
          <View style={styles.fetchedText}>
            <Text style={styles.textLook}>
              Food you searched for:{" "}
              {dataPerServing.text && <Text>{dataPerServing.text}</Text>}
            </Text>
            {data && data.nutrients && (
              <View>
                <Text style={styles.textLook}>Nutrients for 100g of food:</Text>
                <Text style={styles.textLook}>
                  ENERC_KCAL: {data.nutrients.ENERC_KCAL || 'N/A'}
                </Text>
                <Text style={styles.textLook}>PROCNT: {data.nutrients.PROCNT || 'N/A'}</Text>
                <Text style={styles.textLook}>FAT: {data.nutrients.FAT || 'N/A'}</Text>
                <Text style={styles.textLook}>CHOCDF: {data.nutrients.CHOCDF || 'N/A'}</Text>
                <Text style={styles.textLook}>FIBTG: {data.nutrients.FIBTG || 'N/A'}</Text>
              </View>
            )}
          </View>
          <Button style={styles.Button2} title="+" onPress={addingData} />
        </View>
        <View>
          <Text>Todays nutritions: {calories}</Text>
        </View>
      </View>
    </>
  );
}
