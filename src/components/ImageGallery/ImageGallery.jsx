import React from 'react';
import { ImageList } from './ImageGallery.styled';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ images, ...otherProps }) {
  return (
    <ImageList>
      {images.map(image => {
        return (
          <ImageGalleryItem key={image.id} image={image} {...otherProps} />
        );
      })}
    </ImageList>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
