"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "@/components/cards/PostCard";
import CreatePostButton from "@/components/CreatePostButton";
import CreateCategoryModal from "@/components/modals/CreateCategory";
import CreateTagModal from "@/components/modals/CreateTag";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";

export default function Home() {
  const { isLogedInStatus } = useSelector((state: IRootState) => state.auth);
  const [allData, setallData] = useState([]);
  const getAllPosts = async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/`
    );

    setallData(data?.data);
    console.log(data);
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div>
      {isLogedInStatus && (
        <div className="flex flex-row-reverse mr-10">
          {<CreatePostButton />}
        </div>
      )}
      <div className="flex flex-col justify-center items-center">
        {allData &&
          allData.length > 0 &&
          allData.map((da: any, index) => {
            return <PostCard data={da} key={da.id} />;
          })}
      </div>
    </div>
  );
}
