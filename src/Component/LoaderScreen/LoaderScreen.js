import React, { useState } from 'react'
import './LoaderScreen.css'
// import { RotateSpinner } from 'react-spinners-kit';
// import loaderImage from '../../assets/image/loader-image.png'

const LoaderScreen = ({ LoaderRing }) => {
  return (
    <>
      {LoaderRing &&
        <>
          <div className="loader-screen">
            {/* <RotateSpinner size={100} color="#60a9eb" /> */}
            {/* <img src={loaderImage} /> */}
            <img src="./logo512.png" />
          </div>
          <div className="backdrop"></div>
        </>
      }
    </>
  )
}

export default LoaderScreen
