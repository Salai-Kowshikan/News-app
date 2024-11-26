import { Stack } from "expo-router";
import { FeedProvider } from "@/context/FeedContext";
import { PaperProvider } from "react-native-paper";
import { NotificationProvider } from "@/context/NotificationContext";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  })
})

const theme = {
  colors: {
    primary: "rgb(75, 83, 188)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(224, 224, 255)",
    onPrimaryContainer: "rgb(0, 0, 110)",
    secondary: "rgb(75, 83, 188)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(224, 224, 255)",
    onSecondaryContainer: "rgb(0, 0, 110)",
    tertiary: "rgb(75, 83, 188)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(224, 224, 255)",
    onTertiaryContainer: "rgb(0, 0, 110)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(27, 27, 31)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(27, 27, 31)",
    surfaceVariant: "rgb(228, 225, 236)",
    onSurfaceVariant: "rgb(70, 70, 79)",
    outline: "rgb(119, 118, 128)",
    outlineVariant: "rgb(199, 197, 208)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(48, 48, 52)",
    inverseOnSurface: "rgb(243, 239, 244)",
    inversePrimary: "rgb(191, 194, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(246, 243, 252)",
      level2: "rgb(241, 238, 250)",
      level3: "rgb(235, 233, 248)",
      level4: "rgb(233, 231, 247)",
      level5: "rgb(230, 228, 246)",
    },
    surfaceDisabled: "rgba(27, 27, 31, 0.12)",
    onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
    backdrop: "rgba(48, 48, 56, 0.4)",
  },
};

export default function RootLayout() {
  return (
    <NotificationProvider>
      <PaperProvider theme={theme}>
        <FeedProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </FeedProvider>
      </PaperProvider>
    </NotificationProvider>
  );
}
