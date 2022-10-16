import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const DateAndTimePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      showTimeSelect
      dateFormat="Pp"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  );
};
