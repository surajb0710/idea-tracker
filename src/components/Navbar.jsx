import useUser from '../context/useUser';
import PropTypes from 'prop-types';

function Navbar({ hideLoginBtn }) {
  const user = useUser();

  return (
    <nav className="grid">
      <h1 className="text-center app-title">
        <a href="/">Idea tracker</a>
      </h1>
      <div className={`ml-auto ${hideLoginBtn && 'hidden'}`}>
        {user.current ? (
          <>
            <span className="mr-15">{user.current.email}</span>
            <button
              className="login-btn"
              type="button"
              onClick={() => user.logout()}
            >
              Logout
            </button>
          </>
        ) : (
          <a href="/login" className="login-btn">
            Login
          </a>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  hideLoginBtn: PropTypes.bool.isRequired,
};

export default Navbar;
