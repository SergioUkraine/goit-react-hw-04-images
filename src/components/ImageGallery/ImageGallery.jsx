import React from 'react';
import { ImageList } from './ImageGallery.styled';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ images }) {
  return (
    <ImageList>
      {images.map(image => {
        return <ImageGalleryItem key={image.id} image={image} />;
      })}
    </ImageList>
  );
}

export default ImageGallery;
