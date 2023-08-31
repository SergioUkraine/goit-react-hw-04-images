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
    isLoading: null,
    isNewPageExist: null,
    isModalShow: false,
    searchQuery: null,
    currentResponse: null,
    currentPage: null,
    currentImage: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      (prevState.images !== this.state.images ||
        prevState.currentPage !== this.state.currentPage) &&
      this.state.currentResponse !== null
    ) {
      this.isNewPageExist();
    }
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevState.searchQuery !== this.state.searchQuery
    ) {
      this.getImages();
    }
  }

  getImages = async () => {
    try {
      this.setState({ isLoading: true, isError: false });
      const { searchQuery, currentPage } = this.state;
      const response = await API.getMaterials(
        searchQuery,
        currentPage,
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
          this.scrollToNextPage();
          this.toastInfo();
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  handleSearchButtonClick = queruValue => {
    this.setState({
      currentPage: 1,
      searchQuery: queruValue,
      images: null,
      currentResponse: null,
    });
  };

  handleMoreButtonClick = () => {
    this.setState(prevState => {
      return { currentPage: prevState.currentPage + 1 };
    });
  };

  scrollToNextPage = () => {
    if (this.state.currentPage > 1) {
      window.scrollTo({
        top: window.scrollY + (window.innerHeight - HEADER_FOOTER_GAP),
        behavior: 'smooth',
      });
    }
  };

  isNewPageExist = () => {
    const { currentPage, currentResponse } = this.state;
    const result =
      currentResponse.totalHits - currentPage * NUMBER_PER_PAGE > 0;
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
    const { currentPage, isNewPageExist } = this.state;
    const { totalHits } = this.state.currentResponse;
    if (totalHits !== 0 && currentPage === 1) {
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
        <Searchbar onSubmit={this.handleSearchButtonClick} />
        {images && (
          <ImageGallery
            images={images}
            showModal={this.toggleModal}
            getImage={this.getCurrentImage}
          />
        )}
        {isNewPageExist && !isLoading && (
          <Button onClick={this.handleMoreButtonClick} />
        )}
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
