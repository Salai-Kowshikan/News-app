import React, { useState } from "react";
import { View, StyleSheet, Linking } from "react-native";
import { Surface, Text, TextInput, Button } from "react-native-paper";

function Subscriptions() {
  const [months, setMonths] = useState("");
  const [price, setPrice] = useState(null);

  const calculatePrice = (months) => {
    const numMonths = parseInt(months, 10);
    if (isNaN(numMonths) || numMonths <= 0) {
      return 0;
    }
    if (numMonths < 12) {
      return numMonths * 69;
    } else {
      return numMonths * 50;
    }
  };

  const handleCalculate = () => {
    const totalPrice = calculatePrice(months);
    setPrice(totalPrice);
  };

  const handlePay = () => {
    const upiUrl = `upi://pay?pa=your-upi-id@upi&pn=Your Name&tn=Subscription Payment&am=${price}&cu=INR`;
    Linking.openURL(upiUrl).catch((err) => console.error("Failed to open UPI app:", err));
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Subscriptions</Text>
      <Surface style={styles.surface}>
        <Text>Monthly subscription: Rs.69 / month</Text>
      </Surface>
      <Surface style={styles.surface}>
        <Text>Yearly subscription: Rs.69 / month - Rs.50 / month (Rs. 90 off)</Text>
      </Surface>
      <TextInput
        label="Enter number of months"
        value={months}
        onChangeText={(text) => setMonths(text)}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleCalculate} style={styles.button}>
        Calculate Price
      </Button>
      {price !== null && (
        <>
          <Surface style={styles.surface}>
            <Text>Total Price: Rs.{price}</Text>
          </Surface>
          <Button mode="contained" onPress={handlePay} style={styles.button}>
            Pay with UPI
          </Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  surface: {
    padding: 10,
    marginVertical: 10,
    elevation: 4,
  },
  input: {
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
  },
});

export default Subscriptions;