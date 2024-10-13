import React, { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import { Card, Button } from "react-native-paper";
import axios from "axios";
import { API_URL } from "@env";
import { useFocusEffect } from "@react-navigation/native";

const MainPage = ({ navigation }) => {
  const [surveys, setSurveys] = useState([]);

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
      {/* <FAB
        style={{ position: "absolute", right: 16, bottom: 16 }}
        icon="plus"
        onPress={() => navigation.navigate("Form")}
      /> */}
    </ScrollView>
  );
};

export default MainPage;
