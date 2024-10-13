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
      .then((response) => setSurvey(response.data))
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
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Apakah anda yakin akan menghapus survey ini?
            </Text>

            <Pressable
              style={[styles.button, styles.buttonDelete]}
              onPress={handleDelete}
            >
              <Text style={styles.textStyle}>Yes, Delete</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonCancel]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonDelete: {
    backgroundColor: "#ff5c5c",
    marginBottom: 10,
  },
  buttonCancel: {
    backgroundColor: "#ccc",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DetailPage;
