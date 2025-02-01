"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TimeSlider = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const schoolStartTime = new Date();
  const primaryEndTime = new Date();
  const seniorEndTime = new Date();

  // Set school times
  schoolStartTime.setHours(7, 30, 0); // 7:30 AM
  primaryEndTime.setHours(12, 30, 0); // 12:30 PM
  seniorEndTime.setHours(23, 10, 0); // 2:10 PM

  // Determine school type based on time
  const isPrimaryTime = currentTime < primaryEndTime;
  const isSeniorTime =
    currentTime >= primaryEndTime && currentTime < seniorEndTime;
  const isSchoolOver = currentTime >= seniorEndTime;

  // Calculate progress percentage
  const totalTime = isSeniorTime
    ? seniorEndTime - schoolStartTime
    : primaryEndTime - schoolStartTime;
  const elapsedTime = currentTime - schoolStartTime;
  const progress = Math.min((elapsedTime / totalTime) * 100, 100);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="">
      {/* Current Time */}
      <div className="text-start text-3xl font-bold mb-4">
        {currentTime.toLocaleTimeString()}
      </div>

      {/* Animated Progress Bar */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className={`h-2 rounded-lg ${
          isSchoolOver
            ? "bg-red-500"
            : isSeniorTime
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
      ></motion.div>

      {/* School Time Status */}
      <div className="text-center mt-4 text-lg font-semibold">
        {isSchoolOver ? (
          <span className="text-red-600"> School is Over</span>
        ) : isSeniorTime ? (
          <span className="text-yellow-600"> Senior Section Ongoing</span>
        ) : (
          <span className="text-green-600"> Primary Section Ongoing</span>
        )}
      </div>

      {/* Time Labels */}
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <span>7:30 AM</span>
        <span>{isSeniorTime ? "2:10 PM" : "12:30 PM"}</span>
      </div>
    </div>
  );
};

export default TimeSlider;
