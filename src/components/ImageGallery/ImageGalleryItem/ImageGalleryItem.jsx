import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Image } from './ImageGalleryItem.styled';

function ImageGalleryItem({ image, showModal, getImage }) {
  const onImageClick = () => {
    getImage(image);
    showModal();
  };
  return (
    <ListItem>
      <Image
        src={image.largeImageURL}
        alt={image.tags}
        onClick={onImageClick}
        loading="lazy"
      />
    </ListItem>
  );
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
