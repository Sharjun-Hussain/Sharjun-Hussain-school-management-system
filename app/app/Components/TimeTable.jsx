"use client";

import { useState, useEffect } from "react";

// Sample timetable data
const timetable = {
  Monday: {
    Primary: [
      {
        time: "07:30 AM - 07:45 AM",
        subject: "Qirath & Assembly",
        teacher: "School Staff",
      },
      {
        time: "07:45 AM - 08:25 AM",
        subject: "Mathematics",
        teacher: "Mr. John",
      },
      { time: "08:25 AM - 09:05 AM", subject: "English", teacher: "Ms. Emma" },
      {
        time: "09:05 AM - 09:15 AM",
        subject: "Dua & Attendance Marking",
        teacher: "Class Teachers",
      },
      { time: "09:15 AM - 09:55 AM", subject: "Science", teacher: "Dr. Smith" },
      { time: "09:55 AM - 10:35 AM", subject: "History", teacher: "Mr. Brown" },
      {
        time: "10:35 AM - 10:50 AM",
        subject: "Interval",
        teacher: "School Break",
      },
      {
        time: "10:50 AM - 11:30 AM",
        subject: "Art & Craft",
        teacher: "Ms. Olivia",
      },
      {
        time: "11:30 AM - 12:10 PM",
        subject: "Islamic Studies",
        teacher: "Dr. Ahmed",
      },
      { time: "12:30 PM", subject: "🏫 School Leave", teacher: "School Staff" },
    ],
    Senior: [
      {
        time: "07:30 AM - 07:45 AM",
        subject: "Qirath & Assembly",
        teacher: "School Staff",
      },
      { time: "07:45 AM - 08:25 AM", subject: "Physics", teacher: "Dr. Alex" },
      {
        time: "08:25 AM - 09:05 AM",
        subject: "Chemistry",
        teacher: "Ms. Olivia",
      },
      {
        time: "09:05 AM - 09:15 AM",
        subject: "Dua & Attendance Marking",
        teacher: "Class Teachers",
      },
      { time: "09:15 AM - 09:55 AM", subject: "Biology", teacher: "Dr. James" },
      {
        time: "09:55 AM - 10:35 AM",
        subject: "Computer Science",
        teacher: "Ms. Anna",
      },
      {
        time: "10:35 AM - 10:50 AM",
        subject: "Interval",
        teacher: "School Break",
      },
      {
        time: "10:50 AM - 11:30 AM",
        subject: "Islamic Studies",
        teacher: "Dr. Ahmed",
      },
      {
        time: "11:30 AM - 12:10 PM",
        subject: "Ethics & Morality",
        teacher: "Mr. Brown",
      },
      {
        time: "12:10 PM - 01:00 PM",
        subject: "Lunch Break",
        teacher: "School Break",
      },
      {
        time: "01:00 PM - 01:40 PM",
        subject: "Advanced Mathematics",
        teacher: "Mr. Daniel",
      },
      {
        time: "01:40 PM - 02:10 PM",
        subject: "Physical Education",
        teacher: "Coach Leo",
      },
      { time: "02:10 PM", subject: "🏫 School Leave", teacher: "School Staff" },
    ],
  },
};

export default function Timetable() {
  const days = Object.keys(timetable);
  const [selectedSection, setSelectedSection] = useState("Primary");
  const [currentDay, setCurrentDay] = useState("Monday");

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    if (days.includes(today)) {
      setCurrentDay(today);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4">
        📅 Today's Timetable
      </h2>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setSelectedSection("Primary")}
          className={`px-4 py-2 rounded ${
            selectedSection === "Primary"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          🏫 Primary
        </button>
        <button
          onClick={() => setSelectedSection("Senior")}
          className={`px-4 py-2 rounded ${
            selectedSection === "Senior"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          🎓 Senior
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-center mb-2">
          {selectedSection} Section
        </h3>
        <ul>
          {timetable[currentDay]?.[selectedSection]?.map((entry, index) => (
            <li key={index} className="p-2 border-b">
              ⏰ {entry.time} - <strong>{entry.subject}</strong> (
              {entry.teacher})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
