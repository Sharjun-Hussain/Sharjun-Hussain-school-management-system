"use client";
import React, { memo } from "react";
import { StudentTable } from "./StudentTable";

const StudentPage = () => {
  const BackgroundGradient = memo(({ className }) => {
    return <div className={className} />;
  });

  return (
    <div>
      <div className="relative lg:flex space-y-3 block">
        <BackgroundGradient className="absolute right-0 -top-24 -z-10 bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-2xl h-32 w-32 text-white" />
        <BackgroundGradient className="hidden lg:block absolute left-25 top-20 -z-10 bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-[180px] h-[400px] w-[450px] text-white" />
        <BackgroundGradient className="absolute left-25 top-0 -z-9 bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-[180px] h-[200px] w-[150px] text-white" />
      </div>

      <div className="mx-3">
        <StudentTable data={[]} />
      </div>
    </div>
  );
};

export default StudentPage;
