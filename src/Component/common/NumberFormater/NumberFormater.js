import React from 'react';

const formatNumber = (num) => {
    if (num == 0) {
        return '0';
    } else if (num > 99999) {
        return (num / 100000).toFixed(2) + ' L';
    } else if (num > 999) {
        return (num / 1000).toFixed(2) + ' K';
    } else {
        return num.toString();
    }
};

const NumberFormater = ({ number }) => {
    return <span>{formatNumber(number)}</span>;
};

export default NumberFormater;
