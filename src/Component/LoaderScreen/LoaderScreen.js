import React, { useState } from 'react'
import './LoaderScreen.css'
import { RotateSpinner } from 'react-spinners-kit';

const LoaderScreen = ({LoaderRing}) => {
  return (
    <>
      {LoaderRing &&
        <>
          <div className="loader-screen">
            <RotateSpinner size={100} color="#60a9eb" />
          </div>
          <div className="backdrop"></div>
        </>
      }
    </>
  )
}

export default LoaderScreen
