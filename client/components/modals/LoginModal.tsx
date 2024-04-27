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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logedin } from "@/app/(auth)/_redux/auth.slice";

function LoginModal() {
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/login/`,
        {
          ...data,
        }
      );
      dispatch(logedin(response?.data));
      toast.success("User loggedinSuccessfully successfully");
    } catch (error) {
      toast.error("unable to register the user");
    }
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogTrigger>
          <Button onClick={() => setopen(true)}>Login </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Login</DialogTitle>
            <DialogDescription>
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

export default LoginModal;
