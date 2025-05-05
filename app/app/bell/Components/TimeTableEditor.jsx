"use client";
import { useState, useEffect } from "react";
import { Clock, Calendar, AlertTriangle, Check, Plus, X } from "lucide-react";
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

  // ... (keep all your existing state and logic functions the same)

  const {
    timetable,
    loading,
    error,
    updateTimetable,
    addPeriod,
    deletePeriod,
    updatePeriod,
  } = useFetchTimetable({ type: activeTab });

  const convertTimeToDBFormat = (timeString) => {
    if (!timeString) return null;

    // Handle both HH:MM and HH:MM:SS formats
    const timeParts = timeString.split(":");
    if (timeParts.length < 2) return null;

    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    // Validate hours and minutes
    if (isNaN(hours) || isNaN(minutes)) return null;
    if (hours < 0 || hours > 23) return null;
    if (minutes < 0 || minutes > 59) return null;

    return hours * 100 + minutes;
  };

  const convertDBToTimeFormat = (dbTime) => {
    if (dbTime === null || dbTime === undefined) return "";

    const timeStr = dbTime.toString().padStart(4, "0");
    const hours = parseInt(timeStr.substring(0, 2), 10);
    const minutes = parseInt(timeStr.substring(2, 4), 10);

    // Validate before returning
    if (isNaN(hours) || isNaN(minutes)) return "";
    if (hours < 0 || hours > 23) return "";
    if (minutes < 0 || minutes > 59) return "";

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const formatTimeForDisplay = (dbTime) => {
    if (dbTime === null || dbTime === undefined) return "";

    const timeStr = dbTime.toString().padStart(4, "0");
    const hours = parseInt(timeStr.substring(0, 2), 10);
    const minutes = parseInt(timeStr.substring(2, 4), 10);

    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;

    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  useEffect(() => {
    setEditingIndex(null);
    setEditingTime("");
    setNewTime("");
  }, [activeTab]);

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleAddTime = () => {
    if (!newTime) {
      showNotification("Please enter a time");
      return;
    }

    const dbFormat = convertTimeToDBFormat(newTime);
    if (dbFormat === null) {
      showNotification("Invalid time format (use HH:MM)");
      return;
    }

    addPeriod(dbFormat);
    setNewTime("");
    showNotification("Time added successfully");
  };

  const handleUpdateTime = (index) => {
    if (!editingTime) {
      showNotification("Please enter a time");
      return;
    }

    const dbFormat = convertTimeToDBFormat(editingTime);
    if (dbFormat === null) {
      showNotification("Invalid time format (use HH:MM)");
      return;
    }

    updatePeriod(index, dbFormat);
    setEditingIndex(null);
    setEditingTime("");
    showNotification("Time updated successfully");
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
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl flex items-center gap-3">
            <Clock className="h-6 w-6 text-primary" />
            <span>School Bell Schedule Manager</span>
          </DialogTitle>
        </DialogHeader>

        {notification && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-4 animate-fade-in">
            <Check className="h-4 w-4" />
            <span>{notification}</span>
          </div>
        )}

        <Tabs
          defaultValue="R_Time"
          value={activeTab}
          onValueChange={handleTabChange}
          className="mt-2"
        >
          <TabsList className="grid grid-cols-3 w-full bg-muted/50">
            {timetableTypes.map((type) => (
              <TabsTrigger
                key={type.id}
                value={type.id}
                className="flex items-center gap-2 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                {type.icon}
                <span>{type.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {timetableTypes.map((type) => (
            <TabsContent key={type.id} value={type.id} className="mt-4">
              <Card className="border-0 shadow-none">
                <CardHeader className="pb-3 px-0">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    {type.icon}
                    {type.label} Schedule
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Set the bell timings for {type.label.toLowerCase()}{" "}
                    timetable.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  {/* Add new time section */}
                  <div className="mb-6">
                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <Label
                          htmlFor={`new-time-${type.id}`}
                          className="block mb-2 text-sm font-medium"
                        >
                          Add New Bell Time
                        </Label>
                        <Input
                          id={`new-time-${type.id}`}
                          type="time"
                          value={newTime}
                          onChange={(e) => setNewTime(e.target.value)}
                          className="w-full max-w-[180px]"
                          step="60"
                        />
                      </div>
                      <Button
                        onClick={handleAddTime}
                        disabled={!newTime}
                        className="h-10 gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        Add Time
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Timetable list */}
                  {loading ? (
                    <div className="py-8 text-center text-muted-foreground flex flex-col items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                      Loading timetable...
                    </div>
                  ) : error ? (
                    <div className="py-8 text-center text-destructive flex flex-col items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      <p>Error loading timetable</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.reload()}
                        className="mt-2"
                      >
                        Retry
                      </Button>
                    </div>
                  ) : !timetable || timetable.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground flex flex-col items-center gap-2">
                      <Clock className="h-5 w-5" />
                      <p>
                        No bell times set for {type.label.toLowerCase()}{" "}
                        schedule yet.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                      {timetable.map((time, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-card/80 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="font-medium text-primary">
                                {index + 1}
                              </span>
                            </div>
                            <div>
                              {editingIndex === index ? (
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="time"
                                    value={editingTime}
                                    onChange={(e) =>
                                      setEditingTime(e.target.value)
                                    }
                                    className="w-[120px]"
                                    step="60"
                                  />
                                </div>
                              ) : (
                                <div className="text-lg font-medium">
                                  {formatTimeForDisplay(time)}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {editingIndex === index ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleUpdateTime(index)}
                                  className="h-8 gap-1"
                                >
                                  <Check className="h-3.5 w-3.5" />
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={handleCancelEdit}
                                  className="h-8 gap-1"
                                >
                                  <X className="h-3.5 w-3.5" />
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
                <CardFooter className="flex justify-between border-t px-0 pt-4">
                  <div className="text-sm text-muted-foreground">
                    {timetable?.length || 0} periods configured
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    Close
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
