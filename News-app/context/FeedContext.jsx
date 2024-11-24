import { createContext, useState } from 'react';

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [feed, setFeed] = useState([]);

  return (
    <FeedContext.Provider value={{ feed, setFeed }}>
      {children}
    </FeedContext.Provider>
  );
};