import { View } from "react-native";
import BottomBar from "@/components/BottomBar";
import { useState, useEffect } from "react";
import { Button, Text } from "react-native-paper";

export default function Index() {
  const [name, setName] = useState("Thiyanesh");
  const [welcome, setWelcome] = useState("");

  useEffect(() => {
    if (name === "Thiyanesh") {
      setWelcome("I am batman");
    } else {
      setWelcome("I am a chill guy");
    }
  });

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{name}</Text>
        <Button
          onPress={() => {
            if (name === "Thiyanesh") {
              setName("Salai");
            } else {
              setName("Thiyanesh");
            }
          }}
        >
          Change name
        </Button>
        <Text>{welcome}</Text>
      </View>
      <BottomBar />
    </>
  );
}
