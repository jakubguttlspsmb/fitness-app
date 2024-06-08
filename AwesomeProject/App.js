import FoodPage from "./assets/pages/FoodPage/FoodPage";
import FitPage from "./assets/pages/FitPage/FitPage";
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
import { useEffect } from "react";
import { MongoClient } from "mongodb";

/*
npm i
npm i expo
npm i react-native
npm i @react-native-async-storage/async-storage
npx expo login 
npm start
naskenuj qr kod na mobilu
*/
export async function getStaticProps(){
  const mongoClient = new MongoClient(
    "mongodb+srv://admin:admin@cluster0.pj1sbdh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  const data = await mongoClient.db().collection("food").find({}).toArray();

  console.log(">>>", data);
};


export default function App() {
  const deviceWidth = Dimensions.get("window").width;

  const styles = StyleSheet.create({
    mainContainer: {
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
          <View key={1}>{FitPage()}</View>
          <View key={2}>{FoodPage()}</View>
        </ScrollView>
      </View>
    </>
  );
}
