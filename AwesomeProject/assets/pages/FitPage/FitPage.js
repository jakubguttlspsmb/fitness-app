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
  var deviceWidth = Dimensions.get("window").width;
  var deviceHeight = Dimensions.get("window").height;

  const handleFoodInputChange = (text) => {
    setFood(text);
  };
  const fetchData = async () => {
    try {
      searchInput = food;
      const response = await fetch(
        `http://api.edamam.com/api/food-database/v2/parser?app_id=181e5eb4&app_key=0633a8e3dc27c8ba43caf5b67709cd32&ingr=${searchInput}&nutrition-type=cooking&181e5eb4=0633a8e3dc27c8ba43caf5b67709cd32`
      );
      const jsonData = await response.json();
      setDataPerServing(jsonData);
      setData(jsonData.parsed[0].food);
    } catch (error) {
      console.error("neni jidlo na seznamu zkus to zadat znovu");
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "blue",
      height: deviceHeight,
      width: deviceHeight,
    },
  });
  return (
    <>
      <View style={styles.container}>

      </View>
    </>
  );
}
