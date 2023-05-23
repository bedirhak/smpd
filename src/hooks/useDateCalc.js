import { useEffect } from "react";

const useDateCalc = (seconds, nanoseconds) => {

    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
    const date = new Date(milliseconds);
    const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];
    const year = date.getFullYear();
    const day = date.getDate();

  return `${day} ${monthName} ${year}`;
};

export default useDateCalc;