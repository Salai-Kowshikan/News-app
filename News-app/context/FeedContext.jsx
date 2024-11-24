import { createContext, useState } from "react";

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [feed, setFeed] = useState([]);
  const [saved, setSaved] = useState([]);
  return (
    <FeedContext.Provider value={{ feed, setFeed, saved, setSaved }}>
      {children}
    </FeedContext.Provider>
  );
};
