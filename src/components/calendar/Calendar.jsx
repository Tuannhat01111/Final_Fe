import React from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import './Calendar.scss'
const DatePicker = ({
  value,
  onChange,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={["#0ea5e9"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      months={2}
      direction="horizontal"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};

export default DatePicker;
