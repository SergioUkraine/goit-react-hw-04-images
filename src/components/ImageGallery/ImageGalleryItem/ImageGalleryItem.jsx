import { Component } from 'react';
import PropTypes from 'prop-types';
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
          loading="lazy"
        />
      </ListItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  showModal: PropTypes.func.isRequired,
  getImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
