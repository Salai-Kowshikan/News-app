import AnimatedLoader from "react-native-animated-loader";
import { useContext } from "react";
import { FeedContext } from "@/context/FeedContext";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

function Loader() {
  const { loading } = useContext(FeedContext);
  return (
    <>
      {loading && (
        <View style={styles.loaderContainer}>
          <AnimatedLoader
            visible={loading}
            overlayColor="rgba(255,255,255,0.75)"
            speed={1}
            source={require("./loader.json")}
            animationStyle={styles.lottie}
          >
            <Text style={styles.text}>Fetching news for you</Text>
          </AnimatedLoader>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.75)",
  },
  lottie: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: "#000",
  },
});

export default Loader;