import { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import FeedPage from "@/components/FeedPage";
import SavedPage from "@/components/SavedPage";
const feedRoute = () => <FeedPage />;
const savedRoute = () => <SavedPage />;


const BottomBar = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "feed",
      title: "Feed",
      focusedIcon: "newspaper-variant-multiple-outline",
      unfocusedIcon: "newspaper-variant-multiple",
    },
    {
      key: "saved",
      title: "Saved",
      focusedIcon: "bookmark-multiple",
      unfocusedIcon: "bookmark-multiple-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    feed: feedRoute,
    saved: savedRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomBar;
