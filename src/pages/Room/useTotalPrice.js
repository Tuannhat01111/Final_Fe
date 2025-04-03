import { useMemo } from 'react';
import moment from 'moment';

const useTotalPrice = (selectedDateRange, pricePerDay) => {
  return useMemo(() => {
    const startDate = moment(selectedDateRange.startDate).startOf('day');
    const endDate = moment(selectedDateRange.endDate).endOf('day');
    const numberOfDays = Math.max(endDate.diff(startDate, 'days')+1, 1);
    return pricePerDay * numberOfDays;
  }, [selectedDateRange, pricePerDay]);
};

export default useTotalPrice;


export const calculateNumberOfDays = (startDate, endDate) => {
  const start = moment(startDate).startOf('day'); 
  const end = moment(endDate).endOf('day'); 
  return Math.max(end.diff(start, 'days') + 1, 1); 
};

