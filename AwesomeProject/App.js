import FoodPage from "./assets/pages/FoodPage/FoodPage";
import FitPage from "./assets/pages/FitPage/FitPage";
/* npm i*/
/* npm i expo */
/* npm install @react-native-async-storage/async-storage*/
import * as Font from "expo-font";
import { AppLoading } from "expo";
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { useState } from "react";

export default function App() {
  const deviceWidth = Dimensions.get("window").width;

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      width: deviceWidth,
    },
  });

  return (
    <>
      <View style={styles.mainContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
        >
          <View key={1}>{FoodPage()}</View>

          <View key={2}>{FitPage()}</View>
        </ScrollView>
      </View>
    </>
  );
}
