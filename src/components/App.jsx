import React, { Component } from 'react';
import * as API from '../services/api';
import { Container } from './App.styled';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = { images: null, isError: null, isLoading: null };

  getImages = async quary => {
    try {
      this.setState({ isLoading: true, isError: false });
      const images = await API.getMaterials(quary, 1, 12);
      console.log(images.hits);
      this.setState({ images: images.hits, isLoading: false });
    } catch (error) {
      this.setState({ isError: true });
      console.log(error);
    }
  };

  handleSearchClick = async searchQuery => {
    await this.getImages(searchQuery);
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchClick} />
        {this.state.images && <ImageGallery images={this.state.images} />}
      </Container>
    );
  }
}

export default App;
