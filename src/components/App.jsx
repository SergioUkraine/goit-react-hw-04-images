import { Component } from 'react';
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

class App extends Component {
  state = {
    images: null,
    currentResponse: null,
    isLoading: null,
    isNewPageExist: null,
    isModalShow: false,
    searchQuery: null,
    page: null,
    currentImage: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      (prevState.images !== this.state.images ||
        prevState.page !== this.state.page) &&
      this.state.currentResponse !== null
    ) {
      this.isNewPageExist();
    }
  }

  getImages = async () => {
    try {
      this.setState({ isLoading: true, isError: false });
      const { searchQuery, page } = this.state;
      const response = await API.getMaterials(
        searchQuery,
        page,
        NUMBER_PER_PAGE
      );
      this.setState(
        prevState => {
          return {
            images: [...(prevState.images || []), ...response.hits],
            currentResponse: response,
            isLoading: false,
          };
        },
        () => {
          this.scrollToNext();
          this.toastInfo();
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  handleSearchClick = queruValue => {
    this.setState(
      { page: 1, searchQuery: queruValue, images: null, currentResponse: null },
      () => {
        this.getImages();
      }
    );
  };

  handleMoreButtonClick = () => {
    this.setState(
      prevState => {
        return { page: prevState.page + 1 };
      },
      () => {
        this.getImages();
      }
    );
  };

  scrollToNext = () => {
    if (this.state.page > 1) {
      window.scrollTo({
        top: window.scrollY + (window.innerHeight - HEADER_FOOTER_GAP),
        behavior: 'smooth',
      });
    }
  };

  isNewPageExist = () => {
    const { page, currentResponse } = this.state;
    const result = currentResponse.totalHits - page * NUMBER_PER_PAGE > 0;
    this.setState({ isNewPageExist: result });
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { isModalShow: !prevState.isModalShow };
    });
  };

  getCurrentImage = image => {
    this.setState({ currentImage: image });
  };

  toastInfo = () => {
    const { page, isNewPageExist } = this.state;
    const { totalHits } = this.state.currentResponse;
    if (totalHits !== 0 && page === 1) {
      toast.success(`Found ${totalHits} images`);
    } else if (totalHits === 0) {
      toast.warn('Unfortunately, nothing found');
    } else if (!isNewPageExist) {
      toast.success('You`ve already seen all images!');
    }
  };

  render() {
    const { images, isNewPageExist, isLoading, isModalShow } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchClick} />
        {images && (
          <ImageGallery
            images={images}
            showModal={this.toggleModal}
            getImage={this.getCurrentImage}
          />
        )}
        {isNewPageExist && <Button onClick={this.handleMoreButtonClick} />}
        {isLoading && <Loader />}
        {isModalShow && (
          <Modal
            src={this.state.currentImage.largeImageURL}
            alt={this.state.currentImage.tags}
            hideModal={this.toggleModal}
          />
        )}

        {!isModalShow && <ToastContainer />}
      </Container>
    );
  }
}

export default App;
