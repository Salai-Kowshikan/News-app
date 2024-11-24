
import { View, StyleSheet, ScrollView, Linking } from "react-native";
import { Button, Card, Text, IconButton } from "react-native-paper";

const NewsCards = ({ response, saved, setSaved }) => {
  return (
    <ScrollView>
      {response.map((res) => (
        <View key={res.uuid} style={styles.container}>
          <Card style={styles.card}>
            <Card.Cover style={styles.cover} source={{ uri: res.image }} />
            <Card.Title title={res.title} />
            <Card.Content>
              <Text>{res.desc}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon={saved ? "bookmark-check" : "bookmark-check-outline"}
                onPress={() => setSaved(!saved)}
              />
              <Button onPress={() => Linking.openURL(res.url)}>View</Button>
            </Card.Actions>
          </Card>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginBottom: "5%",
  },
  card: {
    display: "flex",
    flex: 1,
  },
  cover: {
    padding: "5%"
  }
});

export default NewsCards;