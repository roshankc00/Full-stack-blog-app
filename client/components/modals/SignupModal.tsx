import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";

function SignUpModal() {
  const [open, setopen] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/tags/`, {
        ...data,
      });
      toast.success("User registered successfully");
    } catch (error) {
      toast.error("unable to register the user");
    }
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogTrigger>
          <Button onClick={() => setopen(true)}>Signup</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">SignupUser</DialogTitle>
            <DialogDescription>
              <Input
                className="border border-black text-black font-semibold"
                placeholder="Enter the Name"
                value={data.name}
                onChange={(e: any) => {
                  e.preventDefault();
                  setData({ ...data, name: e.target.value });
                }}
              />
              <Input
                className="border border-black text-black font-semibold"
                placeholder="Enter the Email"
                value={data.email}
                onChange={(e: any) => {
                  e.preventDefault();
                  setData({ ...data, email: e.target.value });
                }}
              />
              <Input
                className="border mt-3  mb-3 border-black text-black font-semibold"
                type="password"
                value={data.password}
                onChange={(e) => {
                  e.preventDefault();
                  setData({ ...data, password: e.target.value });
                }}
              />
              <div className="flex items-center">
                <Button
                  variant="destructive"
                  className=" w-[230px]"
                  onClick={(e) => {
                    setopen(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  className="ms-2 w-[230px]"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                    setopen(false);
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

export default SignUpModal;
