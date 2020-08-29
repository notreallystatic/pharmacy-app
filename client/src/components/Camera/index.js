import React, { useState } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

export const ClickPicture = (props) => {
  const [dataUri, setDataUri] = useState('');

  function handleTakePhotoAnimationDone(dataUri) {
    setDataUri(dataUri);
    props.setPicture(dataUri);
  }

  const isFullscreen = false;
  return (
    <div>
      {dataUri ? (
        <img src={dataUri} alt='user' />
      ) : (
        <Camera
          onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
          isFullscreen={isFullscreen}
        />
      )}
    </div>
  );
};
