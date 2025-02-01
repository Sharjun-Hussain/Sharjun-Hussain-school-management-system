"use client";
import React, { useEffect } from "react";
import SoundControl from "./Components/SoundControl";
import MusicPlayer from "./Components/SoundControl";
import Time from "./Components/Time";
import SelectTimeTable from "./Components/SelectTimeTable";
import Timetable from "./Components/TimeTable";

const page = () => {
  useEffect(() => {
    console.log("page started");
  }, []);

  return (
    <div className="">
      <div className="lg:flex space-y-3  block">
        <div className=" -z-10  absolute right-0 top-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-2xl h-32 w-32 text-white"></div>

        <div className=" -z-10 hidden lg:block absolute left-25 top-20  bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-[180px] h-[400px] w-[450px] text-white"></div>
        <div className=" -z-9   absolute left-25 top-0  bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-[180px] h-[200px] w-[150px] text-white"></div>

        <div className="lg:w-1/3  w-full">
          {" "}
          <MusicPlayer />
        </div>
        <div className="mx-3 flex flex-grow">
          <div
            className={`flex items-center justify-between xl:w-full  p-4 lg:w-full w-full rounded-xl shadow-lg backdrop-blur-md transition sm:flex-row flex-col h-auto
          dark:bg-black/30 dark:border-white/20 dark:text-white
          bg-white/30 border-black/20 text-black`}
          >
            {" "}
            <Time />
            <div className="flex flex-col items-center">
              <div className="text-2xl text-center"> 2025-02-03</div>
              <SelectTimeTable />
            </div>
          </div>
        </div>
      </div>
      <div>{/* <Timetable /> */}</div>
    </div>
  );
};

export default page;
