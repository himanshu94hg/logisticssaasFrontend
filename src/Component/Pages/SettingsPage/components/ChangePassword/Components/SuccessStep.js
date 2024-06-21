import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import animationData from './SuccessfullyDone.json'; // Replace with the path to your Lottie JSON file

const SuccessStep = () => {
    const [isStopped, setIsStopped] = useState(false);

    const defaultOptions = {
        loop: false, // Do not loop the animation
        autoplay: true, // Start playing automatically
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        // Calculate the duration of the animation in milliseconds
        const animationDuration = (animationData.op / animationData.fr) * 1000;

        // Extend the playing time by an additional duration (e.g., 2000 milliseconds)
        const extendedDuration = animationDuration + 2000;

        // Set a timeout to stop the animation after the extended duration
        const timer = setTimeout(() => {
            setIsStopped(true);
        }, extendedDuration);

        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <Lottie
                options={defaultOptions}
                height={200}
                width={200}
                isStopped={isStopped}
                isPaused={false}
            />
            <p className='text-center mt-4'>Your Password has been changed Successfully!</p>
        </div>
    );
};

export default SuccessStep;
