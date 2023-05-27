const formatNumber = (number) => {
    if (number < 1000) {
        return number;
    } else if (number > 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else {
        return Math.floor(number / 1000) + 'K';
    }
};

export default formatNumber;
