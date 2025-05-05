import React from "react";
import PropTypes from "prop-types";

// Utility function to format time
const formatTime = (time) => {
  if (typeof time !== "number") return "Invalid Time";

  const str = time.toString().padStart(6, "0"); // ensures at least 6 digits
  let hours = parseInt(str.slice(0, 2), 10);
  const minutes = str.slice(2, 4);
  const seconds = str.slice(4, 6);

  // Basic validations
  if (
    hours < 0 ||
    hours > 23 ||
    parseInt(minutes) > 59 ||
    parseInt(seconds) > 59
  ) {
    return "Invalid Time";
  }

  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  // Format output based on seconds
  const formatted =
    seconds === "00"
      ? `${hours}:${minutes} ${period}`
      : `${hours}:${minutes}:${seconds} ${period}`;

  return formatted;
};

// Predefined periods for the timetable
const PERIODS = [
  "School Start Bell",
  "Period 1",
  "Period 2",
  "Period 3",
  "Period 4",
  "Period 5",
  "Interval Bell",
  "Period 6",
  "Period 7",
  "Period 8",
  "Period 9",
  "School Over Bell",
];

const Timetable = ({ timetable, loading, error }) => {
  if (loading) {
    return <p className="text-center text-gray-600">Loading timetable...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-600">
        Error loading timetable: {error.message}
      </p>
    );
  }

  if (!timetable || timetable.length === 0) {
    return (
      <p className="text-center text-gray-600">No timetable data available.</p>
    );
  }

  return (
    <div>
      {timetable && (
        <table className="w-full ">
          <tbody>
            {timetable.map((time, index) => (
              <tr key={index} className="">
                <td className="p-1 text-start border-r  border-gray-300">
                  {formatTime(time)}
                </td>
                <td className=" text-center">{PERIODS[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Prop type validation
Timetable.propTypes = {
  timetable: PropTypes.arrayOf(PropTypes.number),
  loading: PropTypes.bool,
  error: PropTypes.object,
};

// Default props
Timetable.defaultProps = {
  timetable: [],
  loading: false,
  error: null,
};

export default Timetable;
