"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const RFIDCard = ({ student }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex items-center justify-start">
      <motion.div
        className="relative w-[400px] h-56 justify-start items-center perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT SIDE */}
          <div
            className="absolute inset-0 w-full h-full joon-card flex p-0 flex-col "
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-full h-12 bg-blue-600 rounded-t-lg "></div>
            <div className="p-3">
              {/* Cover Image */}

              {/* Profile Image */}
              <div className="w-16 h-16 relative overflow-hidden bg-gray-400 rounded-full border-2 border-white -mt-8">
                <Image
                  width={64}
                  height={64}
                  className=""
                  src={student.studentImage}
                  alt=""
                />
              </div>
              {/* Student Details */}
              <h2 className="text-lg font-semibold mt-2">
                {student.Name} <span className="">{student.Initial}</span>
              </h2>
              <p className="text-sm text-gray-600">
                Index No: {student.indexNumber}
              </p>
              <p className="text-sm text-gray-600">School: G.M.M.S </p>

              {/* Parent Details */}
              <div className="mt-2 text-xs text-gray-500">
                Parent: Mr. {student.parentName} | Contact:{" "}
                {student.parentPhone}
              </div>
            </div>
          </div>

          {/* BACK SIDE */}
          <div
            className="absolute inset-0 w-full h-full bg-gray-800 text-white shadow-lg rounded-lg flex flex-col  justify-between"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* RFID Black Line */}
            <div className="w-full h-10 bg-black mt-2 "></div>
            {/* Instruction Text */}
            <p className="text-xs mb-4 text-center">
              This card is property of G.M.M School. If found,
              <br /> please return to the school office.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RFIDCard;
