import { ID } from 'appwrite';
import { useEffect, useState } from 'react';
import { account } from '../appwrite';
import PropTypes from 'prop-types';
import UserContext from './UserContext';

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const loggedIn = await account.createEmailPasswordSession(email, password);
    setUser(loggedIn);
    window.location.replace('/');
  }

  async function logout() {
    await account.deleteSession('current');
    setUser(null);
  }

  async function register(email, password) {
    await account.create(ID.unique(), email, password);
    await login(email, password);
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired, // Corrected prop validation
};
