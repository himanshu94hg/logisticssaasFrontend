import React, { useRef, useEffect, useState } from 'react';

const CustomGraph = () => {
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: '100%', height: '100%' });
    const dummyData = [50, 80, 120, 200, 100]; // Dummy data for demonstration

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            const { width, height } = canvas.parentElement.getBoundingClientRect();
            canvas.width = width;
            canvas.height = height;
            setDimensions({ width, height });
        };

        // Resize canvas initially and on window resize
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw your graph here using canvas API
        ctx.fillStyle = 'blue';
        dummyData.forEach((value, index) => {
            ctx.fillRect(index * (canvas.width / dummyData.length), canvas.height - value, canvas.width / dummyData.length - 5, value);
        });

        // Draw x-axis labels
        ctx.fillStyle = 'black';
        ctx.font = '12px';
        dummyData.forEach((value, index) => {
            ctx.fillText(`Week ${index + 1}`, index * (canvas.width / dummyData.length), canvas.height + 15);
        });
    }, [dimensions]);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default CustomGraph;
