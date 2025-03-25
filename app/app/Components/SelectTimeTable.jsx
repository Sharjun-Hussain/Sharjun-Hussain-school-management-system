import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

const SelectTimeTable = ({ onSelect, SelectedTimeTable }) => {
  const handleSelect = (value) => {
    onSelect(value);
  };
  return (
    <div className="mx-3 ">
      <div className="w-full">
        <div className="xl:text-lg lg:text-sm text-sm font-bold">
          Select Time Table
        </div>

        {/* Adding margin-top for spacing between heading and select */}
        <Select className="mt-4" onValueChange={handleSelect}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Regular" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem selected value="R_Time">
                Regular
              </SelectItem>
              <SelectItem value="F_Time">Friday</SelectItem>
              <SelectItem value="E_Time">Exams</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectTimeTable;
