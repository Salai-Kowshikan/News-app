import { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Linking } from "react-native";
import { Button, Card, Text, Snackbar } from "react-native-paper";
import { FeedContext } from "@/context/FeedContext";
import { db } from "@/api/v1";

const SavedPage = () => {
  const { saved, setSaved, feed, setFeed } = useContext(FeedContext);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const toggleSaved = async (uuid) => {
    const updatedSaved = saved.filter((item) => item.uuid !== uuid);
    setSaved(updatedSaved);

    const updatedFeed = feed.map((item) => {
      if (item.uuid === uuid) {
        item.saved = false;
      }
      return item;
    });
    setFeed(updatedFeed);

    try {
      const response = await db.put(`/records/unsave/${uuid}`, {});
      if (response.data.success) {
        setSnackbarMessage("Unsaved successfully");
      } else {
        setSnackbarMessage("Failed to unsave");
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Failed to unsave");
    }
    setSnackbarVisible(true);
  };

  return (
    <>
      <ScrollView>
        {saved.map((res) => (
          <View key={res.uuid} style={styles.container}>
            <Card style={styles.card}>
              <Card.Cover style={styles.cover} source={{ uri: res.imageUrl }} />
              <Card.Title title={res.title} />
              <Card.Content>
                <Text>{res.description}</Text>
              </Card.Content>
              <Card.Actions>
                <Button
                  icon={res.saved ? "bookmark-check" : "bookmark-outline"}
                  onPress={() => toggleSaved(res.uuid)}
                >
                  Save
                </Button>
                <Button onPress={() => Linking.openURL(res.url)}>View</Button>
              </Card.Actions>
            </Card>
          </View>
        ))}
      </ScrollView>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </>
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

export default SavedPage;