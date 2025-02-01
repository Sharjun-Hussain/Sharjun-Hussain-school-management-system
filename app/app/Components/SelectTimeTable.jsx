import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const SelectTimeTable = () => {
  return (
    <div className="mx-3 ">
      <div className="w-full">
        <div className="xl:text-lg lg:text-sm text-sm font-bold">
          Select Time Table
        </div>

        {/* Adding margin-top for spacing between heading and select */}
        <Select className="mt-4">
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select TimeTable" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Regular</SelectLabel>
              <SelectItem selected value="Reqular">
                Reguler
              </SelectItem>
              <SelectItem value="banana">Special</SelectItem>
              <SelectItem value="blueberry">Saturday</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectTimeTable;
