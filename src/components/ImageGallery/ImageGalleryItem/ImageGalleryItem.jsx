import { Component } from 'react';
import { ListItem, Image } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  onImageClick = () => {
    const { image, showModal, getImage } = this.props;
    getImage(image);
    showModal();
  };

  render() {
    const { image } = this.props;
    return (
      <ListItem>
        <Image
          src={image.largeImageURL}
          alt={image.tags}
          onClick={this.onImageClick}
        />
      </ListItem>
    );
  }
}

export default ImageGalleryItem;
