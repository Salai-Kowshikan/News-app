import { View, StyleSheet, ScrollView, Linking } from "react-native";
import { Button, Card, Text, IconButton } from "react-native-paper";

const NewsCards = ({ response, toggleSaved }) => {
  return (
    <ScrollView>
      {response.map((res) => (
        <View key={res.uuid} style={styles.container}>
          <Card style={styles.card}>
            <Card.Cover style={styles.cover} source={{ uri: res.image_url }} />
            <Card.Title title={res.title} />
            <Card.Content>
              <Text>{res.description}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                icon={res.saved ? "bookmark-check" : "bookmark-outline"}
                onPress={() => toggleSaved(res.uuid)}
              > Save </Button>
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
    padding: "5%",
  },
});

export default NewsCards;