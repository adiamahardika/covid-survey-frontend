import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { TextInput, Button, RadioButton, Text } from "react-native-paper";
import axios from "axios";
import { API_URL } from "@env";

const AddDataPage = ({ route, navigation }) => {
  const { id } = route.params || {};
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    address: "",
    affected: false,
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/surveys/${id}`)
        .then((response) => {
          setFormData(response.data);
          console.log(response);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  const handleSubmit = () => {
    if (id) {
      axios
        .put(`${API_URL}/surveys/${id}`, formData)
        .then(() => navigation.navigate("Survey Covid"))
        .catch((error) => console.log(error));
    } else {
      axios
        .post(`${API_URL}/surveys`, formData)
        .then(() => navigation.navigate("Survey Covid"))
        .catch((error) => console.log(error));
    }
  };
  return (
    <View
      style={{
        padding: "5%",
        flexDirection: "column",
      }}
    >
      <TextInput
        mode="outlined"
        label="Name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        style={{ marginBottom: "4%" }}
      />
      <TextInput
        mode="outlined"
        label="Age"
        defaultValue={formData.age > 0 ? formData.age.toString() : ""}
        value={formData.age}
        onChangeText={(text) =>
          setFormData({ ...formData, age: parseInt(text) })
        }
        keyboardType="numeric"
        style={{ marginBottom: "4%" }}
      />
      <TextInput
        mode="outlined"
        label="Address"
        value={formData.address}
        onChangeText={(text) => setFormData({ ...formData, address: text })}
        style={{ marginBottom: "4%" }}
      />
      <Text>Affected</Text>
      <RadioButton.Group
        onValueChange={(value) => setFormData({ ...formData, affected: value })}
      >
        <RadioButton.Item
          label="Yes"
          value={true}
          status={formData.affected ? "checked" : "unchecked"}
        ></RadioButton.Item>
        <RadioButton.Item
          label="No"
          value={false}
          status={!formData.affected ? "checked" : "unchecked"}
        ></RadioButton.Item>
      </RadioButton.Group>
      <Button
        mode="contained"
        icon="content-save"
        onPress={handleSubmit}
        style={{ marginTop: "5%" }}
      >
        Submit
      </Button>
    </View>
  );
};

export default AddDataPage;
