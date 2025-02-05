"use client";
import { CircleArrowDown } from "lucide-react";
import React, { memo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BarchartData1 } from "./config/Chart/Barchart1";
import NoticeBoard from "./Components/NoticeBoard";
// Ensure this is correctly imported

const BackgroundGradient = memo(({ className }) => {
  return <div className={className} />;
});

const Page = () => {
  const [value, setValue] = useState(new Date());

  return (
    <div>
      {/* Background gradients */}
      <div className="relative lg:flex space-y-3 block">
        <BackgroundGradient className="absolute right-0 -top-24 -z-10 bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-2xl h-32 w-32 text-white" />
        <BackgroundGradient className="hidden lg:block absolute left-25 top-20 -z-10 bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-[180px] h-[400px] w-[450px] text-white" />
        <BackgroundGradient className="absolute left-25 top-0 -z-9 bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-[180px] h-[200px] w-[150px] text-white" />
      </div>

      {/* Flex container for cards and calendar */}
      <div className="mx-3 lg:flex gap-3 items-start ">
        {/* Cards container */}
        <div className="lg:w-2/3 space-y-3">
          {/* Card components */}
          <div className=" w-full flex flex-wrap gap-3">
            <div className="joon-card space-y-3">
              <div className="dark:text-white/70">Students</div>
              <div className="flex justify-between">
                <div className="font-bold text-2xl">540</div>
                <div>
                  <CircleArrowDown size={30} className="rotate-180" />
                </div>
              </div>
            </div>
            <div className="joon-card space-y-3">
              <div className="dark:text-white/70">Teachers</div>
              <div className="flex justify-between">
                <div className="font-bold text-2xl">540</div>
                <div>
                  <CircleArrowDown size={30} className="rotate-180" />
                </div>
              </div>
            </div>
            <div className="joon-card space-y-3">
              <div className="dark:text-white/70">Parents</div>
              <div className="flex justify-between">
                <div className="font-bold text-2xl">540</div>
                <div>
                  <CircleArrowDown size={30} className="rotate-180" />
                </div>
              </div>
            </div>
          </div>

          {/* Barchart */}
          <div className="joon-card  w-full">
            <div className="w-full">
              <h1 className="font-bold md:text-lg text-sm">
                Student Attendance
              </h1>
              <div id="chart">
                <ReactApexChart
                  options={BarchartData1.options}
                  series={BarchartData1.series}
                  type="bar"
                  height={350}
                />
              </div>
            </div>
          </div>
          {/* Noticeboard */}
          <div className="joon-card w-full">
            <NoticeBoard />
          </div>
        </div>

        {/* Calendar container */}
        <div className="lg:w-1/3 w-full">
          <Calendar value={value} onChange={setValue} />
        </div>
      </div>
    </div>
  );
};

export default memo(Page);
