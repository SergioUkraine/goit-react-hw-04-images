import { useState, useEffect, useRef } from 'react';
import * as API from '../services/api';
import { Container, ButtonSkeleton } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import Button from './Button';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Modal from './Modal';

const NUMBER_PER_PAGE = 12;
const HEADER_GAP = 88;

function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [isNewPageExist, setIsNewPageExist] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentResponse, setCurrentResponse] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const lastImageRef = useRef(null);

  useEffect(() => {
    if (searchQuery === '') return;
    async function getImages() {
      try {
        setIsLoading(true);
        const response = await API.getResponse(
          searchQuery,
          currentPage,
          NUMBER_PER_PAGE
        );
        setIsNewPageExist(
          response.totalHits - currentPage * NUMBER_PER_PAGE > 0
        );
        setImages(s => {
          return [...s, ...response.hits];
        });
        setCurrentResponse(response);
      } catch (error) {
        console.log(error);
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  }, [searchQuery, currentPage]);

  useEffect(() => {
    if (isLoading === true || !lastImageRef.current) return;
    const elementPosition = lastImageRef.current.getBoundingClientRect().top;
    const deltaY = elementPosition - HEADER_GAP;
    window.scrollBy({ top: deltaY, behavior: 'smooth' });
  }, [isLoading]);

  useEffect(() => {
    const { total } = currentResponse;
    if (total && currentPage === 1) {
      toast.success(`Found ${total} images`);
    } else if (total === 0) {
      toast.warn('Unfortunately, nothing found');
    } else if (total && !isNewPageExist) {
      toast.success('You`ve already seen all images!');
    }
  }, [currentResponse, currentPage, isNewPageExist]);

  const handleSearchButtonClick = async queryValue => {
    setImages([]);
    await setSearchQuery(''); //для того щоб зображення оновлювались навіть при повторному запиті
    setCurrentPage(1);
    setSearchQuery(queryValue);
  };

  const handleMoreButtonClick = () => {
    setCurrentPage(s => s + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSearchButtonClick} />
      {isLoading ? <Loader /> : null}
      {images && (
        <ImageGallery
          images={images}
          showModal={() => setIsModalShow(s => !s)}
          getImage={image => setCurrentImage(image)}
          perPage={NUMBER_PER_PAGE}
          ref={lastImageRef}
        />
      )}
      {isNewPageExist && !isLoading ? (
        <Button onClick={handleMoreButtonClick} />
      ) : (
        <ButtonSkeleton />
      )}
      {isModalShow && (
        <Modal
          src={currentImage.largeImageURL}
          alt={currentImage.tags}
          hideModal={() => setIsModalShow(s => !s)}
        />
      )}
      {!isModalShow && <ToastContainer />}
    </Container>
  );
}

export default App;
