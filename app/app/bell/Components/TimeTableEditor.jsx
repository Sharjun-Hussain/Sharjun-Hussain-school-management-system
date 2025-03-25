"use client";
import { useState, useEffect } from "react";
import { Clock, Calendar, AlertTriangle, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import useFetchTimetable from "../hooks/UseFetchTimeTable";
// Adjust the path as needed

const timetableTypes = [
  { id: "R_Time", label: "Regular", icon: <Calendar className="h-4 w-4" /> },
  { id: "F_Time", label: "Friday", icon: <Calendar className="h-4 w-4" /> },
  { id: "E_Time", label: "Exam", icon: <Clock className="h-4 w-4" /> },
];

const TimetableDialog = ({ triggerButton }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("R_Time");
  const [newTime, setNewTime] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTime, setEditingTime] = useState("");
  const [notification, setNotification] = useState(null);

  const {
    timetable,
    loading,
    error,
    updateTimetable,
    addPeriod,
    deletePeriod,
    updatePeriod,
  } = useFetchTimetable({ type: activeTab });

  // Convert time string from time input (HH:MM format) to database format (HHMM)
  const convertTimeToDBFormat = (timeString) => {
    if (!timeString) return null;

    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 100 + minutes;
  };

  // Convert from database format to time picker format (HH:MM)
  const convertDBToTimeFormat = (dbTime) => {
    if (!dbTime) return "";

    const timeNum = parseInt(dbTime);
    const hours = Math.floor(timeNum / 100);
    const minutes = timeNum % 100;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  // Format time for display (with AM/PM)
  const formatTimeForDisplay = (dbTime) => {
    if (!dbTime) return "";

    const timeNum = parseInt(dbTime);
    const hours = Math.floor(timeNum / 100);
    const minutes = timeNum % 100;

    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;

    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  // Reset editing state when tab changes
  useEffect(() => {
    setEditingIndex(null);
    setEditingTime("");
    setNewTime("");
  }, [activeTab]);

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleAddTime = () => {
    if (newTime) {
      const dbFormat = convertTimeToDBFormat(newTime);
      if (dbFormat) {
        addPeriod(dbFormat);
        setNewTime("");
        showNotification("Time added successfully");
      }
    }
  };

  const handleUpdateTime = (index) => {
    if (editingTime) {
      const dbFormat = convertTimeToDBFormat(editingTime);
      if (dbFormat) {
        updatePeriod(index, dbFormat);
        setEditingIndex(null);
        setEditingTime("");
        showNotification("Time updated successfully");
      }
    }
  };

  const handleDeleteTime = (index) => {
    deletePeriod(index);
    showNotification("Time deleted successfully");
  };

  const handleEdit = (index, time) => {
    setEditingIndex(index);
    setEditingTime(convertDBToTimeFormat(time));
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingTime("");
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="outline" className="flex gap-2 items-center">
            <Clock className="h-4 w-4" />
            Manage Timetable
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Clock className="h-5 w-5" />
            School Bell Schedule Manager
          </DialogTitle>
        </DialogHeader>

        {notification && (
          <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded flex items-center gap-2 mb-4">
            <Check className="h-4 w-4" />
            {notification}
          </div>
        )}

        <Tabs
          defaultValue="R_Time"
          value={activeTab}
          onValueChange={handleTabChange}
        >
          <TabsList className="grid grid-cols-3 mb-4">
            {timetableTypes.map((type) => (
              <TabsTrigger
                key={type.id}
                value={type.id}
                className="flex items-center gap-1"
              >
                {type.icon}
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {timetableTypes.map((type) => (
            <TabsContent key={type.id} value={type.id} className="mt-0">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    {type.label} Schedule
                  </CardTitle>
                  <CardDescription>
                    Set the bell timings for {type.label.toLowerCase()}{" "}
                    timetable.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Add new time input */}
                  <div className="mb-4">
                    <Label
                      htmlFor={`new-time-${type.id}`}
                      className="block mb-2"
                    >
                      Add New Bell Time
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id={`new-time-${type.id}`}
                        type="time"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        className="w-32"
                      />
                      <Button
                        onClick={handleAddTime}
                        disabled={!newTime}
                        className="flex items-center gap-1"
                      >
                        <Clock className="h-4 w-4" /> Add
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Timetable display */}
                  {loading ? (
                    <div className="py-8 text-center text-muted-foreground">
                      Loading timetable...
                    </div>
                  ) : error ? (
                    <div className="py-8 text-center text-destructive flex flex-col items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      <p>Error loading timetable</p>
                    </div>
                  ) : !timetable || timetable.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      No bell times set for {type.label.toLowerCase()} schedule
                      yet.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                      {timetable.map((time, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-accent/50 p-3 rounded-md"
                        >
                          <div>
                            <Badge variant="outline" className="mb-1">
                              Period {index + 1}
                            </Badge>
                            {editingIndex === index ? (
                              <div className="flex items-center gap-2 mt-1">
                                <Input
                                  type="time"
                                  value={editingTime}
                                  onChange={(e) =>
                                    setEditingTime(e.target.value)
                                  }
                                  className="w-32"
                                />
                              </div>
                            ) : (
                              <div className="text-lg font-medium">
                                {formatTimeForDisplay(time)}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {editingIndex === index ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleUpdateTime(index)}
                                  className="h-8"
                                >
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={handleCancelEdit}
                                  className="h-8"
                                >
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEdit(index, time)}
                                  className="h-8"
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteTime(index)}
                                  className="h-8"
                                >
                                  Delete
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-sm text-muted-foreground">
                    {timetable?.length || 0} periods configured
                  </div>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Done
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default TimetableDialog;
