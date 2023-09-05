import { useState, useEffect } from 'react';
import * as API from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

const NUMBER_PER_PAGE = 12;
const HEADER_FOOTER_GAP = 164;

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewPageExist, setIsNewPageExist] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentResponse, setCurrentResponse] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    if (searchQuery === '') return;
    getImages();
  }, [searchQuery, currentPage]);

  useEffect(() => {
    if (currentResponse !== null) return;
    setIsNewPageExist(
      currentResponse.totalHits - currentPage * NUMBER_PER_PAGE > 0
    );
  }, [images, currentPage]);

  const getImages = async () => {
    try {
      setIsLoading(true);
      const response = await API.getMaterials(
        searchQuery,
        currentPage,
        NUMBER_PER_PAGE
      );
      setImages(s => {
        console.log(s);
        console.log(response.hits);
        return [...s, ...response.hits];
      });
      await setCurrentResponse(response);
      scrollToNextPage();
      toastInfo();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchButtonClick = queruValue => {
    setImages([]);
    setSearchQuery(queruValue);
    setCurrentResponse('');
    setCurrentPage(1);
  };

  const handleMoreButtonClick = () => {
    setCurrentPage(s => s + 1);
  };

  const scrollToNextPage = () => {
    if (currentPage > 1) {
      window.scrollTo({
        top: window.scrollY + (window.innerHeight - HEADER_FOOTER_GAP),
        behavior: 'smooth',
      });
    }
  };

  const toggleModal = () => {
    setIsModalShow(s => !s);
  };

  const getCurrentImage = image => {
    setCurrentImage(image);
  };

  const toastInfo = () => {
    if (currentResponse === null) return;
    const { totalHits } = currentResponse;
    if (totalHits !== 0 && currentPage === 1) {
      toast.success(`Found ${totalHits} images`);
    } else if (totalHits === 0) {
      toast.warn('Unfortunately, nothing found');
    } else if (!isNewPageExist) {
      toast.success('You`ve already seen all images!');
    }
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSearchButtonClick} />
      {images && (
        <ImageGallery
          images={images}
          showModal={toggleModal}
          getImage={getCurrentImage}
        />
      )}
      {isNewPageExist && !isLoading && (
        <Button onClick={handleMoreButtonClick} />
      )}
      {isLoading && <Loader />}
      {isModalShow && (
        <Modal
          src={currentImage.largeImageURL}
          alt={currentImage.tags}
          hideModal={toggleModal}
        />
      )}

      {!isModalShow && <ToastContainer />}
    </Container>
  );
}

export default App;
