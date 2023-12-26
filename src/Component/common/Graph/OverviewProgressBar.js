// import ProgressBar from 'react-bootstrap/ProgressBar';

// function OverviewProgressBar() {
//   const value = 100;
//   const value2 = 70;
//   const progressBarStyle = {
//     width: '200px',
//     height: '13px' // Adjust the width as needed, you can use percentage or pixels
//   };

//   return (
//     <>    
//     <ProgressBar
//       now={value}
//       label={`${value}%`}
//       variant="danger"
//       style={progressBarStyle}
//     />
//     <ProgressBar
//       now={value}
//       label={`${value}%`}
//       variant=""
//       style={progressBarStyle}
//     />
//     <ProgressBar
//       now={value}
//       label={`${value2}%`}
//       variant="green"
//       style={progressBarStyle}
//     />
//      <ProgressBar label={`${value2}%`} animateOnRender = {true} style={progressBarStyle} bgColor = "green" />
//     </>

//   );
// }

// export default OverviewProgressBar;

import ProgressBar from "@ramonak/react-progress-bar";

export default function App() {
  const value = 40;
  const value2 = 70;

  const mainDiv = {
    width: "300px",
    height: "100px", // Fix the typo here
  };

  const progressBarStyle = {
    width: '30%',
    height: '5px',
  };

  return (
    <div style={mainDiv}>
      <ProgressBar completed={value} bgColor="green" animateOnRender={true} style={progressBarStyle} />
      <br></br>
      <ProgressBar completed={value2} bgColor="red" animateOnRender={true} style={progressBarStyle} />
    </div>
  );
}
