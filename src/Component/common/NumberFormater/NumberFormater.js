import React from 'react';

const formatNumber = (num) => {
    if (num == null || isNaN(num)) {
        return '-';
    } else if (num == 0) {
        return '0';
    } else if (num >= 100000) {
        return (num / 100000).toFixed(2) + ' L';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(2) + ' K';
    } else if (num < 0) {
        return '-' + formatNumber(-num);
    } else {
        return num.toString();
    }
};

const NumberFormatter = ({ number }) => {
    return <span>{formatNumber(number)}</span>;
};

export default NumberFormatter;
