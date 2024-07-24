import './LoaderScreen.css'
const LoaderScreen = ({ loading }) => {
  return (
    <>
      {loading &&
        <>
          <div className="loader-screen">
            <img src="./logo512.png" />
          </div>
          <div className="backdrop"></div>
        </>
      }
    </>
  )
}

export default LoaderScreen
