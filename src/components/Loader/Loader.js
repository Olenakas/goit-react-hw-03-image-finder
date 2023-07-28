import React from 'react';
import css from './Loader.module.css';
import { BallTriangle} from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={css.load}>     
        <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#004385"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
        /> Download
    </div>
  );
};
export { Loader };