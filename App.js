import React, { Component } from "react";
import { AsyncStorage, StyleSheet, Button, View } from "react-native";

import * as AppAuth from "expo-app-auth";

const config = {
  issuer: "https://accounts.google.com",
  scopes: ["openid", "profile"],
  /* This is the CLIENT_ID generated from a Firebase project */
  clientId:
    "603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com"
};

const StorageKey = "@PillarValley:GoogleOAuthKey";

async function signInAsync() {
  const authState = await AppAuth.authAsync(config);
  await cacheAuthAsync(authState);
  console.log("signInAsync", authState);
  return authState;
}

/* Let's save our user tokens so when the app resets we can try and get them later */
function cacheAuthAsync(authState) {
  return AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
}

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Press me"
          onPress={async () => {
            await signInAsync();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
