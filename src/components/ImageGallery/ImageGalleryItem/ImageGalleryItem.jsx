import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ListItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = forwardRef(
  ({ image, showModal, getShownImage }, ref) => {
    const onImageClick = () => {
      getShownImage(image);
      showModal();
    };
    return (
      <ListItem>
        <Image
          ref={ref}
          src={image.largeImageURL}
          alt={image.tags}
          onClick={onImageClick}
          loading="lazy"
        />
      </ListItem>
    );
  }
);

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  showModal: PropTypes.func.isRequired,
  getShownImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
