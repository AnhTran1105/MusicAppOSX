import moment from 'moment';

export const Moment = (timeStamp) => {
    const curTimeStampObj = moment.unix(moment().unix());
    const timeStampObj = moment.unix(timeStamp);
    const diffMinute = curTimeStampObj.diff(timeStampObj, 'minutes');

    if (diffMinute < 60) {
        return diffMinute + ' phút trước';
    }

    const diffHour = curTimeStampObj.diff(timeStampObj, 'hours');

    if (diffHour <= 12) {
        return diffHour + ' giờ trước';
    }

    const diffDate = curTimeStampObj.diff(timeStampObj, 'days');

    if (diffDate === 0) return 'Hôm nay';
    else if (diffDate === 1) return 'Hôm qua';
    else if (diffDate > 1 && diffDate < 7) return diffDate + ' ngày trước';
    else if (diffDate === 7) return '1 tuần trước';
    else if (diffDate > 7) return (diffDate % 7) + ' tuần trước';
};
