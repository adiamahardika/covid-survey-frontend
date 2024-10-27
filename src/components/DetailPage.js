import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Card, Text, Button, Modal } from "react-native-paper";
import axios from "axios";
import { API_URL } from "@env";

const DetailPage = ({ route, navigation }) => {
  const { id } = route.params;
  const [survey, setSurvey] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    height: "25%",
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/surveys/${id}`)
      .then((response) => {
        setSurvey(response.data);
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = () => {
    axios
      .delete(`${API_URL}/surveys/${id}`)
      .then(() => {
        setModalVisible(false);
        navigation.goBack();
      })
      .catch((error) => console.log(error));
  };

  if (!survey) return null;

  return (
    <View style={{ padding: "5%", flex: 1 }}>
      <Card>
        <Card.Title titleVariant="titleMedium" title={survey.name} />
        <Card.Content>
          <Text>Age: {survey.age}</Text>
          <Text>Address: {survey.address}</Text>
          <Text>Affected: {survey.affected ? "Yes" : "No"}</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            icon="trash-can"
            onPress={() => setModalVisible(true)}
            theme={{ colors: { primary: "red" } }}
          >
            Hapus
          </Button>
          <Button
            icon="pencil"
            onPress={() => navigation.navigate("Form", { id: survey.id })}
          >
            Edit
          </Button>
        </Card.Actions>
      </Card>
      <Modal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        contentContainerStyle={containerStyle}
      >
        <Text style={{ marginBottom: "10%" }}>
          Apakah anda yakin akan menghapus survey ini?
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button
            mode="contained"
            onPress={() => setModalVisible(false)}
            style={{ marginRight: "2%" }}
          >
            Cancel
          </Button>
          <Button
            icon="trash-can"
            mode="outlined"
            onPress={handleDelete}
            textColor="red"
          >
            Ya, Hapus
          </Button>
        </View>
      </Modal>
    </View>
  );
};

export default DetailPage;
