import BottomBar from "@/components/BottomBar";
import NavBar from "@/components/NavBar";
import { useNotification } from "@/context/NotificationContext";
import { useEffect } from "react";

export default function Index() {
  const {expoPushToken, notification, error} = useNotification();

  return (
    <>
      <NavBar />
      <BottomBar />
    </>
  );
}
