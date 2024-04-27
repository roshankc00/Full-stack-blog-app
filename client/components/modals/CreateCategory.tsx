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

function CreateCategoryModal() {
  const [openCat, setOpenCat] = useState(false);
  const [category, setcategory] = useState({
    name: "",
    description: "",
  });
  const handleCreateCat = async () => {
    try {
      const response: any = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/categories/`,
        {
          ...category,
        }
      );
      toast.success("Category created successfully");
    } catch (error) {
      toast.error("Unable to add the Category");
    }
  };
  return (
    <div>
      <Dialog open={openCat}>
        <DialogTrigger>
          <Button variant="outline" onClick={() => setOpenCat(true)}>
            Create Category{" "}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Create Category</DialogTitle>
            <DialogDescription>
              <Input
                className="border border-black text-black font-semibold"
                placeholder="Enter the name"
                value={category.name}
                onChange={(e) => {
                  e.preventDefault();
                  setcategory({ ...category, name: e.target.value });
                }}
              />
              <Input
                className="border mt-3  mb-3 border-black text-black font-semibold"
                placeholder="Enter the description"
                value={category.description}
                onChange={(e) => {
                  e.preventDefault();
                  setcategory({ ...category, description: e.target.value });
                }}
              />
              <div className="flex items-center">
                <Button
                  variant="destructive"
                  className=" w-[230px]"
                  onClick={(e) => {
                    setOpenCat(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  className="ms-2 w-[230px]"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCreateCat();
                    setOpenCat(false);
                  }}
                >
                  {" "}
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

export default CreateCategoryModal;
