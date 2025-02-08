import { MoreVertical } from "lucide-react";
import React from "react";

const NoticeBoard = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold lg:text-xl text-sm">NoticeBoard</h1>
          <h3 className="lg:text-sm text-xs -mt-1">
            Display the school Updates
          </h3>
        </div>
        <div>
          <MoreVertical />
        </div>
      </div>

      <div className="mt-3">
        <div></div>
      </div>
    </div>
  );
};

export default NoticeBoard;
