"use client";
import { useEffect, useState } from "react";
import { get, ref, onValue, set, push, remove } from "firebase/database";
import { database } from "../firebase";

const useFetchTimetable = ({ type = "R_Time" }) => {
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState({
    databaseInitialized: !!database,
    fetchAttempted: false,
    snapshotExists: false,
    rawData: null,
    processedData: null,
  });

  useEffect(() => {
    // Define fetchTimetable inside the effect
    const fetchTimetable = async () => {
      try {
        setDebugInfo((prev) => ({ ...prev, fetchAttempted: true }));
        console.log("Attempting to fetch from timetable path...");

        const timetableRef = ref(database, type);
        console.log("Reference created:", timetableRef);

        // Method 1: Using get()
        const snapshot = await get(timetableRef);
        console.log("Snapshot received:", snapshot);

        if (snapshot.exists()) {
          console.log("Snapshot exists!");
          setDebugInfo((prev) => ({
            ...prev,
            snapshotExists: true,
            rawData: snapshot.val(),
          }));

          const rTimeString = snapshot.val();
          console.log("Raw data:", rTimeString);

          if (typeof rTimeString === "string") {
            const rTimeArray = rTimeString
              .split(",")
              .map((time) => parseInt(time));
            console.log("Processed array:", rTimeArray);
            setDebugInfo((prev) => ({ ...prev, processedData: rTimeArray }));
            setTimetable(rTimeArray);
          } else {
            console.log("Unexpected data format:", typeof rTimeString);
            setDebugInfo((prev) => ({ ...prev, processedData: rTimeString }));
            setTimetable(rTimeString); // Just use whatever we got
          }
        } else {
          console.log("No data exists at timetable path");
          setTimetable([]);
        }
      } catch (err) {
        console.error("Error fetching timetable:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // Method 2: Using onValue as a fallback
    const setupRealTimeListener = () => {
      console.log("Setting up real-time listener as fallback");
      const timetableRef = ref(database, type);

      const unsubscribe = onValue(
        timetableRef,
        (snapshot) => {
          console.log("Real-time listener received data:", snapshot.exists());

          if (snapshot.exists()) {
            const rTimeString = snapshot.val();
            console.log("Real-time raw data:", rTimeString);

            if (typeof rTimeString === "string") {
              const rTimeArray = rTimeString
                .split(",")
                .map((time) => parseInt(time));
              console.log("Real-time processed array:", rTimeArray);
              setTimetable(rTimeArray);
            } else {
              console.log("Real-time unexpected format:", typeof rTimeString);
              setTimetable(rTimeString);
            }
          } else {
            console.log("Real-time listener: No data at path");
            setTimetable([]);
          }

          setLoading(false);
        },
        (error) => {
          console.error("Real-time listener error:", error);
          setError(error);
          setLoading(false);
        }
      );

      return unsubscribe;
    };

    // Fetch timetable and setup listener
    fetchTimetable();
    const unsubscribe = setupRealTimeListener();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [type]); // Ensure that the effect reruns when `type` changes

  // Update the entire timetable
  const updateTimetable = async (newTimes) => {
    try {
      await set(ref(database, type), newTimes.join(","));
      setTimetable(newTimes);
      return true;
    } catch (err) {
      console.error("Error updating timetable:", err);
      setError(err);
      return false;
    }
  };

  // Add a new period to the timetable
  const addPeriod = async (newTime) => {
    try {
      if (!timetable) {
        // Initialize with single period if timetable doesn't exist
        await updateTimetable([newTime]);
      } else {
        // Add to existing timetable
        const newTimes = [...timetable, newTime];
        await updateTimetable(newTimes);
      }
      return true;
    } catch (err) {
      console.error("Error adding period:", err);
      setError(err);
      return false;
    }
  };

  // Delete a period at the specified index
  const deletePeriod = async (index) => {
    try {
      if (!timetable || index < 0 || index >= timetable.length) {
        throw new Error("Invalid index or timetable not loaded");
      }

      const newTimes = [...timetable];
      newTimes.splice(index, 1);
      await updateTimetable(newTimes);
      return true;
    } catch (err) {
      console.error("Error deleting period:", err);
      setError(err);
      return false;
    }
  };

  // Update a single period at the specified index
  const updatePeriod = async (index, newTime) => {
    try {
      if (!timetable || index < 0 || index >= timetable.length) {
        throw new Error("Invalid index or timetable not loaded");
      }

      const newTimes = [...timetable];
      newTimes[index] = newTime;
      await updateTimetable(newTimes);
      return true;
    } catch (err) {
      console.error("Error updating period:", err);
      setError(err);
      return false;
    }
  };

  // Clear the entire timetable
  const clearTimetable = async () => {
    try {
      await set(ref(database, type), "");
      setTimetable([]);
      return true;
    } catch (err) {
      console.error("Error clearing timetable:", err);
      setError(err);
      return false;
    }
  };

  return {
    timetable,
    loading,
    error,
    debugInfo,
    updateTimetable,
    addPeriod,
    deletePeriod,
    updatePeriod,
    clearTimetable,
  };
};

export default useFetchTimetable;
