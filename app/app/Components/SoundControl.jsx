"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const songs = [
  {
    title: "National Anthem",
    artist: "Srilanka",
    src: "/srilanka.mp3",
    cover: "/srilanka.jpg",
  },
  {
    title: "School Anthem",
    artist: "GMMS",
    src: "/bell.mp3",
    cover: "/gmms.png",
  },
];

const MusicPlayer = () => {
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null); // Initialize with null

  // Initialize audio only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(songs[currentSongIndex].src);

      const updateTime = () => setCurrentTime(audioRef.current.currentTime);
      const setAudioDuration = () => setDuration(audioRef.current.duration);

      audioRef.current.addEventListener("timeupdate", updateTime);
      audioRef.current.addEventListener("loadedmetadata", setAudioDuration);

      return () => {
        audioRef.current.removeEventListener("timeupdate", updateTime);
        audioRef.current.removeEventListener(
          "loadedmetadata",
          setAudioDuration
        );
      };
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSongIndex].src;
      if (isPlaying) audioRef.current.play();
    }
  }, [currentSongIndex]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const skipForward = () =>
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  const skipBackward = () =>
    setCurrentSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));

  const handleSeek = (e) => {
    if (audioRef.current) {
      const newTime = (e.target.value / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="mx-3">
      <div
        className={`flex  items-center p-4 w-full  rounded-xl shadow-lg backdrop-blur-md transition sm:flex-row flex-col h-auto ${
          theme === "dark"
            ? "bg-black/30 border-white/20 text-white"
            : "bg-white/30 border-black/20 text-black"
        }`}
      >
        {/* Album Art - Hidden on Mobile */}
        <motion.img
          src={songs[currentSongIndex].cover}
          alt="Album Art"
          className="sm:w-1/3 w-0 sm:min-h-full rounded-lg border-2 shadow-lg object-cover hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Song Details & Controls */}
        <div className="sm:ml-4 flex-1 w-full flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-semibold">
            {songs[currentSongIndex].title}
          </h3>
          <p className="text-sm opacity-80">{songs[currentSongIndex].artist}</p>

          {/* Timeline */}
          <div className="w-full flex items-center gap-2 mt-2">
            <span className="text-xs opacity-80">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={(currentTime / duration) * 100 || 0}
              onChange={handleSeek}
              className="w-full accent-white cursor-pointer"
            />
            <span className="text-xs opacity-80">{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-3 w-full">
            <motion.button
              onClick={skipBackward}
              whileTap={{ scale: 0.8 }}
              className="p-2"
            >
              <SkipBack className="h-6 w-6" />
            </motion.button>

            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.button
                  key="pause"
                  onClick={togglePlayPause}
                  className="p-4 rounded-full shadow-lg transition"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Pause className="h-8 w-8" />
                </motion.button>
              ) : (
                <motion.button
                  key="play"
                  onClick={togglePlayPause}
                  className="p-4 rounded-full shadow-lg transition"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Play className="h-8 w-8" />
                </motion.button>
              )}
            </AnimatePresence>

            <motion.button
              onClick={skipForward}
              whileTap={{ scale: 0.8 }}
              className="p-2"
            >
              <SkipForward className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
