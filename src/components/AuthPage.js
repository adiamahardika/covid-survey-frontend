import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GOOGLE_CLIENT_ID } from "@env"; // Pastikan Client ID Google berada di file .env

WebBrowser.maybeCompleteAuthSession();

const AuthPage = ({ navigation }) => {
  console.log(GOOGLE_CLIENT_ID);
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      fetchUserData(authentication.accessToken);
    }
  }, [response]);

  const fetchUserData = async (accessToken) => {
    try {
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const userData = await userInfoResponse.json();
      setUser(userData);
      navigation.navigate("MainPage"); // Arahkan ke halaman utama setelah login sukses
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Covid Survey Login</Text>
      <Button
        disabled={!request}
        title="Sign in with Google"
        onPress={() => promptAsync()}
      />
      <Button
        onPress={() => navigation.navigate("Survey Covid")}
        title="Skip Login"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default AuthPage;
