"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function CreateTagModal() {
  const [name, setname] = useState("");
  const [openTag, setOpenTag] = useState(false);
  const handleCreateTags = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tags/`,
        {
          name,
        }
      );
      toast.success("Tag created successfully");
    } catch (error) {
      toast.error("Unable to add the tag");
    }
  };
  return (
    <div>
      <Dialog open={openTag}>
        <DialogTrigger>
          <Button variant="outline" onClick={() => setOpenTag(true)}>
            Create Tags{" "}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Create Tag</DialogTitle>
            <DialogDescription>
              <Input
                className="border border-black text-black font-semibold"
                placeholder="Enter the name"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />

              <div className="flex items-center mt-3">
                <Button
                  variant="destructive"
                  className="w-[230px]"
                  onClick={() => setOpenTag(false)}
                >
                  Close
                </Button>
                <Button
                  className=" ms-2 w-[230px]"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCreateTags();
                    setOpenTag(false);
                  }}
                >
                  Create
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTagModal;
