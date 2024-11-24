import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Chip } from "react-native-paper";
import NewsCards from "@/components/NewsCards";
import { FeedContext } from "@/context/FeedContext";

const FeedPage = () => {
  const { feed, setFeed } = useContext(FeedContext);
  const [saved, setSaved] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    setFeed([
      {
        uuid: "1",
        title: "Thiyanesh got married",
        url: "https://picsum.photos/700",
        desc: "He pulled the best girl",
        image: "https://picsum.photos/700",
      },
      {
        uuid: "2",
        title: "Thiyanesh is the richest person on Earth",
        url: "https://picsum.photos/700",
        desc: "but his wife is divorcing him",
        image: "https://picsum.photos/700",
      },
      {
        uuid: "3",
        title: "Thiyanesh gave up his wealth to charity",
        url: "https://picsum.photos/700",
        desc: "he took refuge in a monastry in nepal",
        image: "https://picsum.photos/700",
      },
    ]);
  }, []);

  const categories = [
    "Politics",
    "Sports",
    "Entertainment",
    "Business",
    "Technology",
    "Economics",
  ];
  const selectCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

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
        <NewsCards response={feed} saved={saved} setSaved={setSaved} />
      </View>
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
  },
  chip: {
    marginHorizontal: "1%",
  },
});

export default FeedPage;
