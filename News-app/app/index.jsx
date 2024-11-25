import BottomBar from "@/components/BottomBar";
import NavBar from "@/components/NavBar";
import { registerForPushNotificationsAsync } from "@/api/notificationSetup";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  },[])
  return (
    <>
      <NavBar />
      <BottomBar />
    </>
  );
}
