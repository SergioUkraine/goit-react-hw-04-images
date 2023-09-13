import React, { forwardRef } from 'react';
import { ImageList } from './ImageGallery.styled';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = forwardRef(
  ({ images, perPage, ...otherProps }, crossRef) => {
    if (!images.length) return null;
    const remainder = images.length % perPage;
    const firstNewImageIndex =
      images.length - perPage + (remainder ? perPage - remainder : 0);

    return (
      <ImageList>
        {images.map((image, index) => {
          return (
            <ImageGalleryItem
              key={image.id}
              image={image}
              {...otherProps}
              ref={index === firstNewImageIndex ? crossRef : null}
            />
          );
        })}
      </ImageList>
    );
  }
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  perPage: PropTypes.number.isRequired,
};

export default ImageGallery;
