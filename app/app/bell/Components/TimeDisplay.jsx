"use client";
import { useEffect, useState } from "react";
import useFetchTimetable from "../hooks/UseFetchTimeTable";

const TimeComponent = () => {
  const timetable = useFetchTimetable();
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [nextPeriod, setNextPeriod] = useState(null);

  useEffect(() => {
    if (timetable) {
      const now = new Date();
      const current = timetable.periods.find((period) => {
        const start = new Date(`1970-01-01T${period.start}:00`);
        const end = new Date(`1970-01-01T${period.end}:00`);
        return now >= start && now < end;
      });

      const next = timetable.periods.find((period) => {
        const start = new Date(`1970-01-01T${period.start}:00`);
        return now < start;
      });

      setCurrentPeriod(current);
      setNextPeriod(next);
    }
  }, [timetable]);

  return (
    <div>
      <div>Ongoing Period: {currentPeriod?.name}</div>
      <div>Next Period: {nextPeriod?.name}</div>
    </div>
  );
};

export default TimeComponent;
