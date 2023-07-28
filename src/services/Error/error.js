import errorImage from './img26.jpg'
import css from './Error.module.css';

function ImgErrorView({ message }) {
   return (
      <div role='alert' className={css.errorWrapp}>
         <img src={errorImage} width="240" alt="sasman" />
         <p className={css.errorMessage}> {message}</p>        
      </div>
   );
}
export {ImgErrorView}