import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";
import RFIDCard from "../Components/Rfid";
import Image from "next/image";

const GradeModel = ({ onUpdate, OpenModal, setOpenModal, existingOffice }) => {
  const [indexNumber, setIndexNumber] = useState("");
  const [Name, setName] = useState(existingOffice?.Name || "");
  const [Initial, setInitial] = useState("");
  const [address, setAddress] = useState(existingOffice?.address || "");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [studentImage, setStudentImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isEditing = !!existingOffice;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStudentImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Cleanup function for image preview URL
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append("indexNumber", indexNumber);
      formData.append("Name", Name);
      formData.append("address", address);
      formData.append("parentName", parentName);
      formData.append("parentPhone", parentPhone);
      if (studentImage) {
        formData.append("studentImage", studentImage);
      }

      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/office${
        isEditing ? `/${existingOffice.id}` : ""
      }`;

      const res = await axios({
        method: isEditing ? "put" : "post",
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200 || res.status === 201) {
        toast.success(
          `${
            isEditing
              ? "Student Updated Successfully"
              : "Student Added Successfully"
          }`,
          { duration: 1600, position: "top-right" }
        );
        setLoading(false);
        onUpdate(res.data.data);
        resetForm();
        setOpenModal(false);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      toast.error("An unexpected error occurred.", {
        duration: 4000,
        position: "top-right",
      });
      setLoading(false);
    }
  };

  const resetForm = () => {
    setIndexNumber("");
    setName("");
    setAddress("");
    setParentName("");
    setParentPhone("");
    setStudentImage(null);
    setImagePreview(null);
  };

  useEffect(() => {
    if (existingOffice) {
      setIndexNumber(existingOffice.indexNumber || "");
      setName(existingOffice.Name);
      setAddress(existingOffice.address);
      setImagePreview(existingOffice.studentImage || null);
    }
  }, [existingOffice]);

  if (!OpenModal) return null;

  return (
    <Dialog open={OpenModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-[455px] lg:max-w-5xl w-full">
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-between gap-8">
          <form onSubmit={handleSubmit} className="flex-1">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Student" : "Add Student"}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Make changes to the student profile here. Click save when done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 pt-4">
              <Label>Index Number</Label>
              <Input
                value={indexNumber}
                onChange={(e) => setIndexNumber(e.target.value)}
              />
              <Label>Full Name</Label>
              <Input value={Name} onChange={(e) => setName(e.target.value)} />
              <Label>Name with initials</Label>
              <Input
                value={Initial}
                onChange={(e) => setInitial(e.target.value)}
              />
              <Label>Parent/Guardian Name</Label>
              <Input
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
              />
              <Label>Parent/Guardian Phone</Label>
              <Input
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
              />
              <Label>Upload Student Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <DialogFooter>
              <Button
                className="mt-4"
                disabled={loading}
                variant="outline"
                type="submit"
              >
                {loading
                  ? "Loading..."
                  : isEditing
                  ? "Update Student"
                  : "Add Student"}
              </Button>
            </DialogFooter>
          </form>

          <div className=" justify-center items-center my-auto">
            <RFIDCard
              student={{
                indexNumber,
                Name,
                parentName,
                Initial,
                parentPhone,
                studentImage: imagePreview,
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GradeModel;
