import { useEffect, useState } from 'react';
import { databases } from '../appwrite';
import { ID, Query } from 'appwrite';
import PropTypes from 'prop-types';
import IdeasContext from './IdeasContext';

export const IDEAS_DATABASE_ID = '676c0736001bce4b81ec'; // Replace with your database ID
export const IDEAS_COLLECTION_ID = '676c0751002a900a03da'; // Replace with your collection ID

export function IdeasProvider({ children }) {
  const [ideas, setIdeas] = useState([]);

  async function add(idea) {
    try {
      const response = await databases.createDocument(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        ID.unique(),
        idea
      );
      setIdeas((ideas) => [response, ...ideas].slice(0, 10));
    } catch (err) {
      console.log(err); // handle error or show user a message
    }
  }

  async function remove(id) {
    try {
      await databases.deleteDocument(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        id
      );
      setIdeas((ideas) => ideas.filter((idea) => idea.$id !== id));
      await init();
    } catch (err) {
      console.log(err);
    }
  }

  async function init() {
    try {
      const response = await databases.listDocuments(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        [Query.orderDesc('$createdAt'), Query.limit(10)]
      );
      setIdeas(response.documents);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <IdeasContext.Provider value={{ current: ideas, add, remove }}>
      {children}
    </IdeasContext.Provider>
  );
}

IdeasProvider.propTypes = {
  children: PropTypes.node.isRequired, // Corrected prop validation
};
