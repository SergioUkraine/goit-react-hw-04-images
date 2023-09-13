import { useEffect, useRef, useReducer } from 'react';
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

const initState = {
  images: [],
  searchQuery: '',
  isLoading: false,
  isModalShow: false,
  isNewPageExist: false,
  currentPage: 1,
  currentResponse: null,
  currentImage: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'RESET_IMAGES':
      return { ...state, images: [] };
    case 'ADD_IMAGES':
      return { ...state, images: [...state.images, ...action.payload] };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'RESET_SEARCH_QUERY':
      return { ...state, searchQuery: '' };

    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_IS_MODAL_SHOW':
      return { ...state, isModalShow: action.payload };
    case 'SET_IS_NEW_PAGE_EXIST':
      return { ...state, isNewPageExist: action.payload };

    case 'INCREMENT_PAGE':
      return { ...state, currentPage: state.currentPage + action.payload };
    case 'RESET_PAGE':
      return { ...state, currentPage: 1 };

    case 'SET_CURRENT_RESPONSE':
      return { ...state, currentResponse: action.payload };
    case 'RESET_CURRENT_RESPONSE': {
      return { ...state, currentResponse: null };
    }
    case 'SET_CURRENT_IMAGE':
      return { ...state, currentImage: action.payload };

    default:
      throw new Error(`Action ${action.type} is unsupported`);
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  const {
    images,
    isNewPageExist,
    isLoading,
    isModalShow,
    currentPage,
    currentResponse,
    currentImage,
    searchQuery,
  } = state;

  const lastImageRef = useRef(null);

  useEffect(() => {
    if (searchQuery === '') return;
    async function getImages() {
      try {
        dispatch({ type: 'SET_IS_LOADING', payload: true });
        const response = await API.getResponse(
          searchQuery,
          currentPage,
          NUMBER_PER_PAGE
        );

        dispatch({
          type: 'SET_IS_NEW_PAGE_EXIST',
          payload: response.totalHits - currentPage * NUMBER_PER_PAGE > 0,
        });
        dispatch({ type: 'ADD_IMAGES', payload: response.hits });
        dispatch({ type: 'SET_CURRENT_RESPONSE', payload: response });
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({ type: 'SET_IS_LOADING', payload: false });
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
    const { total } = currentResponse || {};
    if (total && currentPage === 1) {
      toast.success(`Found ${total} images`);
    } else if (total === 0) {
      toast.warn('Unfortunately, nothing found');
    } else if (total && !isNewPageExist) {
      toast.success('You`ve already seen all images!');
    }
  }, [currentResponse, currentPage, isNewPageExist]);

  const handleSearchButtonClick = async queryValue => {
    try {
      dispatch({ type: 'RESET_IMAGES' });
    } catch (error) {
      console.error('Error with dispatch for RESET_IMAGES:', error);
    }
    try {
      dispatch({ type: 'RESET_CURRENT_RESPONSE' });
    } catch (error) {
      console.error('Error with dispatch for RESET_CURRENT_RESPONSE:', error);
    }
    try {
      await dispatch({ type: 'RESET_SEARCH_QUERY' });
    } catch (error) {
      console.error('Error with dispatch for RESET_SEARCH_QUERY:', error);
    }
    try {
      dispatch({ type: 'RESET_PAGE' });
    } catch (error) {
      console.error('Error with dispatch for RESET_PAGE:', error);
    }
    try {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: queryValue });
    } catch (error) {
      console.error('Error with dispatch for SET_SEARCH_QUERY:', error);
    }
  };

  const handleMoreButtonClick = () => {
    try {
      dispatch({ type: 'INCREMENT_PAGE', payload: 1 });
    } catch (error) {
      console.error('Error with dispatch for INCREMENT_PAGE:', error);
    }
  };

  const showModal = () => {
    try {
      dispatch({ type: 'SET_IS_MODAL_SHOW', payload: true });
    } catch (error) {
      console.error('Error with dispatch for SET_IS_MODAL_SHOW:', error);
    }
  };

  const hideModal = () => {
    try {
      dispatch({ type: 'SET_IS_MODAL_SHOW', payload: false });
    } catch (error) {
      console.error('Error with dispatch for SET_IS_MODAL_SHOW:', error);
    }
  };

  const getShownImage = image => {
    try {
      dispatch({ type: 'SET_CURRENT_IMAGE', payload: image });
    } catch (error) {
      console.error('Error with dispatch for SET_CURRENT_IMAGE:', error);
    }
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSearchButtonClick} />
      {isLoading ? <Loader /> : null}
      {images && (
        <ImageGallery
          images={images}
          showModal={showModal}
          getShownImage={getShownImage}
          perPage={NUMBER_PER_PAGE}
          ref={lastImageRef}
        />
      )}
      {isNewPageExist && !isLoading ? (
        <Button onClick={handleMoreButtonClick} />
      ) : (
        <ButtonSkeleton />
      )}
      {isModalShow ? (
        <Modal
          src={currentImage.largeImageURL}
          alt={currentImage.tags}
          hideModal={hideModal}
        />
      ) : null}
      {!isModalShow && <ToastContainer />}
    </Container>
  );
}

export default App;
