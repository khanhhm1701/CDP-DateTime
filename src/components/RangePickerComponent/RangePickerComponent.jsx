import { InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const RangePickerComponent = () => {
  const [selectedRange, setSelectedRange] = useState([new Date(), new Date()]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [exactlyNumberDays, setExactlyNumberDays] = useState(1);
  const [lastNumber, setLastNumber] = useState(1);
  const [timeType, setTimeType] = useState("day");
  const [calendarRangeOpen, setCalendarRangeOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [keySelected, setKeySelected] = useState("today");
  const [displayType, setDisplayType] = useState("range");
  const [readOnly, setReadOnly] = useState(false);

  useEffect(() => {
    if (keySelected === "today") {
      setDisplayType("date");
      setSelectedDate(new Date());
      setReadOnly(true);
    }
    if (keySelected === "7days") {
      setDisplayType("range");
      handleQuickSelection(7);
      setReadOnly(true);
    }
    if (keySelected === "15days") {
      setDisplayType("range");
      handleQuickSelection(15);
      setReadOnly(true);
    }
    if (keySelected === "30days") {
      setDisplayType("range");
      handleQuickSelection(30);
      setReadOnly(true);
    }
    if (keySelected === "60days") {
      setDisplayType("range");
      handleQuickSelection(60);
      setReadOnly(true);
    }
    if (keySelected === "this_month") {
      setDisplayType("range");
      handleQuickSelection(0, "this_month");
      setReadOnly(true);
    }
    if (keySelected === "prev_month") {
      setDisplayType("range");
      handleQuickSelection(0, "prev_month");
      setReadOnly(true);
    }
    if (keySelected === "in_the_last") {
      setDisplayType("in_the_last");
      handleQuickSelection(0, "in_the_last", timeType, lastNumber);
      setReadOnly(true);
    }
    if (keySelected === "exactly") {
      setDisplayType("exactly_number");
      handleQuickSelection(exactlyNumberDays);
      setReadOnly(true);
    }
    if (keySelected === "between") {
      setDisplayType("range");
      setReadOnly(false);
      setSelectedRange([new Date(), new Date()]);
      setCalendarRangeOpen(true);
    }
    if (["before", "after", "on"].includes(keySelected)) {
      setDisplayType("date");
      setReadOnly(false);
      setSelectedDate(new Date());
      setCalendarOpen(true);
    }
  }, [keySelected, exactlyNumberDays, timeType, lastNumber]);

  // Handle fuction

  const handleSelectType = (value) => {
    setKeySelected(value);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const handleRangeChange = (dates) => {
    setSelectedRange(dates);
  };

  const handleQuickSelection = (
    days,
    type = null,
    timeType = null,
    lastNumber = null
  ) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    if (type === "this_month") {
      startDate.setDate(1);
    } else if (type === "prev_month") {
      startDate.setDate(1);
      startDate.setMonth(startDate.getMonth() - 1);
      endDate.setDate(0);
    }
    if (type === "in_the_last" && timeType === "day") {
      startDate.setDate(endDate.getDate() - lastNumber);
    }

    if (type === "in_the_last" && timeType === "week") {
      startDate.setDate(endDate.getDate() - 7 * lastNumber);
    }

    if (type === "in_the_last" && timeType === "month") {
      startDate.setMonth(startDate.getMonth() - lastNumber);
    }

    if (type === "in_the_last" && timeType === "year") {
      startDate.setFullYear(startDate.getFullYear() - lastNumber);
    }
    setSelectedRange([startDate, endDate]);
  };

  const handleExactlyChange = (value) => {
    setExactlyNumberDays(value);
  };

  const handleLastNumberChange = (value) => {
    setLastNumber(value);
  };

  const handleSelectTimeType = (value) => {
    setTimeType(value);
  };

  //Option Data

  const dateOptions = [
    {
      value: "today",
      label: "Today",
    },
    {
      value: "7days",
      label: "In the last 7 days",
    },
    {
      value: "15days",
      label: "In the last 15 days",
    },
    {
      value: "30days",
      label: "In the last 30 days",
    },
    {
      value: "60days",
      label: "In the last 60 days",
    },
    {
      value: "this_month",
      label: "This month",
    },
    {
      value: "prev_month",
      label: "Previous month",
    },
    {
      label: "Custom",
      options: [
        { label: "In the last", value: "in_the_last" },
        { label: "Was exactly", value: "exactly" },
      ],
    },
    {
      label: "Calendar",
      options: [
        { label: "Between", value: "between" },
        { label: "Before", value: "before" },
        { label: "After", value: "after" },
        { label: "On", value: "on" },
      ],
    },
  ];

  const timeTypes = [
    {
      value: "day",
      label: "day(s)",
    },
    {
      value: "week",
      label: "week(s)",
    },
    {
      value: "month",
      label: "month(s)",
    },
    {
      value: "year",
      label: "year(s)",
    },
  ];

  const renderComponentBasedOnType = (type) => {
    if (type === "range") {
      return (
        <RangePicker
          className="w-56"
          open={calendarRangeOpen}
          onOpenChange={(status) => setCalendarRangeOpen(status)}
          onChange={handleRangeChange}
          value={
            selectedRange !== null
              ? [dayjs(selectedRange[0]), dayjs(selectedRange[1])]
              : [null, null]
          }
          allowClear={false}
          style={readOnly && { pointerEvents: "none" }}
        />
      );
    } else if (type === "date") {
      return (
        <DatePicker
          onChange={handleSelectDate}
          open={calendarOpen}
          onOpenChange={(status) => setCalendarOpen(status)}
          value={selectedDate !== null ? dayjs(selectedDate) : null}
          style={readOnly && { pointerEvents: "none" }}
          allowClear={false}
        />
      );
    } else if (type === "exactly_number") {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <InputNumber
              min={1}
              max={1000}
              value={exactlyNumberDays}
              onChange={handleExactlyChange}
            />
            <span className="text-sm ml-2">days ago</span>
          </div>
          <RangePicker
            className="w-56"
            open={calendarRangeOpen}
            onOpenChange={(status) => setCalendarRangeOpen(status)}
            onChange={handleRangeChange}
            value={
              selectedRange !== null
                ? [dayjs(selectedRange[0]), dayjs(selectedRange[1])]
                : [null, null]
            }
            style={readOnly && { pointerEvents: "none" }}
            allowClear={false}
          />
        </div>
      );
    } else if (type === "in_the_last") {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <InputNumber
              className="w-24"
              min={1}
              max={1000}
              value={lastNumber}
              onChange={handleLastNumberChange}
            />
            <Select
              className="text-start w-28"
              defaultValue="day"
              onChange={handleSelectTimeType}
              options={timeTypes}
            />
          </div>
          <RangePicker
            className="w-56"
            open={calendarRangeOpen}
            onOpenChange={(status) => setCalendarRangeOpen(status)}
            onChange={handleRangeChange}
            value={
              selectedRange !== null
                ? [dayjs(selectedRange[0]), dayjs(selectedRange[1])]
                : [null, null]
            }
            style={readOnly && { pointerEvents: "none" }}
            allowClear={false}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="flex justify-start gap-4">
      <Select
        className="text-start w-56"
        defaultValue="today"
        onChange={handleSelectType}
        options={dateOptions}
      />
      {renderComponentBasedOnType(displayType)}
    </div>
  );
};

export default RangePickerComponent;
