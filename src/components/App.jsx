import React, { Component } from 'react';
import * as API from '../services/api';
import { Container } from './App.styled';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';

const NUMBER_PER_PAGE = 12;

class App extends Component {
  state = {
    images: null,
    currentResponse: null,
    isError: null,
    isLoading: null,
    isNewPageExist: null,
    searchQuery: null,
    page: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.images !== this.state.images ||
      (prevState.page !== this.state.page && prevState.page !== null)
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
      this.setState(prevState => {
        return {
          images: [...(prevState.images || []), ...response.hits],
          currentResponse: response,
          isLoading: false,
        };
      });
    } catch (error) {
      this.setState({ isError: true });
      console.log(error);
    }
  };

  handleSearchClick = queruValue => {
    this.setState({ page: 1, searchQuery: queruValue }, () => {
      this.getImages();
    });
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

  isNewPageExist = () => {
    const { page, currentResponse } = this.state;
    const result = currentResponse.totalHits - page * NUMBER_PER_PAGE > 0;
    this.setState({ isNewPageExist: result });
  };

  render() {
    const { images, isNewPageExist } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchClick} />
        {images && <ImageGallery images={images} />}
        {isNewPageExist && <Button onClick={this.handleMoreButtonClick} />}
      </Container>
    );
  }
}

export default App;
