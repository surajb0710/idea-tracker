import { useContext } from 'react';
import IdeasContext from './IdeasContext';

function useIdeas() {
  return useContext(IdeasContext);
}

export default useIdeas;
