import { LoaderContainer } from './Loader.styled';
import { RotatingLines } from 'react-loader-spinner';

function Loader() {
  return (
    <LoaderContainer>
      <RotatingLines
        strokeColor="#3f51b5"
        strokeWidth="5"
        animationDuration="0.5"
        width="96"
        visible={true}
      />
    </LoaderContainer>
  );
}

export default Loader;
