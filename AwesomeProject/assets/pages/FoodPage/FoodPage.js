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
      backgroundColor: "green",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      display: "inline",
      width: deviceWidth,
    },
    input: {
      borderWidth: 1,
      padding: 8,
      marginTop: 10,
      backgroundColor: "white",
      width: deviceWidth,
    },
    Text: {
      color: "black",
    },
    button: {
      backgroundColor: "white",
      color: "black",
    },
    /* image: {
      width: 20,
      height: 20,
    },*/
  });
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search for food"
          onChangeText={(food) => handleFoodInputChange(food)}
        />
        <Button
          style={styles.button}
          onPress={fetchData}
          title="search"
        ></Button>
        <Text style={styles.Text}>
          food you searched for{" "}
          {dataPerServing.text && <Text>{dataPerServing.text}</Text>}
        </Text>
        <>
          {/*       <Image source={{ uri: "./favicon.png" }} style={styles.image} />
           */}
        </>
        {data && data.nutrients && (
          <View>
            <Text style={styles.Text}>Nutrients for 100g of food:</Text>
            <Text style={styles.Text}>
              ENERC_KCAL: {data.nutrients.ENERC_KCAL}
            </Text>
            <Text style={styles.Text}>PROCNT: {data.nutrients.PROCNT}</Text>
            <Text style={styles.Text}>FAT: {data.nutrients.FAT}</Text>
            <Text style={styles.Text}>CHOCDF: {data.nutrients.CHOCDF}</Text>
            <Text style={styles.Text}>FIBTG: {data.nutrients.FIBTG}</Text>
          </View>
        )}
      </View>
    </>
  );
}
