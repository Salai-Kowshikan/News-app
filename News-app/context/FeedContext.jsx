import { createContext, useState } from "react";

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [feed, setFeed] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <FeedContext.Provider
      value={{ feed, setFeed, saved, setSaved, loading, setLoading }}
    >
      {children}
    </FeedContext.Provider>
  );
};
