import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from "react-date-range";
import { setDateRange } from "../../../../redux/action/dateRangeActions";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";
import { useLocation } from "react-router-dom";

const DatePickerComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const dateRange = useSelector((state) => state.dateRange);

  // Default: Last 30 Days
  const defaultStartDate = addDays(new Date(), -30);
  const defaultEndDate = new Date();

  // Ensure Redux has default values on first load
  useEffect(() => {
    if (!dateRange?.startDate || !dateRange?.endDate) {
      dispatch(setDateRange(defaultStartDate, defaultEndDate));
    }
  }, [dateRange, dispatch]);

  const [state, setState] = useState([
    {
      startDate: dateRange.startDate || defaultStartDate,
      endDate: dateRange.endDate || defaultEndDate,
      key: "selection",
    },
  ]);

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Last 30 days"); // Track selected range
  const [applyDate, setApplyDate] = useState({
    startDate: dateRange.startDate || defaultStartDate,
    endDate: dateRange.endDate || defaultEndDate,
  });
  const calendarRef = useRef(null);

  // Predefined Ranges
  const predefinedRanges = {
    Today: [new Date(), new Date()],
    Yesterday: [addDays(new Date(), -1), addDays(new Date(), -1)], // Added Yesterday
    "Last 7 Days": [addDays(new Date(), -7), new Date()],
    "Last 30 Days": [addDays(new Date(), -30), new Date()],
    "This Month": [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(),
    ],
    "Last Month": [
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      new Date(new Date().getFullYear(), new Date().getMonth(), 0),
    ],
    "Last 6 Months": [
      new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1),
      new Date(),
    ], // Added Last 6 Months
    "Custom Date": applyDate,
  };

  // Handle predefined button clicks
  const handlePredefinedRangeClick = (range) => {
    setSelectedRange(range);

    if (range === "Custom Date") {
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
      const newRange = {
        startDate: predefinedRanges[range][0],
        endDate: predefinedRanges[range][1],
        key: "selection",
      };
      setState([newRange]);
      setApplyDate(newRange);
      dispatch(setDateRange(newRange.startDate, newRange.endDate));
    }
  };

  // Handle date change in the calendar
  const handleDateChange = (ranges) => {
    setState([ranges.selection]);
    setApplyDate(ranges.selection)
    dispatch(setDateRange(ranges.selection.startDate, ranges.selection.endDate));
  };

  const handleDateApply = () => {
    const { startDate, endDate } = applyDate;
    setSelectedRange(`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
    setShowCalendar(false);
    dispatch(setDateRange(startDate, endDate));
  }

  // Reset Redux date on route change
  useEffect(() => {
    dispatch(setDateRange(defaultStartDate, defaultEndDate));
    setState([{ startDate: defaultStartDate, endDate: defaultEndDate, key: "selection" }]);
    setSelectedRange("Last 30 Days");
  }, [location.pathname]);


  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: "relative", width: "fit-content" }} ref={calendarRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        style={{
          padding: "8px 15px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
          backgroundColor: "#fff",
          fontSize: "14px",
        }}
      >
        {selectedRange === "Custom Date"
          ? `${applyDate.startDate.toLocaleDateString()} - ${applyDate.endDate.toLocaleDateString()}`
          : selectedRange}
      </button>

      {/* Dropdown Menu */}
      {showCalendar && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            backgroundColor: "#fff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            zIndex: 1000,
            padding: "10px",
            width: "250px",
          }}
        >
          {/* Predefined Ranges */}
          <div>
            {Object.keys(predefinedRanges).map((range, index) => (
              <div
                key={index}
                onClick={() => handlePredefinedRangeClick(range)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  backgroundColor: selectedRange === range ? "#f0f0f0" : "transparent",
                  marginBottom: "5px",
                }}
              >
                {range}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show calendar when "Custom Date" is selected */}
      {selectedRange === "Custom Date" && showCalendar && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            right: '246px',
            backgroundColor: "#fff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            zIndex: 1000,
            padding: "10px",
          }}
        >
          <DateRangePicker
            ranges={state}
            onChange={handleDateChange}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            direction="horizontal"
            rangeColors={["#3d91ff"]}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
            <button
              onClick={handleDateApply}
              style={{
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
                border: "1px solid #ccc",
                backgroundColor: "#ddd",
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePickerComponent;
