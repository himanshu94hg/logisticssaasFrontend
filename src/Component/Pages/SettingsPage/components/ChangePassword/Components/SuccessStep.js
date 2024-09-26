import Lottie from 'react-lottie';
import React, { useState, useEffect } from 'react';
import animationData from './SuccessfullyDone.json'; 

const SuccessStep = () => {
    const [isStopped, setIsStopped] = useState(false);

    const defaultOptions = {
        loop: false, 
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        const animationDuration = (animationData.op / animationData.fr) * 1000;
        const extendedDuration = animationDuration + 2000;
        const timer = setTimeout(() => {
            setIsStopped(true);
        }, extendedDuration);
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
