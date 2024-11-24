import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Chip, Button, FAB } from "react-native-paper";
import NewsCards from "@/components/NewsCards";
import { FeedContext } from "@/context/FeedContext";
import { newsApi, db } from "@/api/v1";
import news from "@/constants/data";

const FeedPage = () => {
  const { feed, setFeed, saved, setSaved } = useContext(FeedContext);
  // const key = process.env.EXPO_PUBLIC_API_KEY;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredFeed, setFilteredFeed] = useState([]);
  // let page = 1

  const fetchTop = async () => {
    // try {
    //   const response = await newsApi.get(`/news/top?api_token=${key}&locale=in`);
    //   setFeed(response.data.data);
    // } catch (e) {
    //   console.log(e);
    // }
    const updatedNews = news.map((item) => ({
      ...item,
      saved: false,
    }));
    setFeed(updatedNews);
  };

  // const fetchMore = async () => {
  //   page += 1;
  //   try {
  //     const categoriesParam = selectedCategories.length ? `&categories=${selectedCategories.join(",")}` : "";
  //     const response = await newsApi.get(`/news/top?api_token=${key}&locale=in&page=${page}${categoriesParam}`);
  //     setFeed((prevFeed) => [...prevFeed, ...response.data.data]);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const fetchSaved = async () => {
    try {
      const response = await db.get("/news/savedArticle/1");
      setSaved(response.data);
    } catch (e) {
      console.log(e);
    }
  };

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

  const toggleSaved = async (uuid) => {
    const updatedFeed = feed.map((item) =>
      item.uuid === uuid ? { ...item, saved: !item.saved } : item
    );
    setFeed(updatedFeed);

    const item = updatedFeed.find((item) => item.uuid === uuid);
    if (item.saved) {
      try {
        await db.post("/news/savedArticle", {
          userId: "1",
          uuid: item.uuid,
          title: item.title,
          description: item.description,
          url: item.url,
          imageUrl: item.image_url,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await db.delete("/news/savedArticle", {
          data: {
            userId: "1",
            uuid: item.uuid,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredFeed(feed);
    } else {
      const filtered = feed.filter((item) =>
        item.categories.some((cat) => selectedCategories.includes(cat))
      );
      setFilteredFeed(filtered);
    }
  }, [selectedCategories, feed]);

  useEffect(() => {
    fetchTop();
    fetchSaved();
  }, []);

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
        <NewsCards response={filteredFeed} toggleSaved={toggleSaved} />
      </View>
      <FAB
        icon="reload"
        style={styles.fab}
        onPress={() => console.log("Pressed")}
      />
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
