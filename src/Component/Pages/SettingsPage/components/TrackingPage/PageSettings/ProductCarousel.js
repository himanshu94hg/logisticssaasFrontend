import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './ProductCarousel.css';

const ProductCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = [
        { id: 1, src: 'https://picsum.photos/id/1024/600/400', alt: 'Item 1' },
        { id: 2, src: 'https://picsum.photos/id/1025/600/400', alt: 'Item 2' },
        { id: 3, src: 'https://picsum.photos/id/1026/600/400', alt: 'Item 3' },
        { id: 4, src: 'https://picsum.photos/id/1027/600/400', alt: 'Item 4' },
        { id: 5, src: 'https://picsum.photos/id/1028/600/400', alt: 'Item 5' },
    ];

    const visibleItems = 3;
    const totalItems = items.length;
    const autoPlayDelay = 3000;
    let autoPlayInterval;

    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
        }, autoPlayDelay);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay(); // Cleanup on unmount
    }, []);

    const nextItem = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
    };

    const prevItem = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
    };

    return (
        <div className="carousel-container">
            <div className="carousel-items">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className="carousel-item"
                        style={{
                            display: index >= currentIndex && index < currentIndex + visibleItems ? 'block' : 'none',
                        }}
                    >
                        <img src={item.src} alt={item.alt} />
                    </div>
                ))}
            </div>
            <div className="carousel-nav">
                <button className="prev" onClick={prevItem}>上一個</button>
                <button className="next" onClick={nextItem}>下一個</button>
            </div>
            <div className="carousel-dots">
                {items.map((_, index) => (
                    <span
                        key={index}
                        className={currentIndex === index ? 'active' : ''}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}

export default ProductCarousel;
