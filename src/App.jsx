import { Login } from './pages/Login';
import { Home } from './pages/Home';
import Navbar from './components/Navbar';
import { UserProvider } from './context/UserProvider';
import { IdeasProvider } from './context/IdeasProvider';
// import { Routes, Route } from 'react-router-dom';

function App() {
  const isLoginPage = window.location.pathname === '/login';

  return (
    <UserProvider>
      <IdeasProvider>
        <Navbar hideLoginBtn={isLoginPage} />
        <main>{isLoginPage ? <Login /> : <Home />}</main>
      </IdeasProvider>
    </UserProvider>
  );
}

export default App;
