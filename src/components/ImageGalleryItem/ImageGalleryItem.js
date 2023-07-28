import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css'; 

const ImageGalleryItem = ({ id, largeImageURL, webformatURL, onClick }) => {
  return (   
    <div className={styles.itemImageGallery} key={id} onClick={() => onClick(largeImageURL)}>     
      <img className={styles.galleryImage} src={webformatURL} alt="" />
    </div>
  );
};

export default ImageGalleryItem;
ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};