import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

function Loader() {
  return (
    <div className={ 'flex justify-center mt-4' }>
      <ThreeDots
        color={ '#3b82f6' }
      />
    </div>
  );
}

export default Loader;
