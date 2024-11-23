import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import NewsPage from "@/components/NewsPage";
import WeatherPage from "@/components/WeatherPage";
const newsRoute = () => <NewsPage />;
const weatherRoute = () => <WeatherPage />;


const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "news",
      title: "News",
      focusedIcon: "newspaper-variant-multiple-outline",
      unfocusedIcon: "newspaper-variant-multiple",
    },
    {
      key: "weather",
      title: "weather",
      focusedIcon: "weather-cloudy",
      unfocusedIcon: "bell-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    news: newsRoute,
    weather: weatherRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MyComponent;
