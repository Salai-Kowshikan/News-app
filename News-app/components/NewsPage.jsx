import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { Button, Card, Text, IconButton, Avatar } from "react-native-paper";
import axios from "axios";

const NewsPage = () => {
  const [saved, setSaved] = useState(false);
  const [response, setResponse] = useState([
    {
      title: "Thiyanesh got married",
      desc: "He pulled the best girl",
      image: "https://picsum.photos/700",
    },
    {
      title: "Thiyanesh is the richest person on Earth",
      desc: "but his wife is divorcing him",
      image: "https://picsum.photos/700",
    },
    {
      title: "Thiyanesh gave up his wealth to charity",
      desc: "he took refuge in a monastry in nepal",
      image: "https://picsum.photos/700",
    },
  ]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await axios.get("https://cat-fact.herokuapp.com/facts/");
      console.log(response.data);
    };
    fetchAPI();
  }, []);
  return (
    <>
      <ScrollView>
        {response.map((res) => {
          return (
            <View style={pages.container}>
              <Card style={Cards.container}>
                <Card.Cover source={{ uri: res.image }} />
                <Card.Title title={res.title} />
                <Card.Content>
                  <Text>{res.desc}</Text>
                </Card.Content>
                <Card.Actions>
                  <IconButton
                    style={Cards.save}
                    icon={saved ? "bookmark-check" : "bookmark-check-outline"}
                    onPress={() => {
                      setSaved(!saved);
                    }}
                  ></IconButton>
                  <Button style={Cards.ViewB}>View</Button>
                </Card.Actions>
              </Card>
            </View>
          );
        })}
      </ScrollView>
    </>
    // <>
    //   <View style={styles.container}>
    //     <Card style={styles.newsCard}>
    //       <Card.Cover
    //         style={styles.image}
    //         source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
    //       />
    //       <Card.Title title="Title" subtitle="Description" />
    //       <Card.Content>
    //         <Text style={styles.description}>Description here</Text>
    //       </Card.Content>
    //       <Card.Actions>
    //         <IconButton
    //           icon={saved ? "bookmark-check" : "bookmark-outline"}
    //           type="contained"
    //           onPress={() => {
    //             setSaved(!saved);
    //           }}
    //         />
    //         <Button> View </Button>
    //       </Card.Actions>
    //     </Card>
    //   </View>
    // </>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     display: "flex",
//     flex: 1,
//     flexDirection: "column",
//     width: "100%",
//     marginTop: "16",
//     marginHorizontal: "20",
//   },
//   image: {
//     marginHorizontal: "20",
//   },
//   newsCard: {
//     width: "90%",
//     padding: "10",
//   },
//   description: {
//     flex: 1,
//   },
// });

const pages = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: "5%",
    flexDirection: "column",
  },
});
const Cards = StyleSheet.create({
  container: {
    display: "flex",
    flex: "1",
  },
});
export default NewsPage;
