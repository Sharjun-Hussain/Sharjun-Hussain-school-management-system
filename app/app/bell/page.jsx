"use client";
import React, { useEffect, useRef, useState } from "react";
import SelectTimeTable from "../Components/SelectTimeTable";
import MusicPlayer from "../Components/SoundControl";
import Time from "../Components/Time";
import { Pause, Play, Settings } from "lucide-react";
import useFetchTimetable from "./hooks/UseFetchTimeTable";
import { Skeleton } from "@/components/ui/skeleton";
import Timetable from "./Components/TimeTable";
import TimetableDialog from "./Components/TimeTableEditor";
import { Button } from "@/components/ui/button";

const Page = () => {
  const audioRef = useRef(null);
  const [SelectedTimeTable, setSelectedTimeTable] = useState("R_Time");
  const { timetable: TimetableData, loading: timeTableLoading } =
    useFetchTimetable({ type: SelectedTimeTable });
  // const [audio] = useState(new Audio("/bell.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);
  // const togglePlay = () => {
  //   if (isPlaying) {
  //     audio.pause();
  //   } else {
  //     audio.play();
  //   }
  //   setIsPlaying(!isPlaying);
  // };

  useEffect(() => {
    // Initialize the Audio object only on the client
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/bell.mp3");
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const handleTimeTableChange = (value) => {
    setSelectedTimeTable(value);
  };

  return (
    <div className="">
      <div className="lg:flex space-y-3  block">
        <div className=" -z-10  absolute right-0 top-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-2xl h-32 w-32 text-white"></div>

        <div className=" -z-10 hidden lg:block absolute left-25 top-20  bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-[180px] h-[400px] w-[450px] text-white"></div>
        <div className=" -z-9   absolute left-25 top-0  bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-[180px] h-[200px] w-[150px] text-white"></div>

        <div className="lg:w-1/3  w-full">
          {" "}
          {/* <ReactAudioPlayer src="my_audio_file.ogg" autoPlay controls /> */}
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
              <SelectTimeTable onSelect={handleTimeTableChange} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full justify-start">
        <div className="mx-3 lg:w-1/3 md:w-1/2  w-full">
          <div className="joon-card my-3 w-full">
            <div className="flex justify-between">
              {" "}
              <div className="font-bold mb-2 text-lg">Today Schedule</div>
              <TimetableDialog
                triggerButton={
                  <Settings className="h-4 w-4 me-2 mt-2 hover:cursor-pointer" />
                }
              />{" "}
            </div>
            {timeTableLoading && (
              <div>
                {Array(12)
                  .fill(0)
                  .map((_, index) => {
                    return <Skeleton className="h-9 w-full my-1" key={index} />;
                  })}
                <Skeleton className="h-9 w-full my-1" />
              </div>
            )}
            <Timetable
              timeTableLoading={timeTableLoading}
              timetable={TimetableData}
            />
          </div>
        </div>
        <div className="flex flex-col mx-3 lg:ms-0 h-fit  lg:w-2/3 md:w-1/2  w-full">
          <div className="joon-card my-3 w-full">
            <div className="font-bold  text-lg flex justify-between">
              <div> Ongoing Period : period 1</div>|{" "}
              <div>Next Period : Period 2</div>
            </div>
          </div>
          <div className="flex mx-auto mt-4 gap-3">
            <button onClick={togglePlay}>
              <div
                className="cursor-pointer w-20 h-20 dark:text-white hover:bg-amber-800/55
    bg-amber-400/40 border-black/20 text-black p-3  shadow-lg backdrop-blur-md transition   rounded-full flex items-center justify-center"
              >
                <div className="text-sm ">
                  <div className="flex">
                    {" "}
                    <Play size={16} /> / <Pause size={16} />
                  </div>
                </div>
              </div>
            </button>
            <div
              className=" cursor-pointer w-20 h-20 dark:text-white  hover:bg-green-800/55
    bg-green-400/40 border-black/20 text-black p-3  shadow-lg backdrop-blur-md transition   rounded-full flex items-center justify-center"
            >
              <div className="text-sm ">
                <div className="flex">
                  {" "}
                  <Play size={16} />
                </div>
              </div>
            </div>
            <div
              className="cursor-pointer w-20 h-20  dark:text-white hover:dark:blue-800/35 hover:bg-blue-800/55
    bg-blue-400/40 border-black/20 text-black p-3  shadow-lg backdrop-blur-md transition   rounded-full flex items-center justify-center"
            >
              <div className="text-sm ">
                <div className="flex">
                  {" "}
                  <Play size={16} />
                </div>
              </div>
            </div>
            <div
              className="cursor-pointer w-20 h-20 dark:text-white  hover:bg-red-800/55
    bg-red-400/40 border-black/20 text-black p-3  shadow-lg backdrop-blur-md transition   rounded-full flex items-center justify-center"
            >
              <div className="text-sm ">
                <div className="flex">
                  {" "}
                  <Play size={16} />
                </div>
              </div>
            </div>
            <div
              className="cursor-pointer w-20 h-20  dark:text-white hover:bg-yellow-800/55
    bg-yellow-400/40 border-black/20 text-black p-3  shadow-lg backdrop-blur-md transition   rounded-full flex items-center justify-center"
            >
              <div className="text-sm ">
                <div className="flex">
                  {" "}
                  <Play size={16} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-10 mt-12">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-green-400/40 " /> -{" "}
              <div>School Start Bell</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-amber-400/40 " /> -{" "}
              <div>School Start Bell</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-yellow-400/40 " /> -{" "}
              <div>School Start Bell</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-blue-400/40 " /> -{" "}
              <div>Intervel Bell</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-red-400/40 " /> -{" "}
              <div>School Over Bell</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
