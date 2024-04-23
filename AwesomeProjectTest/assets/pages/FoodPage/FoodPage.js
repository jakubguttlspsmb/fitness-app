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
    const [profileOpen, setProfileOpen] = useState(false);
    const [infoOpen, setinfoOpen] = useState(false);
    const [olderDaysData, setOlderDaysData] = useState([]);
  
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
    /* const loadData = async () => {
      const savedData = await getDataDaily("async storage key"); // Provide your AsyncStorage key here
      if (savedData) {
        // Data was retrieved successfully
        setCalories(savedData.calories || 0);
        setProteins(savedData.proteins || 0);
        setFats(savedData.fats || 0);
        setCarbs(savedData.carbs || 0);
        setFibers(savedData.fibers || 0);
      } else {
        // No data found or error retrieving data
        console.log("No saved data found.");
      }
    }; */
  
    useEffect(() => {
      loadDataForToday();
      loadOlderDaysData();
    }, []);
  
    const saveDataDaily = async (calories, proteins, fats, fibers, carbs) => {
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
  
    const getDataDaily = async (key) => {
      try {
        const data = await AsyncStorage.getItem(key);
        if (data !== null) {
          return JSON.parse(data);
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
        return null;
      }
    };
    const loadDataForToday = async () => {
      try {
        const currentDate = new Date();
        const key = `${currentDate.getFullYear()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getDate()}`;
        const savedData = await getDataDaily(key);
        if (savedData) {
          setCalories(savedData.calories || 0);
          setProteins(savedData.proteins || 0);
          setFats(savedData.fats || 0);
          setCarbs(savedData.carbs || 0);
          setFibers(savedData.fibers || 0);
        }
      } catch (error) {
        console.error("Error loading data for today:", error);
      }
    };
    const loadOlderDaysData = async () => {
      try {
        const olderData = [];
        // Load data for previous 7 days
        for (let i = 1; i <= 7; i++) {
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() - i);
          const key = `${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
          }-${currentDate.getDate()}`;
          const savedData = await getDataDaily(key);
          if (savedData) {
            olderData.push({ date: key, data: savedData });
          }
        }
        setOlderDaysData(olderData);
      } catch (error) {
        console.error("Error loading older days data:", error);
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
  
    setInterval(saveDataDaily, 24 * 1000);
    setInterval(deleteDataDaily, 24 * 60 * 60 * 1000);
    setInterval(deleteOldData, 24 * 60 * 60 * 1000);
  
    function toProfile() {
      setProfileOpen(true);
      setinfoOpen(false);
    }
    function toInfo() {
      setinfoOpen(true);
      setProfileOpen(false);
    }
    function returnToMain() {
      setinfoOpen(false);
      setProfileOpen(false);
    }
  
    const styles = StyleSheet.create({
      container: {
        alignItems: "center",
        width: width,
        height: height + 40,
        justifyContent: "center",
        backgroundColor: "yellow",
      },
      input: {
        marginTop: height * 0.05,
        backgroundColor: "white",
        width: width,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 10,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
      },
      input2: {
        backgroundColor: "green",
      },
      textLook: {
        color: "white",
        fontWeight: "bold",
      },
      button: {
        backgroundColor: "white",
        width: width,
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
        width: height,
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
        marginTop: "180%",
        flexDirection: flexdirection,
        justifyContent: "space-between",
        alignItems: "center",
      },
      fetchedText: { color: "white", fontWeight: "bold" },
      scrollContent: { alignItems: "center" },
      head: { marginTop: "10%", fontSize: 25, fontWeight: "bold" },
    });
  
    if (profileOpen === true) {
      return (
        <>
        <View style={styles.container}>
          <Text style={styles.head}>Profile</Text>
          <View styels={styles.inputContainer}>
            <TextInput
              style={styles.input2}
              placeholder="Input Height"
              onChangeText={handleHeightInputChange}
            />
            <TextInput
              style={styles.input2}
              placeholder="Input weight"
              onChangeText={handleWeightInputChange}
            />
          </View>
          <View style={styles.bottomIcons}>
            <Pressable onPress={returnToMain}>
              <FontAwesome name="search" size={35} color="black" />
            </Pressable>
            <Pressable onPress={toInfo}>
              <AntDesign name="infocirlce" size={35} color="black" />
            </Pressable>
          </View>
        </View>
        </>
      );
    }
    if (infoOpen === true) {
      return (<>
        <View style={styles.container}>
          <Text style={styles.head}>Info</Text>
          <View style={styles.bottomIcons}>
            <Pressable onPress={returnToMain}>
              <FontAwesome name="search" size={35} color="black" />
            </Pressable>
            <Pressable onPress={toProfile}>
              <AntDesign name="user" size={35} color="black" />
            </Pressable>
          </View>
        </View>
      </>);
    }
  
    return (
      <>
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
              <AntDesign name="checkcircle" size={35} color="black" />
            </TouchableHighlight>
            <TouchableHighlight style={styles.Button2} onPress={removeData}>
              <AntDesign name="closecircle" size={35} color="black" />
            </TouchableHighlight>
          </View>
          <View>
            <Text>
              Todays nutritions: Cal:{Math.round(calories)} Pro:
              {Math.round(proteins)} Fat:{Math.round(fats)} Car:
              {Math.round(carbs)} Fib:{Math.round(fibers)}
            </Text>
            <ScrollView contentContainerStyle={styles.scrollContent}>
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
  
              {olderDaysData.map((item, index) => (
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
            </ScrollView>
          </View>
          <View style={styles.bottomIcons}>
            <Pressable onPress={toInfo}>
              <AntDesign name="infocirlce" size={35} color="black" />
            </Pressable>
            <Pressable onPress={toProfile}>
              <AntDesign name="user" size={35} color="black" />
            </Pressable>
          </View>
        </View>
      </>
    );
  }
  