"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import LoginModal from "./modals/LoginModal";
import SignUpModal from "./modals/SignupModal";
import { CgProfile } from "react-icons/cg";
import { logedOut } from "@/app/(auth)/_redux/auth.slice";
import CreateCategoryModal from "./modals/CreateCategory";
import CreateTagModal from "./modals/CreateTag";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isLogedInStatus, name: UserName } = useSelector(
    (state: IRootState) => state.auth
  );

  return (
    <div className="h-[100px] shadow-lg flex justify-between items-center">
      <div>
        <h1 className="font-bold text-3xl ms-10 text-sky-600">VeeeeLog</h1>
      </div>

      {isLogedInStatus ? (
        <div className=" flex gap-2 px-4">
          <Button
            variant="secondary"
            onClick={() => {
              dispatch(logedOut());
              toast.success("User Loggedout Successfully");
            }}
          >
            {" "}
            LogOut
          </Button>
          {/* tag model */}
          <CreateTagModal />
          {/* category modal */}
          <CreateCategoryModal />
          <div className="flex items-center gap-2 mr-3">
            <CgProfile size={30} /> {UserName}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <LoginModal />
          <SignUpModal />
        </div>
      )}
    </div>
  );
};

export default Navbar;
