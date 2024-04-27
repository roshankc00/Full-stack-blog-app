"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IRootState } from "@/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {
  postId: number;
};
const CreateComment = ({ postId }: Props) => {
  const router = useRouter();

  const { userId, token, isLogedInStatus } = useSelector(
    (state: IRootState) => state.auth
  );
  const [content, setcontent] = useState("");
  const PostComment = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/`,
        {
          content,
          post: postId,
          user: userId,
        }
      );
      console.log(response);
      toast.success("comment posted successfully");
      router.refresh();
    } catch (error) {
      toast.success("unable tom post Comment ");
    }
  };
  console.log(isLogedInStatus);
  return (
    <div className="flex gap-2 mb-10 mt-4">
      <Input
        className="border border-black w-[400px]"
        placeholder="Enter the comment"
        value={content}
        onChange={(e) => setcontent(e.target.value)}
      />
      <Button
        onClick={(e) => {
          if (content.length > 2) {
            PostComment();
          } else {
            toast.error("enter the valid comment");
          }
        }}
      >
        Post
      </Button>
    </div>
  );
};

export default CreateComment;
