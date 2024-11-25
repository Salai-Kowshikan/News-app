import { useState, useEffect, useContext, useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Chip, FAB, Snackbar, Button } from "react-native-paper";
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import NewsCards from "@/components/NewsCards";
import { FeedContext } from "@/context/FeedContext";
import { db } from "@/api/v1";

const FeedPage = () => {
  const { feed, setFeed, saved, setSaved } = useContext(FeedContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredFeed, setFilteredFeed] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [visibleFeed, setVisibleFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const scrollViewRef = useRef(null);

  const categories = [
    "science",
    "sports",
    "business",
    "entertainment",
    "tech",
    "politics",
    "food"
  ];

  const selectCategory = (category) => {
    let updatedCategories;
    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((cat) => cat !== category);
    } else {
      updatedCategories = [...selectedCategories, category];
    }
    setSelectedCategories(updatedCategories);
  };

  const fetchNews = async () => {
    try {
      const response = await db.get("/records");
      const shuffledData = response.data.sort(() => Math.random() - 0.5);
      setFeed(shuffledData);
      setVisibleFeed(shuffledData.slice(0, 10));
    } catch (error) {
      console.error(error);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    const newVisibleFeed = filteredFeed.slice((nextPage - 1) * 10, nextPage * 10);
    setVisibleFeed(newVisibleFeed);
    setPage(nextPage);
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const sendPushNotification = async (title) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Post Saved",
        body: `${title} saved successfully`,
      },
      trigger: null,
    });
  };

  const toggleSaved = async (uuid) => {
    const updatedFeed = feed.map((item) => {
      if (item.uuid === uuid) {
        item.saved = !item.saved;
      }
      return item;
    });
    setFeed(updatedFeed);
  
    const item = updatedFeed.find((item) => item.uuid === uuid);
    if (item.saved) {
      try {
        const response = await db.put(`/records/save/${uuid}`, {});
        if (response.data.success) {
          setSnackbarMessage("Saved successfully");
          await sendPushNotification(item.title);
        } else {
          setSnackbarMessage("Failed to save");
          item.saved = !item.saved;
          setFeed([...updatedFeed]);
        }
      } catch (error) {
        console.error(error);
        setSnackbarMessage("Failed to save");
        item.saved = !item.saved;
        setFeed([...updatedFeed]);
      }
    } else {
      try {
        const response = await db.put(`/records/unsave/${uuid}`, {});
        if (response.data.success) {
          setSnackbarMessage("Unsaved successfully");
        } else {
          setSnackbarMessage("Failed to unsave");
          item.saved = !item.saved;
          setFeed([...updatedFeed]);
        }
      } catch (error) {
        console.error(error);
        setSnackbarMessage("Failed to unsave");
        item.saved = !item.saved; 
        setFeed([...updatedFeed]);
      }
    }
    setSnackbarVisible(true);
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setSnackbarMessage('Permission to access location was denied');
      setSnackbarVisible(true);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    let reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });

    if (reverseGeocode.length > 0) {
      const { city, region } = reverseGeocode[0];
      setLocationName(`${city}, ${region}`);
    }
  };

  useEffect(() => {
    getLocation();
    fetchNews();
  }, []);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredFeed(feed);
      setVisibleFeed(feed.slice(0, 10));
    } else {
      const filtered = feed.filter((item) =>
        item.categories.some((cat) => selectedCategories.includes(cat))
      );
      setFilteredFeed(filtered);
      setVisibleFeed(filtered.slice(0, 10));
    }
    setPage(1);
  }, [selectedCategories, feed]);

  useEffect(() => {
    const savedItems = feed.filter(item => item.saved);
    setSaved(savedItems);
  }, [feed]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView horizontal style={styles.filters}>
          <Text variant="titleLarge">Filters: </Text>
          {categories.map((category) => (
            <Chip
              style={styles.chip}
              icon={selectedCategories.includes(category) ? "check-bold" : null}
              key={category}
              onPress={() => selectCategory(category)}
            >
              {category}
            </Chip>
          ))}
        </ScrollView>
        <Text variant="titleLarge">Here's the top news around {locationName}</Text>
        <ScrollView ref={scrollViewRef}>
          <NewsCards response={visibleFeed} toggleSaved={toggleSaved} />
          {visibleFeed.length < filteredFeed.length && (
            <Button onPress={loadMore}>Load More</Button>
          )}
        </ScrollView>
      </View>
      <FAB
        icon="reload"
        style={styles.fab}
        label="Load More"
        onPress={loadMore}
      />
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
    padding: "5%",
    flexDirection: "column",
  },
  filters: {
    marginBottom: "5%",
    minHeight: "5%",
    maxHeight: "5%",
  },
  chip: {
    marginHorizontal: "1%",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default FeedPage;