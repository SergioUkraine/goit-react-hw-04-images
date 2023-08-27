import { ListItem, Image } from './ImageGalleryItem.styled';

function ImageGalleryItem({ image }) {
  return (
    <ListItem>
      <Image src={image.largeImageURL} alt={image.tags} />
    </ListItem>
  );
}

export default ImageGalleryItem;
