import { UserProvider } from './UserProvider';
import { IdeasProvider } from './IdeasProvider';
import PropTypes from 'prop-types';

const Providers = ({ children }) => {
  return (
    <UserProvider>
      <IdeasProvider>{children}</IdeasProvider>
    </UserProvider>
  );
};

Providers.propTypes = {
  children: PropTypes.node.isRequired, // Corrected prop validation
};

export default Providers;
