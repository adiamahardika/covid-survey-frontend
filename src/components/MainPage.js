import React, { useCallback, useState } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { Card, Button, Text } from "react-native-paper";
import axios from "axios";
import { API_URL } from "@env";
import { useFocusEffect } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

const MainPage = ({ navigation }) => {
  const [surveys, setSurveys] = useState([]);
  const initialRegion = {
    latitude: -6.2,
    longitude: 106.816666,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const fetchSurveys = () => {
    axios
      .get(`${API_URL}/surveys`)
      .then((response) => {
        setSurveys(response.data);
      })
      .catch((error) => console.log(error));
  };

  useFocusEffect(
    useCallback(() => {
      fetchSurveys();
    }, [])
  );

  return (
    <ScrollView style={{ padding: "5%" }}>
      <Text style={{ fontSize: 16, marginBottom: "2%" }}>Current Location</Text>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          provider={MapView.PROVIDER_GOOGLE}
        >
          <Marker
            coordinate={{ latitude: -6.2, longitude: 106.816666 }}
            title={"Jakarta"}
            description={"Lokasi Survey"}
          />
        </MapView>
      </View>
      <Button
        mode="contained"
        icon="plus"
        onPress={() => navigation.navigate("Form")}
        style={{ width: "25%", alignSelf: "flex-end", marginBottom: "2%" }}
      >
        Add
      </Button>
      {surveys.length > 0 &&
        surveys.map((survey) => (
          <Card
            style={{ marginBottom: "2%" }}
            key={survey.id}
            onPress={() => navigation.navigate("Detail", { id: survey.id })}
          >
            <Card.Title
              titleVariant="titleMedium"
              title={survey.name}
              subtitle={`Age: ${survey.age}, Affected: ${
                survey.affected ? "Yes" : "No"
              }`}
            />
          </Card>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: "2%",
  },
  map: {
    width: Dimensions.get("window").width,
    height: 150,
  },
});

export default MainPage;
