import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ pictureData, onClick }) => (
  <ul className={styles.galleryList}>
    {pictureData.map(({ id, largeImageURL, webformatURL }) => (
      <ImageGalleryItem
        key={id}
        largeImageURL={largeImageURL}
        webformatURL={webformatURL}
        onClick={onClick}
      />
    ))}
  </ul>
);

export default ImageGallery;

ImageGallery.propTypes = {
  pictureData: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};