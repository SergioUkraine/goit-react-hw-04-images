import React from 'react';
import { ImageList } from './ImageGallery.styled';
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

export default ImageGallery;
