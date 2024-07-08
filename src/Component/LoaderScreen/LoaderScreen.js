import React, { useState } from 'react'
import { ColorRing, Oval } from 'react-loader-spinner'
import './LoaderScreen.css'
import LoaderIcon from '../../assets/image/LoaderIcon.png'
import Loader from 'react-loader-spinner';
import { RotateSpinner } from 'react-spinners-kit';
// import { Spinner } from 'react-spinners-kit';

const LoaderScreen = () => {
  const [LoaderRing, setLoaderRing] = useState(false)
  return (
    <>
      {LoaderRing &&
        <>
          <div className="loader-screen">
            {/* <img src={LoaderIcon} alt="Loader" className="rotating-image" /> */}
            <RotateSpinner size={100} color="#60a9eb" />
          </div>
          <div className="backdrop"></div>
        </>
      }
    </>
  )
}

export default LoaderScreen
