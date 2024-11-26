import BottomBar from "@/components/BottomBar";
import NavBar from "@/components/NavBar";
import Loader from "@/components/Loader";
import { useEffect, useContext } from "react";
import { FeedContext } from "@/context/FeedContext";
export default function Index() {
  const { setLoading } = useContext(FeedContext);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      <Loader />
      <NavBar />
      <BottomBar />
    </>
  );
}
