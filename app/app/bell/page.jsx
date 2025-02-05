"use client";
import React, { useEffect } from "react";
import SelectTimeTable from "../Components/SelectTimeTable";
import MusicPlayer from "../Components/SoundControl";
import Time from "../Components/Time";
import { Pause, Play } from "lucide-react";

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
              <SelectTimeTable />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full justify-start">
        <div className="mx-3 lg:w-1/3 md:w-1/2  w-full">
          <div className="joon-card my-3 w-full">
            <div className="font-bold mb-2 text-lg">Today Schedule</div>
            <div>
              <table className="w-full ">
                <tbody>
                  {Array(7)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index} className="">
                        <td className="p-1 text-start border-r  border-gray-300">
                          07.30 AM - 07.45 AM
                        </td>
                        <td className=" text-center">School Start</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex flex-col mx-3 h-fit  lg:w-2/3 md:w-1/2  w-full">
          <div className="joon-card my-3 w-full">
            <div className="font-bold  text-lg flex justify-between">
              <div> Ongoing Period : 08.20 AM - 09.00 AM </div>|{" "}
              <div>Next Period : 08.20 AM - 09.00 AM</div>
            </div>
          </div>
          <div className="flex mx-auto mt-4 gap-3">
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

export default page;
