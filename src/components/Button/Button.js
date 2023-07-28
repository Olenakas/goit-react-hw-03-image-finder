import PropTypes from 'prop-types';
import css from './Button.module.css';

const LoadMore = ({ onClick }) => {
  return ( 
    <div className={css.buttonContainer}>
      <button className={css.button} type="button" onClick={onClick}>
        Load More
      </button>
    </div>
  );
};

export default LoadMore;

LoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};
